import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";
import { SingleVideoType } from "@/types/video/single-video-types";
import { SingleChannelTypes } from "@/types/channel/single-channel-types";
import { ChannelVideosPlayListItemsType } from "@/types/playlistItem/channelVideosPlaylistItem";

const API_KEY = import.meta.env.VITE_XRAPIDAPIKEY;
const PARAM_KEY = import.meta.env.VITE_PARAM_KEY;
const BASE_URL = "https://youtube-data-api-v33.p.rapidapi.com";

const options = {
  params: {
    key: PARAM_KEY,
  },
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "youtube-data-api-v33.p.rapidapi.com",
  },
};

const channelVideosPlaylistOptions = (
  playListId: string,
  maxResult: string = "35"
) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/playlistItems`,
  params: {
    ...options.params,
    // part: "snippet,statistics,contentOwnerDetails,contentDetails,brandingSettings,status",
    part: "contentDetails,snippet,status,id",
    playlistId: playListId,
    maxResults: maxResult,
  },
});

export const fetchChannelsUploadedVideosPlaylistItem = createServerFn({
  method: "GET",
})
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const videos = await axios
      .request<ChannelVideosPlayListItemsType>(
        channelVideosPlaylistOptions(data)
      )
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Channel Info");
      });

    const videoIds = videos.items.map((vid) => ({
      id: vid.id,
      videoId: vid.snippet.resourceId.videoId,
    }));

    return videoIds;
  });

export const fetchChannelsUploadedVideosPlaylistItemOptions = (
  playlistId: string
) =>
  queryOptions({
    queryKey: ["playlist-items", playlistId],
    queryFn: ({ queryKey }) =>
      fetchChannelsUploadedVideosPlaylistItem({ data: queryKey[1] }),
  });
