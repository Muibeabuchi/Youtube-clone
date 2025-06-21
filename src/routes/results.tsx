import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { searchQueryOptions } from "@/utils/search";
import { HeaderSkeleton } from "@/components/loading/header-skeleton";
import { SearchResultsSkeleton } from "@/components/loading/search-results-skeleton";
import { SearchResultsPage } from "@/components/search-results";

const searchSchema = z.object({
  search_query: z.string().catch(""),
});

function SearchPageLoader() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <HeaderSkeleton />
      <main>
        {/* <div className="border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <CategoryTabsSkeleton />
          </div>
        </div> */}
        <SearchResultsSkeleton />
      </main>
    </div>
  );
}

export const Route = createFileRoute("/results")({
  validateSearch: zodValidator(searchSchema),
  loaderDeps: ({ search: { search_query } }) => ({ search_query }),
  loader: async ({ context, deps: { search_query } }) => {
    const searchResult = await context.queryClient.ensureQueryData(
      searchQueryOptions(search_query)
    );
    console.log({ searchResult });
  },
  pendingComponent: SearchPageLoader,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <main>
        <SearchResultsPage />
      </main>
    </div>
  );
}
