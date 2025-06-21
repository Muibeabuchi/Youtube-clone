import { Skeleton } from "@/components/ui/skeleton";

function VideoResultSkeleton() {
  return (
    <div className="flex gap-4 mb-8">
      {/* Video Thumbnail */}
      <div className="flex-shrink-0">
        <Skeleton className="w-[360px] h-[202px] rounded-xl" />
      </div>

      {/* Video Info */}
      <div className="flex-1 min-w-0 pt-1 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

function ChannelResultSkeleton() {
  return (
    <div className="flex gap-6 mb-8">
      {/* Channel Avatar */}
      <div className="flex-shrink-0">
        <Skeleton className="w-[120px] h-[120px] rounded-full" />
      </div>

      {/* Channel Info */}
      <div className="flex-1 min-w-0 pt-2 space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-48" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-3/4 max-w-xl" />
        </div>

        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}

function PlaylistResultSkeleton() {
  return (
    <div className="flex gap-4 mb-8">
      {/* Playlist Thumbnail */}
      <div className="flex-shrink-0">
        <Skeleton className="w-[360px] h-[202px] rounded-xl" />
      </div>

      {/* Playlist Info */}
      <div className="flex-1 min-w-0 pt-1 space-y-3">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
        </div>

        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="min-h-screen  text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1" />
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>

        {/* Search Results */}
        <div className="space-y-0">
          {Array.from({ length: 8 }).map((_, index) => {
            const resultType = index % 3;
            return (
              <div
                key={index}
                className={
                  index !== 7 ? "border-b border-gray-800/50 pb-6" : ""
                }
              >
                {resultType === 0 && <VideoResultSkeleton />}
                {resultType === 1 && <ChannelResultSkeleton />}
                {resultType === 2 && <PlaylistResultSkeleton />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
