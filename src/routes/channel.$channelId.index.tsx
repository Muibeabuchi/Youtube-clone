import { Button } from "@/components/ui/button";
import type { Video } from "@/types";

import { VideoCard } from "@/components/video-card";
import {
  formatYouTubeViewCount,
  getYouTubePublishedDate,
  parseYouTubeDuration,
} from "@/lib/utils";
import { singleChannelQueryOptions } from "@/utils/channel";
import { channelSectionInfoOptions } from "@/utils/channel-sections";
import { fetchChannelsUploadedVideosPlaylistItemOptions } from "@/utils/playlist-items";
import { channelPlaylistVideoOptions } from "@/utils/videos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useRef } from "react";

export const Route = createFileRoute("/channel/$channelId/")({
  loader: async ({ context, params }) => {
    // Prefetch the data for the Videos page
    const channelId = params.channelId;
    // const channelInfo = await context.queryClient.ensureQueryData(
    //   singleChannelQueryOptions(channelId)
    // );

    // const channelVideoPlaylistId =
    //   channelInfo.items?.[0].contentDetails.relatedPlaylists.uploads;

    // const videoIds = await context.queryClient.ensureQueryData(
    //   fetchChannelsUploadedVideosPlaylistItemOptions(channelVideoPlaylistId)
    // );
    // const videoIdsString = videoIds?.map((v) => v.videoId).join(",");

    // context.queryClient.prefetchQuery(
    //   channelPlaylistVideoOptions(videoIdsString, params.channelId)
    // );

    const channelSectionInfo = await context.queryClient.ensureQueryData(
      channelSectionInfoOptions(params.channelId)
    );

    console.log({ channelSectionInfo });
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { channelId } = Route.useParams();

  const { data: channelSectionInfo } = useSuspenseQuery(
    channelSectionInfoOptions(channelId)
  );
  const featuredChannelInfo = channelSectionInfo?.featuredChannelInfo;
  const playListVideos = channelSectionInfo?.playListVideos;

  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref) return;
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!channelSectionInfo?.featuredChannelInfo) {
    return <div> No Channel Sections</div>;
  }
  if (!channelSectionInfo?.playListVideos) {
    return <div> No Channel Sections</div>;
  }

  return (
    <div className="space-y-8">
      {featuredChannelInfo && (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            {featuredChannelInfo.channelPlaylistTitle}
          </h2>
          <div className="relative group">
            <button
              onClick={() => scroll(ref, "left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div
              ref={ref}
              className="flex gap-x-32 overflow-x-auto scrollbar-hide pb-4"
            >
              {featuredChannelInfo.channelData &&
                featuredChannelInfo?.channelData?.map((channel, index) => (
                  <Link
                    key={index}
                    to="/channel/$channelId"
                    params={{
                      channelId: channel.channelId,
                    }}
                    className="flex-shrink-0 text-center"
                  >
                    <div className="flex items-center flex-col justify-center">
                      <div className="w-24 h-24 mb-3 ">
                        <img
                          src={channel.thumbnailUrl}
                          alt={channel.title}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-medium text-sm mb-1">
                        {channel.title.toUpperCase()}
                      </h3>
                      <p className="text-gray-400 text-xs mb-3">
                        {channel.subCount} subscribers
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
            <button
              onClick={() => scroll(ref, "right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {channelSectionInfo?.playListVideos &&
        playListVideos?.map((vid) => {
          const transformedVideos: Video[] = vid.videos.items.map((v) => {
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
              // channelName: v.snippet.channelTitle,
              // channelImageUrl: v.snippet.,
            };
          });
          return (
            <PlaylistSection
              key={vid.title}
              channelVideos={transformedVideos}
              playListDescription={vid.description}
              playListTitle={vid.title}
            />
          );
        })}
    </div>
  );
}

function PlaylistSection({
  channelVideos,
  playListDescription,
  playListTitle,
}: {
  playListTitle: string;
  playListDescription: string;
  channelVideos: Video[];
}) {
  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (!ref) return;
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex items-center gap-4  mb-4">
        <h2 className="text-xl font-semibold text-white">{playListTitle}</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          Play all
        </Button>
      </div>
      <p className="text-gray-400 text-sm mb-4 max-w-4xl">
        {playListDescription}
      </p>
      <div className="relative group">
        <button
          onClick={() => scroll(ref, "left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        >
          {channelVideos.map((video) => (
            <div key={video.id} className="flex-shrink-0 w-64">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(ref, "right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
