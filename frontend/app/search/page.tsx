"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchFilters } from "@/components/search-filters"
import { SearchHeader } from "@/components/search-header"
import { SearchResults } from "@/components/search-results"
import { SearchSkeleton } from "@/components/search-skeleton"
import { NoResults } from "@/components/no-results"
import { useDebounce } from "@/hooks/use-debounce"
import { FilterProvider } from "@/context/filter-context"
import { Pagination } from "@/components/pagination"

export default function SearchPage() {
  return (
    <FilterProvider>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchContent />
      </Suspense>
    </FilterProvider>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || "relevance"
  const page = parseInt(searchParams.get("page") || "1")
  const priceRange = searchParams.get("price") || "0-1000"
  const [minPrice, maxPrice] = priceRange.split("-").map(Number)

  // Debounce the query for better performance
  const debouncedQuery = useDebounce(query, 300)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Header Section with breadcrumbs and search stats */}
      <SearchHeader 
        query={debouncedQuery} 
        resultsCount={0} // Will be filled by SearchResults
        className="mb-8"
      />
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Section - Sticky on desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <SearchFilters 
              currentCategory={category}
              currentPriceRange={[minPrice, maxPrice]}
              currentSort={sort}
            />
            
            {/* Recently viewed items (optional) */}
            <div className="hidden lg:block p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-sm mb-3">Recently Viewed</h3>
              {/* Add your recently viewed items component here */}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* Results count and sorting controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Showing results for: <span className="font-medium text-foreground">"{debouncedQuery}"</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                {/* Replace with your sort dropdown component */}
                <select 
                  defaultValue={sort}
                  className="text-sm border rounded-md px-3 py-1 bg-background"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Main results with loading state */}
            <Suspense fallback={<SearchSkeleton itemCount={12} />}>
              <SearchResults 
                query={debouncedQuery}
                category={category}
                sort={sort}
                minPrice={minPrice}
                maxPrice={maxPrice}
                page={page}
              />
            </Suspense>

            {/* No results fallback */}
            <NoResults query={debouncedQuery} />

            {/* Pagination controls */}
            <Pagination 
              currentPage={page}
              totalPages={10} // Replace with actual total pages from API
              className="mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}