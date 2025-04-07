"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatedProducts } from "@/components/related-products"
import { productAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await productAPI.getProduct(params.id)
        setProduct(response.product)
        setRelatedProducts(response.relatedProducts)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch product",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, toast])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    try {
      await addToCart(product._id, quantity)
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

  if (isLoading) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="aspect-square animate-pulse bg-gray-200 rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse bg-gray-200" />
            <div className="h-6 w-1/4 animate-pulse bg-gray-200" />
            <div className="h-24 w-full animate-pulse bg-gray-200" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-gray-500">Product not found.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <Image
              src={product.images[0] || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(0, 3).map((image: string, index: number) => (
              <div key={index} className="overflow-hidden rounded-lg border">
                <Image
                  src={image || "/placeholder.svg?height=200&width=200"}
                  alt={`${product.name} ${index + 1}`}
                  width={200}
                  height={200}
                  className="aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${
                        i < Math.round(product.averageRating || 0) 
                          ? "fill-primary text-primary" 
                          : "text-gray-300"
                      }`} 
                    />
                \
                          : "text-gray-300"
                      }`} 
                    />
                  ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.ratings?.length || 0} reviews)
              </span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold">EGP {product.price}</p>
            <p className="text-sm text-gray-500">Including all taxes</p>
          </div>
          <div className="space-y-2">
            {product.size && <p className="font-medium">Size: {product.size}</p>}
            <p className="font-medium">Type: {product.type}</p>
            <p className="font-medium">
              Availability: 
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? " In Stock" : " Out of Stock"}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Quantity</p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button 
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-2">
                {product.size && (
                  <p>
                    <span className="font-medium">Size:</span> {product.size}
                  </p>
                )}
                <p>
                  <span className="font-medium">Type:</span> {product.type}
                </p>
                <p>
                  <span className="font-medium">Weight:</span> {product.weight}g
                </p>
                {product.isShapedCandle && product.shape && (
                  <p>
                    <span className="font-medium">Shape:</span> {product.shape}
                  </p>
                )}
                <p>
                  <span className="font-medium">Burn Time:</span> Approximately {product.weight / 10} hours
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              {product.ratings && product.ratings.length > 0 ? (
                <div className="space-y-4">
                  {product.ratings.map((rating: any, index: number) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="font-medium">{rating.userId?.name || 'Anonymous'}</p>
                          <div className="ml-2 flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < rating.rating 
                                      ? "fill-primary text-primary" 
                                      : "text-gray-300"
                                  }`} 
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(rating.date).toLocaleDateString()}
                        </p>
                      </div>
                      {rating.review && <p className="mt-2 text-gray-600">{rating.review}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

