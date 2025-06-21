import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { searchQueryOptions } from "@/utils/search";
import { SearchResultsSkeleton } from "@/components/loading/search-results-skeleton";
import { SearchResultsPage } from "@/components/search-results";

const searchSchema = z.object({
  search_query: z.string().catch(""),
});

function SearchPageLoader() {
  return (
    <div className="min-h-screen ">
      <main>
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
  const { search_query } = Route.useSearch();
  return (
    <div className="min-h-screen">
      <main>
        <SearchResultsPage searchQuery={search_query} />
      </main>
    </div>
  );
}
