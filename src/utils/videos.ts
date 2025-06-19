import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";
import { SingleVideoType } from "@/types/video/single-video-types";

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

const videosOptions = {
  ...options,
  method: "GET",
  url: `${BASE_URL}/videos`,
  params: {
    ...options.params,
    maxResults: "50",
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
  },
};

const singleVideoOptions = (videoId: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/videos`,
  params: {
    ...options.params,
    part: "id,status,statistics,snippet,player",
    id: videoId,
  },
});

const channelImageUrlOptions = (channelIds: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/channels`,
  params: {
    ...options.params.key,
    part: "snippet,id,statistics",
    id: channelIds,
  },
  headers: options.headers,
});

export const fetchVideos = createServerFn({ method: "GET" }).handler(
  async () => {
    const videos = await axios
      .request<VideosType>(videosOptions)
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Videos");
      });

    // console.log({ videos });

    const videosChannelId = videos.items.map((vid) => vid.snippet.channelId);
    // console.log({ videosChannelId });

    // if (videos)
    const videosChannel = (
      await axios.request<ChannelType>(
        channelImageUrlOptions(videosChannelId.join(","))
      )
    ).data.items;

    // console.log({ videosChannel });
    const videosWithChannelImageUrl = videos.items.map((vid) => {
      const videoChannelImageUrl =
        videosChannel?.find((channel) => channel.id === vid.snippet.channelId)
          ?.snippet.thumbnails.high.url ?? "";

      return {
        ...vid,
        channelImageUrl: videoChannelImageUrl,
      };
    });

    return videosWithChannelImageUrl;
  }
);

export const fetchSingleVideo = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const video = await axios
      .request<SingleVideoType>(singleVideoOptions(ctx.data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Video Info");
      });

    // console.log({ video });
    const videoChannel = (
      await axios.request<ChannelType>(
        channelImageUrlOptions(video.items[0].snippet.channelId)
      )
    ).data.items[0];

    const channelSubCount = videoChannel.statistics.subscriberCount;

    const videoChannelImageUrl = videoChannel.snippet.thumbnails.high.url;

    // console.log(videoChannelImageUrl);

    return {
      ...video,
      channelImageUrl: videoChannelImageUrl,
      channelSubCount,
    };
  });

export const videosQueryOptions = () =>
  queryOptions({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
export const singleVideoQueryOptions = (videoId: string) =>
  queryOptions({
    queryKey: ["videos", videoId],
    queryFn: ({ queryKey }) => fetchSingleVideo({ data: queryKey[1] }),
  });

export const channelPlaylistVideoOptions = (
  videoIds: string,
  channelId: string
) => {
  return queryOptions({
    queryKey: ["channel-videos", videoIds, channelId],
    queryFn: ({ queryKey }) => fetchSingleVideo({ data: queryKey[1] }),
  });
};
