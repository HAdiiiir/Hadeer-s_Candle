import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Check } from "lucide-react"

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

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-purple-600">Search Results</h1>
      {query ? (
        <p className="text-gray-500">Showing results for &quot;{query}&quot;</p>
      ) : (
        <p className="text-gray-500">Enter a search term to find products</p>
      )}
      
      <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search for candles..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="pr-16 border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200" // Added purple border and focus styles
          />
          {isFocused || searchValue ? (
            <Button
              type="submit"
              variant="link"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-0 h-auto ${
                searchValue ? "text-purple-500" : "text-gray-400"
              }`}
            >
              done
            </Button>
          ) : null}
        </div>
        <Button type="submit" className="bg-purple-600 text-white hover:bg-purple-700">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  )
}
