"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Star, ChevronRight, Award, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useFavorites } from "@/lib/favorites-context"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
    isBestSeller?: boolean
    isNew?: boolean
    stock?: number
    description?: string
  }
  variant?: "default" | "compact"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your favorites",
        variant: "destructive",
      })
      return
    }

    if (isFavorite(product._id)) {
      removeFavorite(product._id)
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites`,
        className: "border-purple-200 bg-purple-50 text-purple-800",
      })
    } else {
      addFavorite(product._id)
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites`,
        className: "border-purple-200 bg-purple-50 text-purple-800",
      })
    }
  }

  const productImage = product.images?.[0] || `/placeholder.svg`

  if (variant === "compact") {
    return (
      <div className="group relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
        <Link href={`/products/${product._id}`} className="block">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            
            <div className="flex flex-wrap gap-1 mb-2">
              <Badge variant="secondary">{product.type}</Badge>
              {product.fragrance && (
                <Badge variant="outline">{product.fragrance}</Badge>
              )}
            </div>
            
            {product.description && (
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            )}
            
            <div className="flex justify-between items-center">
              <span className="font-bold">EGP {product.price.toFixed(2)}</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleAddToCart}
                className="rounded-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="group relative block overflow-hidden rounded-lg border border-purple-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      {/* Status Badges */}
      {product.isBestSeller && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-amber-500 text-white hover:bg-amber-600 flex items-center">
            <Award className="h-3 w-3 mr-1" />
            Best Seller
          </Badge>
        </div>
      )}
      
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-green-500 text-white hover:bg-green-600">
            New Arrival
          </Badge>
        </div>
      )}

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
        onClick={handleFavoriteClick}
      >
        <Heart className={cn(
          "h-4 w-4 text-purple-600 transition-colors",
          isFavorite(product._id) ? "fill-purple-600" : "fill-purple-100"
        )} />
      </Button>

      {/* Product Image Link */}
      <Link href={`/products/${product._id}`} className="block">
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/products/${product._id}`} className="block">
          {/* Badges */}
          <div className="mb-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
              {product.type}
            </Badge>
            {product.fragrance && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                {product.fragrance}
              </Badge>
            )}
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
          <div className="mt-1 space-y-1">
            {product.burnTime && (
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Burn Time:</span> {product.burnTime}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-4 w-4 ml-1 text-gray-400">
                        <Info className="h-3 w-3" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Estimated burn time based on wax type and size</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            
            {product.waxType && (
              <p className="text-sm text-gray-500">
                <span className="font-medium">Wax:</span> {product.waxType}
              </p>
            )}
          </div>
        </Link>

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="font-bold text-purple-600">EGP {product.price.toFixed(2)}</p>
            {product.ratings?.length ? (
              <div className="flex items-center mt-1">
                <div className="flex items-center mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.averageRating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"} mr-0.5`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({product.ratings.length})
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
            disabled={product.stock !== undefined && product.stock <= 0}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-2 text-xs text-gray-500">
            {product.stock > 0 ? (
              <span className="text-green-600">{product.stock} in stock</span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </div>
        )}

        {/* Quick View Button */}
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
    </div>
  )
}