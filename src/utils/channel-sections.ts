import axios, { AxiosError } from "axios";

import { createServerFn } from "@tanstack/react-start";
import {
  ChannelSectionTypes,
  FeaturedChannelReturnType,
} from "@/types/channel-sections/channel-section";
import { fetchSingleChannelInfo, singleChannelQueryOptions } from "./channel";
import { formatYouTubeViewCount } from "@/lib/utils";
import { fetchPlaylistsById } from "./playlist";
import { fetchSingleVideo } from "./videos";
import { queryOptions } from "@tanstack/react-query";

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

const channelSectionOptions = (channelId: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/channelSections`,
  params: {
    ...options.params,
    part: "snippet,id,contentDetails",
    channelId,
  },
});

export const fetchChannelSections = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const channelSections = await axios
      .request<ChannelSectionTypes>(channelSectionOptions(data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Videos");
      });

    console.log({ channelSections });

    const featuredChannels = channelSections.items.find(
      (section) => section.snippet.type === "multiplechannels"
    );
    // Grab the playlistId for #SinglePlaylist
    const validSectionPlaylists = channelSections.items.filter(
      (item) => item.contentDetails && item.snippet.type === "singleplaylist"
    );

    // Get the Info for the featuredChannels
    let featuredChannelInfo: FeaturedChannelReturnType[] | undefined =
      undefined;
    if (featuredChannels) {
      const featuredChannelIds = featuredChannels.contentDetails?.channels;
      if (featuredChannelIds) {
        const channels = await fetchSingleChannelInfo({
          data: featuredChannelIds.join(","),
        });
        const channelData: FeaturedChannelReturnType[] = channels.items.map(
          (item) => ({
            subCount: formatYouTubeViewCount(
              Number(item.statistics.subscriberCount)
            ),
            thumbnailUrl:
              item.snippet.thumbnails.high.url ||
              item.snippet.thumbnails.default.url,
            title: item.snippet.title,
          })
        );
        featuredChannelInfo = channelData;
      }
    }

    if (validSectionPlaylists.length > 0) {
      // The playlist will surely exist in this block scope
      const playlistsArray = validSectionPlaylists?.map(
        (playlist) => playlist.contentDetails?.playlists?.[0]
      );
      const playListString = playlistsArray.join(",");

      console.log({ playListString });

      // Grab the Playlist of each Playlist to extract the name and description

      const channelPlaylist = await fetchPlaylistsById({
        data: playListString,
      });

      console.log({ channelPlaylist });

      const channelPlaylistInfo: {
        playlistId: string;
        title: string;
        description: string;
      }[] = channelPlaylist.items?.map((item) => ({
        playlistId: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
      }));

      const playListVideos = await Promise.all(
        channelPlaylistInfo?.map(async (list) => ({
          ...list,
          videos: await fetchSingleVideo({
            data: {
              isPlaylist: true,
              videoIds: list.playlistId,
            },
          }),
        }))
      );

      return {
        featuredChannelInfo,
        playListVideos,
      };
    }
  });

export const channelSectionInfoOptions = (channelId: string) =>
  queryOptions({
    queryKey: ["channel-sections-info", channelId],
    queryFn: ({ queryKey }) => fetchChannelSections({ data: queryKey[1] }),
  });
