import { Skeleton } from "@/components/ui/skeleton";

interface VideoCardSkeletonProps {
  layout?: "grid" | "horizontal";
}

export function VideoCardSkeleton({ layout = "grid" }: VideoCardSkeletonProps) {
  if (layout === "horizontal") {
    return (
      <div className="flex gap-2">
        <Skeleton className="flex-shrink-0 w-40 aspect-video rounded-lg" />
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-video rounded-xl" />
      <div className="flex gap-3">
        <Skeleton className="h-9 w-9 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}
