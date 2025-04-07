import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchHeader({ query }: { query: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Search Results</h1>
      {query ? (
        <p className="text-gray-500">Showing results for &quot;{query}&quot;</p>
      ) : (
        <p className="text-gray-500">Enter a search term to find products</p>
      )}
      <div className="flex w-full max-w-lg items-center space-x-2">
        <Input type="search" placeholder="Search for candles..." defaultValue={query} className="flex-1" />
        <Button type="submit">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  )
}

