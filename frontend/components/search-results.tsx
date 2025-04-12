import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const searchResults = [
  {
    _id: "1",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    fragrance: "Vanilla & Amber",
    images: ["/candles/gel-vanilla-amber.jpg"],
    ratings: [5, 4, 5],
    averageRating: 4.7
  },
  {
    _id: "2",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "165g",
    type: "Gel Wax",
    fragrance: "Ocean Breeze",
    images: ["/candles/gel-ocean.jpg"],
    ratings: [4, 5],
    averageRating: 4.5
  },
  // باقي المنتجات...
]

export function SearchResults({ query }: { query: string }) {
  const results = query
    ? searchResults.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="bg-purple-50 p-6 rounded-full">
          <Search className="h-10 w-10 text-purple-400" />
        </div>
        <h3 className="text-lg font-medium text-purple-800">
          {query ? "No products found" : "Search for products"}
        </h3>
        <p className="text-center text-purple-600 max-w-md">
          {query 
            ? `We couldn't find any products matching "${query}"`
            : "Enter a search term to discover our candle collection"}
        </p>
        {query && (
          <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
            Clear Search
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-purple-700">
          Showing <span className="font-medium">{results.length}</span> {results.length === 1 ? 'result' : 'results'}
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700">Sort by:</span>
          <Select>
            <SelectTrigger className="w-[180px] border-purple-200 focus:ring-purple-300">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent className="border-purple-100 bg-white">
              <SelectItem value="relevance" className="focus:bg-purple-50">Relevance</SelectItem>
              <SelectItem value="price-low" className="focus:bg-purple-50">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="focus:bg-purple-50">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((product) => (
          <div 
            key={product._id} 
            className="group relative overflow-hidden rounded-xl border border-purple-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <Link href={`/products/${product._id}`} className="block">
              <div className="aspect-square overflow-hidden">
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </Link>

            <div className="p-4 space-y-2">
              <Link href={`/products/${product._id}`}>
                <h3 className="text-lg font-semibold text-purple-800 group-hover:text-purple-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex flex-wrap gap-1">
                {product.fragrance && (
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                    {product.fragrance}
                  </span>
                )}
                <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  {product.size || product.type}
                </span>
              </div>

              {product.ratings?.length > 0 && (
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="text-xs text-gray-600">
                    {product.averageRating?.toFixed(1)} ({product.ratings.length})
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mt-3">
                <p className="text-lg font-bold text-purple-600">EGP {product.price}</p>
                <Button 
                  size="sm" 
                  className="rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}