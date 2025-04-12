import { ProductCard } from "@/components/product-card"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="mt-16 py-8 bg-purple-50/30 rounded-lg">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-purple-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              You May Also Like
            </span>
          </h2>
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 flex items-center gap-1"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Carousel indicators for mobile */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {products.slice(0, 4).map((_, index) => (
            <div 
              key={index} 
              className="h-2 w-2 rounded-full bg-purple-200"
            />
          ))}
        </div>
      </div>
    </section>
  )
}