import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  price: number
  type: string
  size?: string
  images: string[]
  fragrance?: string
  category?: string
  waxType?: string
  burnTime?: string
  ratings?: any[]
  averageRating?: number
}

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border p-4 shadow-sm">
            <div className="aspect-square animate-pulse bg-gray-200" />
            <div className="mt-4 h-4 w-3/4 animate-pulse bg-gray-200" />
            <div className="mt-2 h-4 w-1/2 animate-pulse bg-gray-200" />
            <div className="mt-4 h-6 w-1/4 animate-pulse bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-center text-gray-500">No products found.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">Showing {products.length} products</p>
        <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
