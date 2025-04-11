"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"

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
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      })
    }
  }

  // Use placeholder image if product image is not available
  const productImage =
    product.images && product.images.length > 0 ? product.images[0] : `/placeholder.svg?height=400&width=400`

  return (
    <Link
      href={`/products/${product._id}`}
      className="product-card group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-all"
    >
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toast({
              title: "Added to favorites",
              description: `${product.name} has been added to your favorites`,
            })
          }}
        >
          <Heart className="h-4 w-4 text-purple-600" />
        </Button>
      </div>
      <div className="aspect-square overflow-hidden">
        <Image
          src={productImage || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {product.fragrance && (
            <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs border-purple-200">
              {product.fragrance}
            </Badge>
          )}
          <Badge variant="outline" className="bg-muted text-xs">
            {product.type}
          </Badge>
          {product.size && (
            <Badge variant="outline" className="bg-muted text-xs">
              {product.size}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.burnTime && `Burn time: ${product.burnTime}`}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-bold text-purple-600">EGP {product.price}</p>
          <div className="flex items-center">
            {product.ratings && product.ratings.length > 0 && (
              <div className="flex items-center mr-2 text-xs text-gray-500">
                <Star
                  className={`h-3 w-3 mr-1 ${product.averageRating && product.averageRating > 0 ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                />
                <span>
                  {product.ratings.length} {product.ratings.length === 1 ? "review" : "reviews"}
                </span>
              </div>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleAddToCart}
              className="rounded-full hover:bg-purple-600 hover:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
