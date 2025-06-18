import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton } from "./video-card-skeleton";

export function WatchPageSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1800px] mx-auto px-4">
      <div className="flex-1">
        {/* Video Player Skeleton */}
        <Skeleton className="aspect-video w-full rounded-xl" />

        {/* Video Title */}
        <div className="mt-3 space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Channel Info and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-8 w-20 ml-2" />
            <Skeleton className="h-8 w-8 ml-1" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>

        {/* Description Box */}
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6 space-y-4">
          <Skeleton className="h-6 w-32" />

          {/* Comment Input */}
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 flex-1" />
          </div>

          {/* Comments List */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center gap-4 mt-2">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-12" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="lg:w-[360px] flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <VideoCardSkeleton key={i} layout="horizontal" />
        ))}
      </div>
    </div>
  );
}
