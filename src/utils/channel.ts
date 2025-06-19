import axios, { AxiosError } from "axios";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { Item, VideosType } from "@/types";
import { ChannelType } from "@/types/channel/channel-types";
import { SingleVideoType } from "@/types/video/single-video-types";
import { SingleChannelTypes } from "@/types/channel/single-channel-types";

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

const singleChannelOptions = (channelId: string) => ({
  ...options,
  method: "GET",
  url: `${BASE_URL}/channels`,
  params: {
    ...options.params,
    part: "snippet,statistics,contentOwnerDetails,contentDetails,brandingSettings,status",
    id: channelId,
  },
});

export const fetchSingleChannelInfo = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ context, data }) => {
    const videos = await axios
      .request<SingleChannelTypes>(singleChannelOptions(data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Channel Info");
      });

    return videos;
  });

export const singleChannelQueryOptions = (channelId: string) =>
  queryOptions({
    queryKey: ["channel", channelId],
    queryFn: ({ queryKey }) => fetchSingleChannelInfo({ data: queryKey[1] }),
  });
