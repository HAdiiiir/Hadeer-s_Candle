import { SearchFilters } from "@/components/search-filters"
import { SearchHeader } from "@/components/search-header"
import { SearchResults } from "@/components/search-results"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <SearchHeader query={query} />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <SearchFilters />
        </div>
        <div className="lg:col-span-3">
          <SearchResults query={query} />
        </div>
      </div>
    </div>
  )
}

