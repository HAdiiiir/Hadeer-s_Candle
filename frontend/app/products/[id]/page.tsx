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

// Enhanced fragrance descriptions with more details
const fragranceDescriptions = {
  "Vanilla & Amber": {
    description: "A warm, sweet blend of vanilla bean and rich amber, creating a cozy and inviting atmosphere.",
    notes: ["Top: Madagascar Vanilla", "Middle: Tonka Bean", "Base: Golden Amber"],
    bestFor: "Living rooms, bedrooms, winter evenings"
  },
  "Lavender & Chamomile": {
    description: "A calming, floral blend that promotes relaxation and tranquility.",
    notes: ["Top: English Lavender", "Middle: Roman Chamomile", "Base: White Musk"],
    bestFor: "Bedrooms, bathrooms, meditation spaces"
  },
  "Citrus & Bergamot": {
    description: "A refreshing, uplifting blend of citrus fruits and bergamot for an energizing experience.",
    notes: ["Top: Sicilian Lemon", "Middle: Calabrian Bergamot", "Base: Green Tea"],
    bestFor: "Kitchens, home offices, morning routines"
  },
  "Cinnamon & Spice": {
    description: "A warm, spicy blend perfect for creating a cozy atmosphere during colder months.",
    notes: ["Top: Ceylon Cinnamon", "Middle: Clove Bud", "Base: Vanilla Bean"],
    bestFor: "Dining rooms, entryways, holiday gatherings"
  },
  "Rose & Musk": {
    description: "A romantic floral blend with notes of fresh rose and soft musk for an elegant ambiance.",
    notes: ["Top: Bulgarian Rose", "Middle: Peony", "Base: White Musk"],
    bestFor: "Bedrooms, dressing rooms, special occasions"
  },
  "Sandalwood & Cedar": {
    description: "A woody, earthy blend that creates a grounding and calming environment.",
    notes: ["Top: Australian Sandalwood", "Middle: Himalayan Cedar", "Base: Patchouli"],
    bestFor: "Studies, libraries, meditation spaces"
  },
  "Ocean Breeze": {
    description: "A fresh, clean scent reminiscent of sea air and coastal breezes.",
    notes: ["Top: Sea Salt", "Middle: Marine Accord", "Base: Driftwood"],
    bestFor: "Bathrooms, laundry rooms, coastal decor"
  },
  "Fresh Linen": {
    description: "A clean, crisp scent that evokes the feeling of freshly laundered linens.",
    notes: ["Top: Alpine Air", "Middle: Lily of the Valley", "Base: White Musk"],
    bestFor: "Any room, especially for creating a clean, welcoming space"
  }
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

  // Enhanced product data with fragrance details
  const enhanceProductData = (product: any) => {
    if (!product) return null

    const fragrances = Object.keys(fragranceDescriptions)
    const randomFragrance = fragrances[Math.floor(Math.random() * fragrances.length)]
    const fragranceDetails = fragranceDescriptions[randomFragrance as keyof typeof fragranceDescriptions]

    return {
      ...product,
      fragrance: product.fragrance || randomFragrance,
      fragranceDescription: fragranceDetails.description,
      fragranceNotes: fragranceDetails.notes,
      fragranceBestFor: fragranceDetails.bestFor,
      burnTime: `${Math.round((product.weight || 65) / 2.5)}-${Math.round((product.weight || 65) / 2)} hours`,
      waxType: product.type.includes("Gel") 
        ? "Premium Crystal Gel Wax" 
        : product.type.includes("Soy") 
          ? "100% Natural Soy Wax" 
          : product.type.includes("Palm") 
            ? "Sustainable Palm Wax" 
            : "Specialty Wax Blend"
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await productAPI.getProduct(params.id)
        setProduct(enhanceProductData(response.product))

        const enhancedRelatedProducts = response.relatedProducts.map((product: any) => 
          enhanceProductData(product)
        )
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
          <div className="space-y-4">
            <div className="aspect-square animate-pulse bg-gray-100 rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-9 w-3/4 animate-pulse bg-gray-100 rounded" />
            <div className="h-6 w-1/2 animate-pulse bg-gray-100 rounded" />
            <div className="h-8 w-1/4 animate-pulse bg-gray-100 rounded" />
            <div className="h-24 w-full animate-pulse bg-gray-100 rounded" />
            <div className="h-12 w-full animate-pulse bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="bg-rose-100 p-4 rounded-full">
            <Info className="h-8 w-8 text-rose-600" />
          </div>
          <p className="text-lg text-gray-600">Product not found</p>
          <Button asChild className="rounded-full">
            <Link href="/products">Browse Our Collection</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square object-cover w-full"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.slice(0, 4).map((image: string, index: number) => (
              <button
                key={index}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index 
                    ? "border-primary ring-2 ring-primary/30" 
                    : "border-transparent hover:border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Header with badges */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-primary bg-primary/10">
                {product.type}
              </Badge>
              {product.fragrance && (
                <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200">
                  {product.fragrance}
                </Badge>
              )}
              {product.isNew && (
                <Badge className="bg-green-100 text-green-800">New Arrival</Badge>
              )}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            
            <div className="mt-3 flex items-center">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.averageRating || 0) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.ratings?.length || 0} reviews)
              </span>
              {product.stock > 0 && (
                <span className="ml-4 text-sm font-medium text-green-600">
                  In Stock
                </span>
              )}
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">EGP {product.price}</p>
            <p className="text-sm text-gray-500">Including VAT & shipping</p>
          </div>

          {/* Fragrance Notes */}
          {product.fragrance && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-2">
                <h3 className="font-medium text-gray-900">Fragrance Profile</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-1 h-5 w-5 text-gray-400">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Our fragrances are crafted with premium oils for optimal scent throw and longevity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.fragranceDescription}</p>
              
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fragrance Notes</h4>
                <ul className="space-y-1">
                  {product.fragranceNotes?.map((note: string, i: number) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-primary mr-2"></span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-3">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Best For</h4>
                <p className="text-sm text-gray-600">{product.fragranceBestFor}</p>
              </div>
            </div>
          )}

          {/* Product Specifications */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Size</p>
              <p className="text-sm font-medium text-gray-900">
                {product.size || "65g"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Burn Time</p>
              <p className="text-sm font-medium text-gray-900">
                {product.burnTime}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Wax Type</p>
              <p className="text-sm font-medium text-gray-900">
                {product.waxType}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Wick</p>
              <p className="text-sm font-medium text-gray-900">
                Premium Cotton Wick
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900">Quantity</p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
                className="h-10 w-10 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-500 ml-auto">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Button 
              onClick={handleAddToCart} 
              disabled={product.stock <= 0}
              className="flex-1 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-md"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Tabs */}
          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-lg p-1 h-auto">
              <TabsTrigger 
                value="description" 
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="pt-4">
              <div className="prose prose-sm text-gray-600">
                {product.description || (
                  <>
                    <p>
                      Our handcrafted {product.type.toLowerCase()} candle is meticulously created using premium {product.waxType.toLowerCase()} for a clean, even burn. 
                      Each candle is poured by hand in small batches to ensure quality and consistency.
                    </p>
                    <p>
                      The {product.fragrance} fragrance provides a delightful aroma that fills your space with {product.fragranceDescription?.toLowerCase() || "a beautiful scent"}.
                      Perfect for {product.fragranceBestFor?.toLowerCase() || "creating a warm atmosphere"}.
                    </p>
                    <ul>
                      <li>Hand-poured in small batches</li>
                      <li>Premium {product.waxType.toLowerCase()} for clean burn</li>
                      <li>{product.burnTime} burn time</li>
                      <li>Eco-friendly cotton wick</li>
                      <li>Phthalate-free fragrances</li>
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Product Specifications</h4>
                  <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Type</dt>
                      <dd>{product.type}</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Size</dt>
                      <dd>{product.size || "65g"}</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Weight</dt>
                      <dd>{product.weight || "65"} grams</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Wax</dt>
                      <dd>{product.waxType}</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Burn Time</dt>
                      <dd>{product.burnTime}</dd>
                    </div>
                    <div className="flex">
                      <dt className="font-medium text-gray-500 w-24">Fragrance</dt>
                      <dd>{product.fragrance || "Unscented"}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Care Instructions</h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
                    <li>Trim wick to 1/4" before each lighting</li>
                    <li>Allow wax to melt fully to edges on first burn</li>
                    <li>Burn for no more than 4 hours at a time</li>
                    <li>Keep away from drafts and flammable materials</li>
                    <li>Discontinue use when 1/2" of wax remains</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              {product.ratings && product.ratings.length > 0 ? (
                <div className="space-y-6">
                  {product.ratings.map((rating: any, index: number) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {rating.userId?.name?.charAt(0) || "A"}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {rating.userId?.name || "Anonymous"}
                            </p>
                            <div className="flex items-center mt-0.5">
                              {Array(5).fill(0).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < rating.rating 
                                      ? "fill-amber-400 text-amber-400" 
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(rating.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      {rating.review && (
                        <p className="mt-3 text-sm text-gray-600">
                          {rating.review}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 p-4 rounded-full inline-block">
                    <Star className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="mt-3 text-gray-600">No reviews yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Be the first to share your experience with this product
                  </p>
                  <Button className="mt-4 rounded-full bg-primary hover:bg-primary/90">
                    Write a Review
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h3>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}