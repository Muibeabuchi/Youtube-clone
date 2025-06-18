import { createServerFn } from "@tanstack/react-start";
import { BASE_URL, options } from "./videos";
import axios, { AxiosError } from "axios";
import { VideoCommentsType } from "@/types/comments/video-comment";
import { queryOptions } from "@tanstack/react-query";

const videoCommentsOptions = (videoId: string) => ({
  method: "GET",
  url: `${BASE_URL}/commentThreads`,
  ...options,
  params: {
    ...options.params,
    part: "id,snippet,replies",
    videoId: videoId,
    maxResults: "10",
    textFormat: "plainText",
  },
});

export const fetchVideoComments = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async ({ data }) => {
    return await axios
      .request<VideoCommentsType>(videoCommentsOptions(data))
      .then((r) => r.data)
      .catch((err: AxiosError) => {
        console.log({ err });
        if (err.response?.status === 429) {
          throw new Error("You have made too many requests");
        }
        throw new Error("Failed to fetch Videos");
      });
  });

export const commentsOfVideoOptions = (videoId: string) =>
  queryOptions({
    queryKey: ["comments", videoId],
    queryFn: ({ queryKey }) => fetchVideoComments({ data: queryKey[1] }),
  });
