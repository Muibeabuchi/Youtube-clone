import { WatchPageSkeleton } from "@/components/loading/watch-page-skeleton";
import { singleVideoQueryOptions } from "@/utils/videos";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VideoCard } from "@/components/video-card";
import { CommentSection } from "@/components/comment-section";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
  Bell,
} from "lucide-react";
import { z } from "zod";
import { formatYouTubeViewCount, getYouTubePublishedDate } from "@/lib/utils";
import { commentsOfVideoOptions } from "@/utils/comments";
import { CommentSkeleton } from "@/components/loading/comments-loading";

export const Route = createFileRoute("/watch")({
  validateSearch: z.object({
    v: z.string(),
    list: z.string().optional(),
  }),
  loaderDeps: ({ search: { v, list } }) => ({ v, list }),
  beforeLoad: ({ search }) => {
    if (!search.v || search.v.length === 0) {
      throw redirect({
        to: "/",
      });
    }
  },
  async loader({ context, deps }) {
    const videoId = deps.v;
    const playlistId = deps.list;

    // prefetch the comments for this video
    context.queryClient.prefetchQuery(commentsOfVideoOptions(videoId));
    // prefetch the playlist info if the list search parameter exists
    // context.queryClient.prefetchQuery(commentsOfVideoOptions(videoId));

    await context.queryClient.ensureQueryData(singleVideoQueryOptions(videoId));
  },
  component: RouteComponent,
  pendingComponent: WatchPageSkeleton,
});

function RouteComponent() {
  const { v: videoId } = Route.useSearch();
  const { data: singleVideo } = useSuspenseQuery(
    singleVideoQueryOptions(videoId)
  );
  const videoItems = singleVideo.items[0];
  const videoChannelImageUrl = singleVideo.channelImageUrl;
  const videoChannelSubCount = singleVideo.channelSubCount;

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row gap-4 xl:gap-6 w-full max-w-[1800px] mx-auto px-3 sm:px-4">
      <div className="flex-1 min-w-0">
        {/* Video Player */}
        <div className="lg:h-[450px] h-[400px] aspect-video w-full bg-black rounded-lg xl:rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoItems.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* <ReactPlayer url={`https://www.youtube.com/embed/${videoId}`} /> */}
        </div>

        {/* Video Info */}
        <div className="mt-3 sm:mt-4">
          <h1 className="text-lg sm:text-xl font-semibold line-clamp-2">
            {videoItems.snippet.title}
          </h1>

          {/* Mobile Channel Info */}
          <div className="flex items-center justify-between mt-3 sm:hidden">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={videoChannelImageUrl}
                  alt={videoItems.snippet.channelTitle}
                />
                <AvatarFallback>
                  {videoItems.snippet.channelTitle.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">
                  {videoItems.snippet.channelTitle}
                </h3>
                {/* <p className="text-xs text-muted-foreground">
                  {videoItems.statistics} subscribers
                </p> */}
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-muted hover:bg-muted/80"
              disabled={true}
            >
              Subscribe
            </Button>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex items-center justify-between mt-3 sm:hidden">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="flex gap-1 px-3">
                <ThumbsUp className="h-4 w-4" />
                <span className="text-xs">
                  {videoItems.statistics.likeCount}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="flex gap-1 px-3">
                <Share2 className="h-4 w-4" />
                <span className="text-xs">Share</span>
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-col lg:flex-row lg:items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-3">
              <Link
                to={`/channel/$channelId`}
                params={{
                  channelId: videoItems.snippet.channelId,
                }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={videoChannelImageUrl}
                    alt={videoItems.snippet.channelTitle}
                  />
                  <AvatarFallback>
                    {videoItems.snippet.channelTitle}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link
                  to={`/channel/$channelId`}
                  params={{
                    channelId: videoItems.snippet.channelId,
                  }}
                >
                  <h3 className="font-medium text-sm">
                    {videoItems.snippet.channelTitle}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {formatYouTubeViewCount(Number(videoChannelSubCount))}{" "}
                  subscribers
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="ml-2 bg-muted hover:bg-muted/80"
              >
                Subscribe
              </Button>
              <Button variant="ghost" size="icon" className="ml-1">
                <Bell className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-muted rounded-full flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-l-full rounded-r-none px-4 flex gap-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>
                    {formatYouTubeViewCount(
                      Number(videoItems.statistics.likeCount)
                    )}
                  </span>
                </Button>
                <Separator
                  orientation="vertical"
                  className="h-6  dark:bg-muted-foreground"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-r-full rounded-l-none px-4"
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-4 flex gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="rounded-full px-4 flex gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Description */}
          <div
            className={`mt-4 bg-muted/50 rounded-xl p-3 ${
              isDescriptionExpanded ? "" : "cursor-pointer"
            }`}
            onClick={() =>
              !isDescriptionExpanded && setIsDescriptionExpanded(true)
            }
          >
            <div className="flex items-center gap-2 text-sm">
              <span>
                {formatYouTubeViewCount(
                  Number(videoItems.statistics.viewCount)
                )}{" "}
                views
              </span>
              <span>•</span>
              <span>
                {getYouTubePublishedDate(videoItems.snippet.publishedAt)}
              </span>
            </div>

            <div
              className={`mt-2 text-sm whitespace-pre-line ${
                !isDescriptionExpanded && "line-clamp-2"
              }`}
            >
              {videoItems.snippet.description}
            </div>

            {!isDescriptionExpanded && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 p-0 h-auto font-semibold text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDescriptionExpanded(true);
                }}
              >
                Show more
              </Button>
            )}

            {isDescriptionExpanded && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto font-semibold text-sm"
                onClick={() => setIsDescriptionExpanded(false)}
              >
                Show less
              </Button>
            )}
          </div>
        </div>

        {/* Comments - Hidden on mobile in sidebar view */}
        <Suspense fallback={<CommentSkeleton />}>
          <div className="xl:block">
            <CommentSection videoId={videoId} />
          </div>
        </Suspense>
      </div>

      {/* Related Videos Sidebar */}

      {/* Mobile Comments - Show below related videos
      <div className="xl:hidden">
        <CommentSection videoId={videoId} />
      </div> */}
    </div>
  );
}
