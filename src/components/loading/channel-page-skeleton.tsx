// import { HeaderSkeleton } from "@/components/skeletons/header-skeleton";
// import { ChannelPageSkeleton } from "@/components/skeletons/channel-page-skeleton";

import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton } from "./video-card-skeleton";

export function ChannelBannerSkeleton() {
  return <Skeleton className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64" />;
}

export function ChannelInfoSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 py-6 border-b border-gray-800">
        <div className="flex items-start gap-6">
          <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full" />
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-2xl" />
              <Skeleton className="h-4 w-3/4 max-w-xl" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChannelTabsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex gap-8 border-b border-gray-800">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-16 mb-4" />
        ))}
      </div>
    </div>
  );
}

export function ChannelVideosSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* For you section */}
        <div>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <VideoCardSkeleton layout="horizontal" />
              </div>
            ))}
          </div>
        </div>

        {/* Videos section */}
        <div>
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64">
                <VideoCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChannelPageSkeleton() {
  return (
    <div className="min-h-screen text-white">
      <ChannelBannerSkeleton />
      <ChannelInfoSkeleton />
      <ChannelTabsSkeleton />
      <ChannelVideosSkeleton />
    </div>
  );
}

export default function ChannelPageLoadingSkeleton() {
  return (
    <div className="min-h-screen ">
      <ChannelPageSkeleton />
    </div>
  );
}
