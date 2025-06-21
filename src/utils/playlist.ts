import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { PlaylistType } from "@/types/playlist/playlist";
import {
  fetchChannelsUploadedVideosPlaylistItem,
  fetchPlaylistItem,
} from "./playlist-items";

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

const channelPlaylistsOptions = (channelId: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/playlists`,
  params: {
    ...options.params,
    part: "contentDetails,snippet,status,id,player,localizations",
    channelId,
    maxResults: "20",
  },
});

const playlistIdsOptions = (id: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/playlists`,
  params: {
    ...options.params,
    part: "contentDetails,snippet,status,id,localizations",
    id,
  },
});

export const fetchChannelPlaylists = createServerFn({
  method: "GET",
})
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const channelPlaylists = await axios
      .request<PlaylistType>(channelPlaylistsOptions(data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Channel Info");
      });
    return channelPlaylists;
  });

export const fetchPlaylistsById = createServerFn({
  method: "GET",
})
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const channelPlaylists = await axios
      .request<PlaylistType>(playlistIdsOptions(data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Channel Info");
      });
    return channelPlaylists;
  });

export const fetchChannelPlaylistAndPlayListFirstItem = createServerFn({
  method: "GET",
})
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const channelPlaylists = await fetchChannelPlaylists({ data });
    // grab the playlistItem for each Playlist
    return await Promise.all(
      channelPlaylists.items.map(async (item, index) => {
        const FirstVideoId = (
          await fetchPlaylistItem({
            data: { playlistId: item.id, maxResult: 3 },
          })
        )?.items?.[0].contentDetails.videoId;
        return {
          FirstVideoId,
          ...item,
          // ...channelPlaylists,
          // items: [

          // ],
        };
      })
    );
  });

export const fetchChannelsVideosPlaylistOptions = (channelId: string) =>
  queryOptions({
    queryKey: ["channel-playlists", channelId],
    queryFn: ({ queryKey }) =>
      fetchChannelPlaylistAndPlayListFirstItem({ data: queryKey[1] }),
  });
export const fetchPlaylistIdVideosOptions = (ids: string) =>
  queryOptions({
    queryKey: ["playlists-ids", ids],
    queryFn: ({ queryKey }) =>
      fetchChannelPlaylistAndPlayListFirstItem({ data: queryKey[1] }),
  });
