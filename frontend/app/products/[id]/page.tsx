"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatedProducts } from "@/components/related-products"
import { productAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample fragrance descriptions
const fragranceDescriptions = {
  "Vanilla & Amber": "A warm, sweet blend of vanilla bean and rich amber, creating a cozy and inviting atmosphere.",
  "Lavender & Chamomile": "A calming, floral blend that promotes relaxation and tranquility.",
  "Citrus & Bergamot": "A refreshing, uplifting blend of citrus fruits and bergamot for an energizing experience.",
  "Cinnamon & Spice": "A warm, spicy blend perfect for creating a cozy atmosphere during colder months.",
  "Rose & Peony": "A romantic floral blend with notes of fresh rose and peony for an elegant ambiance.",
  "Sandalwood & Cedar": "A woody, earthy blend that creates a grounding and calming environment.",
  "Ocean Breeze": "A fresh, clean scent reminiscent of sea air and coastal breezes.",
  "Fresh Linen": "A clean, crisp scent that evokes the feeling of freshly laundered linens.",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()

  // Add fragrance to sample product data
  const addFragranceToProduct = (product: any) => {
    if (!product) return null

    const fragrances = Object.keys(fragranceDescriptions)
    const randomFragrance = fragrances[Math.floor(Math.random() * fragrances.length)]

    return {
      ...product,
      fragrance: product.fragrance || randomFragrance,
      fragranceDescription: fragranceDescriptions[randomFragrance as keyof typeof fragranceDescriptions],
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await productAPI.getProduct(params.id)
        setProduct(addFragranceToProduct(response.product))

        // Add fragrances to related products
        const enhancedRelatedProducts = response.relatedProducts.map((product: any) => addFragranceToProduct(product))
        setRelatedProducts(enhancedRelatedProducts)
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
          <div className="overflow-hidden rounded-lg border bg-white">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              width={600}
              height={600}
              className="aspect-square object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image: string, index: number) => (
              <div
                key={index}
                className={`overflow-hidden rounded-lg border cursor-pointer ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
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
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{product.type}</Badge>
              {product.fragrance && (
                <Badge variant="outline" className="bg-secondary/50">
                  {product.fragrance}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.averageRating || 0) ? "fill-primary text-primary" : "text-gray-300"
                      }`}
                    />
                  ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({product.ratings?.length || 0} reviews)</span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">EGP {product.price}</p>
            <p className="text-sm text-gray-500">Including all taxes</p>
          </div>

          {product.fragrance && (
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <h3 className="font-medium text-primary">Fragrance Notes</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-1 h-5 w-5 text-gray-400">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Our candles are made with premium fragrance oils for a long-lasting scent experience</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-gray-600">{product.fragranceDescription}</p>
            </div>
          )}

          <div className="space-y-2">
            {product.size && (
              <p className="font-medium text-gray-700">
                Size: <span className="text-gray-600">{product.size}</span>
              </p>
            )}
            <p className="font-medium text-gray-700">
              Type: <span className="text-gray-600">{product.type}</span>
            </p>
            <p className="font-medium text-gray-700">
              Availability:
              <span className={product.stock > 0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-gray-700">Quantity</p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Button className="flex-1 rounded-full" onClick={handleAddToCart} disabled={product.stock <= 0}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="grid w-full grid-cols-3 bg-muted">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <p className="text-gray-600">
                {product.description ||
                  "Our handcrafted candles are made with premium materials for a luxurious experience. Each candle is carefully created to provide a clean, long-lasting burn and delightful fragrance that transforms your space."}
              </p>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <div className="space-y-2 text-gray-600">
                {product.size && (
                  <p>
                    <span className="font-medium text-gray-700">Size:</span> {product.size}
                  </p>
                )}
                <p>
                  <span className="font-medium text-gray-700">Type:</span> {product.type}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Weight:</span> {product.weight || "65"}g
                </p>
                {product.isShapedCandle && product.shape && (
                  <p>
                    <span className="font-medium text-gray-700">Shape:</span> {product.shape}
                  </p>
                )}
                {product.fragrance && (
                  <p>
                    <span className="font-medium text-gray-700">Fragrance:</span> {product.fragrance}
                  </p>
                )}
                <p>
                  <span className="font-medium text-gray-700">Burn Time:</span> Approximately{" "}
                  {(product.weight || 65) / 10} hours
                </p>
                <p>
                  <span className="font-medium text-gray-700">Wax Type:</span>{" "}
                  {product.type.includes("Gel")
                    ? "Gel Wax"
                    : product.type.includes("Soy")
                      ? "Soy Wax"
                      : product.type.includes("Palm")
                        ? "Palm Wax"
                        : "Premium Wax Blend"}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Wick Type:</span> Cotton Wick
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
                          <p className="font-medium text-gray-700">{rating.userId?.name || "Anonymous"}</p>
                          <div className="ml-2 flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < rating.rating ? "fill-primary text-primary" : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{new Date(rating.date).toLocaleDateString()}</p>
                      </div>
                      {rating.review && <p className="mt-2 text-gray-600">{rating.review}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                  <Button className="mt-4 rounded-full">Write a Review</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
