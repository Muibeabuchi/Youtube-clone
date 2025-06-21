import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <Skeleton className="w-full h-10 rounded-full" />
        </div>

        <Skeleton className="w-10 h-10 rounded" />
      </div>
    </header>
  );
}
