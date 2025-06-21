import { CategoriesSection } from "@/components/categories-section";
import { HeaderSkeleton } from "@/components/loading/header-skeleton";
import { HomeFeedSkeleton } from "@/components/loading/home-feed-skeleton";
import { VideoGrid } from "@/components/video-grid";
import {
  convertISOtoPublishedDate,
  formatYouTubeViewCount,
  getYouTubePublishedDate,
  parseYouTubeDuration,
} from "@/lib/utils";
import { Video } from "@/types";
import { videosQueryOptions } from "@/utils/videos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

// import { HeaderSkeleton } from "@/components/skeletons/header-skeleton"
// import { HomeFeedSkeleton } from "@/components/skeletons/home-feed-skeleton"

function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <HeaderSkeleton />
      <HomeFeedSkeleton />
    </div>
  );
}

export const Route = createFileRoute("/")({
  loader: async (ctx) => {
    const videos = await ctx.context.queryClient.ensureQueryData(
      videosQueryOptions()
    );

    console.log({ videos });
  },
  pendingComponent: Loading,
  component: Home,
});

export default function Home() {
  const { data: videos } = useSuspenseQuery(videosQueryOptions());
  console.log({ videos });

  const transformedVideos: Video[] = videos.map((v) => {
    return {
      id: v.id,
      thumbnail:
        v.snippet.thumbnails?.maxres?.url ||
        v.snippet.thumbnails?.high?.url ||
        v.snippet.thumbnails?.medium?.url,
      title: v.snippet.localized.title,
      description: v.snippet.localized.description,
      channelId: v.snippet.channelId,
      duration: parseYouTubeDuration(v.contentDetails.duration),
      uploadDate: getYouTubePublishedDate(v.snippet.publishedAt),
      likes: v.statistics.likeCount || "0",
      views: formatYouTubeViewCount(Number(v.statistics.viewCount)),
      channelName: v.snippet.channelTitle,
      channelImageUrl: v.channelImageUrl,
    };
  });
  return (
    <div className="w-full pt-16">
      <CategoriesSection />

      <VideoGrid videos={transformedVideos} />
    </div>
  );
}
