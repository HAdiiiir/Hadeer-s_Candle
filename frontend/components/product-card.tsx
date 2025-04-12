"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
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
}

export function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    try {
      await addToCart(product._id, 1)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        className: "border-purple-200 bg-purple-50 text-purple-800",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  const productImage = product.images?.[0] || `/placeholder.svg?height=400&width=400`

  return (
    <Link
      href={`/products/${product._id}`}
      className="group relative block overflow-hidden rounded-lg border border-purple-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
    >
      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toast({
            title: "Added to favorites",
            description: `${product.name} has been added to your favorites`,
            className: "border-purple-200 bg-purple-50 text-purple-800",
          })
        }}
      >
        <Heart className="h-4 w-4 fill-purple-100 text-purple-600 group-hover:fill-purple-200 transition-colors" />
      </Button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <Image
          src={productImage}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Badges */}
        <div className="mb-2 flex flex-wrap gap-1">
          {product.fragrance && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
              {product.fragrance}
            </Badge>
          )}
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
            {product.type}
          </Badge>
          {product.size && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
              {product.size}
            </Badge>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
          {product.name}
        </h3>

        {/* Additional Info */}
        {product.burnTime && (
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Burn Time:</span> {product.burnTime}
          </p>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-purple-600">EGP {product.price.toFixed(2)}</p>
            {product.ratings?.length ? (
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-2">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                  <span className="text-xs text-gray-500">
                    {product.averageRating?.toFixed(1)} ({product.ratings.length})
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-gray-300 mr-1" />
                <span className="text-xs text-gray-400">No reviews</span>
              </div>
            )}
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick View Button (appears on hover) */}
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-purple-200 text-purple-700 hover:bg-purple-50"
          asChild
        >
          <Link href={`/products/${product._id}`} className="flex items-center">
            Quick View <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </Link>
  )
}