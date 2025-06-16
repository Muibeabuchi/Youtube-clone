import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";

const BASE_URL = "https://youtube-data-api-v33.p.rapidapi.com";

const API_KEY = import.meta.env.VITE_XRAPIDAPIKEY;
const PARAM_KEY = import.meta.env.VITE_PARAM_KEY;

const options = {
  params: {
    maxResults: "5",
    key: PARAM_KEY,
  },
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "youtube-data-api-v33.p.rapidapi.com",
  },
};

const videosOptions = {
  method: "GET",
  url: `${BASE_URL}/videos`,
  ...options,
  params: {
    ...options.params,
    part: "snippet,statistics,contentDetails",
    chart: "mostPopular",
  },
};
const videoOptions = (videoId: string) => ({
  method: "GET",
  url: `${BASE_URL}/videos`,
  ...options,
  params: {
    ...options.params,
    part: "snippet,statistics",
    chart: "mostPopular",
  },
});

const channelImageUrlOptions = (channelId: string) => ({
  method: "GET",
  url: "https://youtube-data-api-v33.p.rapidapi.com/channels",
  params: {
    ...options.params.key,
    part: "snippet,id",
    id: channelId,
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

    // if (videos)
    const videosWithChannelImageUrl = videos.items.map(async (video) => {
      const channelImageUrl = (
        await axios.request<ChannelType>(
          channelImageUrlOptions(video.snippet.channelId)
        )
      ).data.items[0].snippet.thumbnails.default.url;
      return {
        ...video,
        channelImageUrl,
      } as Item & {
        channelImageUrl: string;
      };
    });

    return await Promise.all(videosWithChannelImageUrl);
  }
);

export const videosQueryOptions = () =>
  queryOptions({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });
