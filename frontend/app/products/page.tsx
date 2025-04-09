"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductsHeader } from "@/components/products-header"
import { productAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  // States for products and loading status
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  // Fetching search params from URL
  const searchParams = useSearchParams()
  
  // Toast for displaying error messages
  const { toast } = useToast()

  // Extracting query parameters
  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const size = searchParams.get("size")
  const shape = searchParams.get("shape")

  // Fetching products based on the query params
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)  // Setting loading to true before fetching

      try {
        // Preparing query params dynamically
        const params: Record<string, string> = {}
        if (category) params.category = category
        if (type) params.type = type
        if (minPrice) params.minPrice = minPrice
        if (maxPrice) params.maxPrice = maxPrice
        if (size) params.size = size
        if (shape) params.shape = shape

        // Calling the product API with the query params
        const response = await productAPI.getProducts(params)
        setProducts(response.products)  // Setting products in the state
      } catch (error: any) {
        // Displaying error toast if fetch fails
        toast({
          title: "Error",
          description: error.message || "Failed to fetch products",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)  // Setting loading to false after the fetch completes
      }
    }

    fetchProducts()
  }, [category, type, minPrice, maxPrice, size, shape, toast])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      {/* Products header component with category passed as prop */}
      <ProductsHeader category={category} />
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters section */}
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        {/* Products grid section */}
        <div className="lg:col-span-3">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
