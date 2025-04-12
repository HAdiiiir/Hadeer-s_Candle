import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Check, X } from "lucide-react"

export function SearchHeader({ query }: { query: string }) {
  const [searchValue, setSearchValue] = useState(query)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically trigger the search action
    console.log("Searching for:", searchValue)
    // You might want to redirect to the search results page with the query
    // window.location.href = `/search?q=${encodeURIComponent(searchValue)}`
  }

  const clearSearch = () => {
    setSearchValue("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Search Results
          </h1>
          {query ? (
            <p className="text-purple-700 mt-1">
              Showing results for <span className="font-medium">"{query}"</span>
            </p>
          ) : (
            <p className="text-purple-600 mt-1">Enter a search term to find products</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-2xl items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <Input
              type="search"
              placeholder="Search for candles..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="pl-10 pr-10 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-full"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full text-purple-500 hover:bg-purple-100"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button 
            type="submit" 
            className="rounded-full bg-purple-600 text-white hover:bg-purple-700 px-6 shadow-sm hover:shadow-md transition-all"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Filter chips would go here */}
      {query && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50">
            Gel Wax
          </Button>
          <Button variant="outline" className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50">
            Under EGP 500
          </Button>
          <Button variant="outline" className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50">
            Best Rated
          </Button>
        </div>
      )}
    </div>
  )
}