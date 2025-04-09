import Link from "next/link"
import Image from "next/image"

// بيانات المنتجات الجديدة
const searchResults = [
  {
    _id: "1",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    fragrance: "Vanilla & Amber",
    images: ["/candles/gel-vanilla-amber.jpg"],
  },
  {
    _id: "2",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "165g",
    type: "Gel Wax",
    fragrance: "Ocean Breeze",
    images: ["/candles/gel-ocean.jpg"],
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
        <p className="text-sm text-purple-600">Showing {results.length} results</p>
        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm text-purple-600">
          <option>Sort by: Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="group relative rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
          >
            <div className="aspect-square overflow-hidden rounded-t-2xl">
              <Image
                src={product.images?.[0] || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-purple-800">{product.name}</h3>
              <p className="text-sm text-gray-500">
                {product.size ? `${product.size} - ` : ""}
                {product.type}
              </p>
              <p className="text-sm text-gray-600 italic">{product.fragrance}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-md font-bold text-purple-700">EGP {product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
