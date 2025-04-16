import { ProductCard } from "@/components/product-card"
import { useState } from "react"

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
  const [sortOption, setSortOption] = useState<string>('featured')

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price
      case 'price-high-low':
        return b.price - a.price
      case 'newest':
        // Assuming you have a createdAt field - if not, you'll need to add it
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      default:
        return 0 // Keep original order for 'featured'
    }
  })

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
        <select 
          className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="featured">Sort by: Featured</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}