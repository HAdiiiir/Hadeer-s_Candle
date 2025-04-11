"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductsHeader } from "@/components/products-header"
import { productAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const category = searchParams.get("category")
  const type = searchParams.get("type")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const size = searchParams.get("size")
  const shape = searchParams.get("shape")
  const search = searchParams.get("search")

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // Build query params
        const params: Record<string, string> = {}
        if (category) params.category = category
        if (type) params.type = type
        if (minPrice) params.minPrice = minPrice
        if (maxPrice) params.maxPrice = maxPrice
        if (size) params.size = size
        if (shape) params.shape = shape
        if (search) params.search = search

        const response = await productAPI.getProducts(params)
        setProducts(response.products)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch products",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category, type, minPrice, maxPrice, size, shape, search, toast])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <ProductsHeader category={category} type={type} />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
