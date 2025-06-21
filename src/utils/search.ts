import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";
import { SingleVideoType } from "@/types/video/single-video-types";
import { SearchResultTypes } from "@/types/search/search";
import { extractSearchType } from "@/lib/utils";
import { fetchSingleChannelInfo } from "./channel";
import { fetchSingleVideo } from "./videos";

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

const searchOptions = (searchQuery: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/search`,
  params: {
    ...options.params,
    maxResults: "20",
    part: "snippet",
    q: searchQuery,
    type: "video,channel",
    regionCode: "US",
    safeSearch: "strict",
  },
});

export const fetchSearchResults = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    const options = searchOptions(data);
    const searchResults = await axios
      .request<SearchResultTypes>(options)
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Search Results");
      });

    //   Populate the Result with necessary Information
    return await Promise.all(
      searchResults.items.map(async (item) => {
        //   Check the type of the search Result
        const resultType = extractSearchType(item.id.kind);
        const isVideo: "channel" | "video" = item.id.channelId
          ? "channel"
          : "video";
        const confirmResultType = resultType === isVideo;
        const channelId = item.snippet.channelId;

        if (isVideo === "channel") {
          // grab the channels Sub count
          const channelResult = await fetchSingleChannelInfo({
            data: channelId,
          });
          const channelSubCount =
            channelResult.items?.[0].statistics.subscriberCount;

          const channelInfo = {
            isVideo,
            thumbnail:
              item.snippet.thumbnails.high.url ||
              item.snippet.thumbnails.default.url,
            channelTitle: item.snippet.channelTitle,
            channelDescription: item.snippet.description,
            channelTagName: item.snippet.title,
            channelSubCount,
          };

          return channelInfo;
        }

        if (isVideo === "video") {
          // Get the video ViewCount by calling the video api
          const videoViewCount = (
            await fetchSingleVideo({ data: { videoIds: item.id.videoId! } })
          ).items?.[0].statistics.viewCount;

          // Get the channel Info
          const channelResult = await fetchSingleChannelInfo({
            data: channelId,
          });
          const channelThumbnail =
            channelResult.items?.[0].snippet.thumbnails.high.url ||
            channelResult.items?.[0].snippet.thumbnails.medium.url;

          const videoReturn = {
            isVideo,
            publishedAt: item.snippet.publishedAt,
            channelId: item.snippet.channelId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail:
              item.snippet.thumbnails.high.url ||
              item.snippet.thumbnails.default.url,
            channelTitle: item.snippet.channelTitle,
            channelThumbnail,
            videoViewCount,
          };

          return videoReturn;
        }
      })
    );
  });

export const searchQueryOptions = (searchQuery: string) =>
  queryOptions({
    queryKey: ["search", searchQuery],
    queryFn: ({ queryKey }) => fetchSearchResults({ data: queryKey[1] }),
  });
