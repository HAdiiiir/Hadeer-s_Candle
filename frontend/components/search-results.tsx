import Link from "next/link"
import Image from "next/image"

// Sample search results data
const searchResults = [
  {
    id: "1",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "Luxury Gel Wax Candle",
    price: 404,
    size: "165g",
    type: "Gel Wax",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "7",
    name: "Teddy Bear Shaped Candle",
    price: 450,
    type: "Shaped Candle",
    image: "/placeholder.svg?height=400&width=400",
  },
]

export function SearchResults({ query }: { query: string }) {
  // In a real app, you would filter results based on the query
  const results = query ? searchResults : []

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-gray-500">
          {query ? "No products found matching your search." : "Enter a search term to find products."}
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Showing {results.length} results</p>
        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.size && `${product.size} - `}
                {product.type}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="font-bold">EGP {product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

