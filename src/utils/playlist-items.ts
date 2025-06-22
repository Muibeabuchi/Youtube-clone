import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";
import { SingleVideoType } from "@/types/video/single-video-types";
import { SingleChannelTypes } from "@/types/channel/single-channel-types";
import { ChannelVideosPlayListItemsType } from "@/types/playlistItem/channelVideosPlaylistItem";
import { fetchSingleVideo } from "./videos";
import { fetchChannelPlaylists } from "./playlist";

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
  maxResult: number = 35
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
  .validator((data: { playlistIds: string; maxResult?: number }) => data)
  .handler(async ({ data }) => {
    console.log({ playlistIdinternalllly: data.playlistIds });
    const videos = await axios
      .request<ChannelVideosPlayListItemsType | null>(
        channelVideosPlaylistOptions(data.playlistIds, data.maxResult)
      )
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        if (err.code === "404") {
          // throw new Error("You have made too many requests");
          return null;
        }
        throw new Error("Failed to fetch Channel Info");
      });

    console.log({ videoIds222222222222: videos });
    // @ts-expect-error
    if (videos.error) {
      return [];
    }

    // const playlist = await fetchChannelPlaylists({
    //   data: data.playlistIds,
    // });

    return videos?.items?.map((vid) => ({
      id: vid.id,
      videoId: vid.snippet.resourceId.videoId,
    }));
  });

export const fetchPlaylistItem = createServerFn({
  method: "GET",
})
  .validator((data: { playlistId: string; maxResult?: number }) => data)
  .handler(async ({ data }) => {
    const videos = await axios
      .request<ChannelVideosPlayListItemsType>(
        channelVideosPlaylistOptions(data.playlistId, data.maxResult)
      )
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        // ! Review this code
        // if (err.code === "404") {
        //   // throw new Error("You have made too many requests");
        //   return null;
        // }
        throw new Error("Failed to fetch Channel Info");
      });

    // console.log({ videoIds222222222222: videos });
    // // @ts-expect-error
    // if (videos.error) {
    //   return [];
    // }
    return videos;
    // fetchSingleVideo({data:})
  });

export const preFetchPlaylistItems = createServerFn({
  method: "GET",
})
  .validator((data: { playlistIds?: string; maxResult?: number }) => data)
  .handler(async ({ data }) => {
    console.log({ playlistIdinternalllly: data.playlistIds });
    // if (!data.playlistIds) return [];
    const videos = await axios
      .request<ChannelVideosPlayListItemsType | null>(
        channelVideosPlaylistOptions(data.playlistIds ?? "", data.maxResult)
      )
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        // if (err.code === "404") {
        //   // throw new Error("You have made too many requests");
        //   return null;
        // }
        throw new Error("Failed to fetch Channel Info");
      });

    console.log({ videoIds222222222222: videos });
    // // @ts-expect-error
    // if (videos.error) {
    //   return [];
    // }

    const playlist = await fetchChannelPlaylists({
      data: data.playlistIds ?? "",
    });

    const videoIds = videos?.items
      ?.map((vid) => vid.snippet.resourceId.videoId)
      .join(",");

    const videoData = await fetchSingleVideo({
      data: { videoIds: videoIds ?? "", isPlaylist: true },
    });

    return {
      playlist,
      videoData,
      // videos: videos?.items?.map((vid) => vid.snippet.resourceId.videoId),
    };
  });

export const fetchChannelsUploadedVideosPlaylistItemOptions = (
  playlistId: string
) =>
  queryOptions({
    queryKey: ["playlist-items", playlistId],
    queryFn: ({ queryKey }) =>
      fetchChannelsUploadedVideosPlaylistItem({
        data: { playlistIds: queryKey[1] },
      }),
  });

export const watchPlaylistOptions = (playlistId?: string) =>
  queryOptions({
    enabled: !!playlistId,
    queryKey: ["watch-playlist", playlistId],
    queryFn: ({ queryKey }) =>
      preFetchPlaylistItems({
        data: { playlistIds: queryKey[1], maxResult: 10 },
      }),
  });
