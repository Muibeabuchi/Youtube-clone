import { Skeleton } from "@/components/ui/skeleton";

interface CommentSkeletonProps {
  count?: number;
}

export function CommentSkeleton({ count = 5 }: CommentSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
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
  );
}
