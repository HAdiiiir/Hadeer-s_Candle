"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

interface ProductCardProps {
  product: {
    _id: string
    name: string
    price: number
    type: string
    size?: string
    images: string[]
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
      className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
    >
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
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">
          {product.size && `${product.size} - `}
          {product.type}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-bold">EGP {product.price}</p>
          <Button size="sm" variant="ghost" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Link>
  )
}

