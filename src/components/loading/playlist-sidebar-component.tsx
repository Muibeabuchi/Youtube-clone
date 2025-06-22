import { Skeleton } from "@/components/ui/skeleton";

export function PlaylistSidebarSkeleton() {
  return (
    <div className="w-[400px] bg-gray-900/50 rounded-lg h-fit">
      {/* Playlist Header Skeleton */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="w-10 h-10 rounded flex-shrink-0 ml-2" />
        </div>

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
          </div>
        </div>
      </div>

      {/* Playlist Videos Skeleton */}
      <div className="max-h-[600px] overflow-y-auto">
        <div className="p-2 space-y-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex gap-3 p-2 rounded">
              {/* Video Number */}
              <div className="flex-shrink-0 w-6 flex items-start justify-center pt-1">
                <Skeleton className="h-4 w-4" />
              </div>

              {/* Video Thumbnail */}
              <div className="relative flex-shrink-0">
                <Skeleton className="w-32 h-[72px] rounded" />
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
