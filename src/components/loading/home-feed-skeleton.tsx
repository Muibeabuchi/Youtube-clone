import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton } from "./video-card-skeleton";

export function CategoryTabsSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {Array.from({ length: 12 }).map((_, index) => (
        <Skeleton key={index} className="h-8 w-20 rounded-full flex-shrink-0" />
      ))}
    </div>
  );
}

export function VideoGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
      {Array.from({ length: 16 }).map((_, index) => (
        <VideoCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomeFeedSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CategoryTabsSkeleton />
        <VideoGridSkeleton />
      </main>
    </div>
  );
}
