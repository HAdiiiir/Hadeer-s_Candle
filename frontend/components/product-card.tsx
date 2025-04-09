"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"

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

  return (
    <Link
      href={`/products/${product._id}`}
      className="product-card group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all"
    >
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-[#A569BD]"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toast({
              title: "Added to favorites",
              description: `${product.name} has been added to your favorites`,
            })
          }}
        >
          <Heart className="h-4 w-4 text-[#8E44AD]" />
        </Button>
      </div>
      <div className="aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {product.fragrance && (
            <Badge variant="outline" className="bg-[#E8D9F5] text-xs text-[#8E44AD]">
              {product.fragrance}
            </Badge>
          )}
          <Badge variant="outline" className="bg-[#F3E5F5] text-xs text-[#8E44AD]">
            {product.type}
          </Badge>
        </div>
        <h3 className="font-semibold text-[#6C3483]">{product.name}</h3>
        <p className="text-sm text-[#9B59B6]">
          {product.size && `${product.size} - `}
          {product.type}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-bold text-[#8E44AD]">EGP {product.price}</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleAddToCart}
            className="rounded-full hover:bg-[#8E44AD] hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
