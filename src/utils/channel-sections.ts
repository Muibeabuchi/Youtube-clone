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
import { fetchChannelsUploadedVideosPlaylistItem } from "./playlist-items";

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

    const featuredChannels = channelSections.items?.find(
      (section) => section.snippet.type === "multiplechannels"
    );

    console.log({ featuredChannels: featuredChannels?.contentDetails });
    // Grab the playlistId for #SinglePlaylist
    const validSectionPlaylists = channelSections.items.filter(
      (item) => item.contentDetails && item.snippet.type === "singleplaylist"
    );
    console.log({ validSectionPlaylists });

    // Get the Info for the featuredChannels
    let featuredChannelInfo:
      | {
          channelData: FeaturedChannelReturnType[] | undefined;
          channelPlaylistTitle: string | undefined;
        }
      | undefined = undefined;

    if (featuredChannels) {
      const featuredChannelIds = featuredChannels.contentDetails?.channels;
      if (featuredChannelIds) {
        const channels = await fetchSingleChannelInfo({
          data: featuredChannelIds.join(","),
        });
        const channelData: FeaturedChannelReturnType[] = channels.items?.map(
          (item) => ({
            subCount: formatYouTubeViewCount(
              Number(item.statistics.subscriberCount)
            ),
            thumbnailUrl:
              item.snippet.thumbnails.high.url ||
              item.snippet.thumbnails.default.url,
            title: item.snippet.title,
            channelId: item.id,
            // description: item.snippet.description,
            // description: featuredChannels.snippet.title ?? "",
          })
        );

        console.log({ channelData });
        featuredChannelInfo = {
          channelData,
          channelPlaylistTitle: featuredChannels.snippet.title,
        };
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

      console.log({ channelPlaylistInfo });

      // grab the playlist INfo and add the playlistId in the return
      async function getPlayListItemVideos(playlistIds: string) {
        const playlistItemVideoIds = (
          await fetchChannelsUploadedVideosPlaylistItem({
            data: { playlistIds, maxResult: 10 },
          })
        )?.map((item) => item.videoId);

        console.log({ playlistItemVideoIds });
        return fetchSingleVideo({
          data: {
            isPlaylist: true,
            videoIds: playlistItemVideoIds?.join(",") ?? "",
          },
        });
      }

      const playListVideos =
        (await Promise.all(
          channelPlaylistInfo?.map(async (list) => ({
            ...list,
            videos: await getPlayListItemVideos(list.playlistId),
          }))
        )) ?? [];

      return {
        featuredChannelInfo,
        playListVideos,
      };
    } else {
      return {
        featuredChannelInfo,
        playListVideos: [],
      };
    }
  });

export const channelSectionInfoOptions = (channelId: string) =>
  queryOptions({
    queryKey: ["channel-sections-info", channelId],
    queryFn: ({ queryKey }) => fetchChannelSections({ data: queryKey[1] }),
  });
