"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Info, Award } from "lucide-react"
import { useParams, notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RelatedProducts } from "@/components/related-products"
import { productAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const fragranceDescriptions = {
  "Vanilla & Amber": {
    description: "A warm, sweet blend of vanilla bean and rich amber, creating a cozy and inviting atmosphere.",
    notes: ["Top: Madagascar Vanilla", "Middle: Tonka Bean", "Base: Golden Amber"],
    bestFor: "Living rooms, bedrooms, winter evenings",
  },
  "Lavender & Chamomile": {
    description: "A calming, floral blend that promotes relaxation and tranquility.",
    notes: ["Top: English Lavender", "Middle: Roman Chamomile", "Base: White Musk"],
    bestFor: "Bedrooms, bathrooms, meditation spaces",
  },
  "Citrus & Bergamot": {
    description: "A refreshing, uplifting blend of citrus fruits and bergamot for an energizing experience.",
    notes: ["Top: Sicilian Lemon", "Middle: Calabrian Bergamot", "Base: Green Tea"],
    bestFor: "Kitchens, home offices, morning routines",
  },
  "Cinnamon & Spice": {
    description: "A warm, spicy blend perfect for creating a cozy atmosphere during colder months.",
    notes: ["Top: Ceylon Cinnamon", "Middle: Clove Bud", "Base: Vanilla Bean"],
    bestFor: "Dining rooms, entryways, holiday gatherings",
  },
  "Rose & Musk": {
    description: "A romantic floral blend with notes of fresh rose and soft musk for an elegant ambiance.",
    notes: ["Top: Bulgarian Rose", "Middle: Peony", "Base: White Musk"],
    bestFor: "Bedrooms, dressing rooms, special occasions",
  },
  "Sandalwood & Cedar": {
    description: "A woody, earthy blend that creates a grounding and calming environment.",
    notes: ["Top: Australian Sandalwood", "Middle: Himalayan Cedar", "Base: Patchouli"],
    bestFor: "Studies, libraries, meditation spaces",
  },
  "Ocean Breeze": {
    description: "A fresh, clean scent reminiscent of sea air and coastal breezes.",
    notes: ["Top: Sea Salt", "Middle: Marine Accord", "Base: Driftwood"],
    bestFor: "Bathrooms, laundry rooms, coastal decor",
  },
  "Fresh Linen": {
    description: "A clean, crisp scent that evokes the feeling of freshly laundered linens.",
    notes: ["Top: Alpine Air", "Middle: Lily of the Valley", "Base: White Musk"],
    bestFor: "Any room, especially for creating a clean, welcoming space",
  },
  "Jasmine & Lily": {
    description: "A luxurious floral blend with exotic jasmine and fresh lily notes.",
    notes: ["Top: Jasmine Petals", "Middle: White Lily", "Base: Vanilla"],
    bestFor: "Bedrooms, living rooms, romantic settings",
  },
  "Green Tea": {
    description: "A refreshing, clean scent with notes of green tea and subtle citrus.",
    notes: ["Top: Bergamot", "Middle: Green Tea Leaves", "Base: White Musk"],
    bestFor: "Offices, kitchens, meditation spaces",
  },
  "Black Orchid": {
    description: "A mysterious, exotic blend with rich floral and spicy notes.",
    notes: ["Top: Black Truffle", "Middle: Black Orchid", "Base: Patchouli"],
    bestFor: "Evening gatherings, bedrooms, formal spaces",
  },
  "Coconut Milk": {
    description: "A creamy, tropical blend with sweet coconut and vanilla notes.",
    notes: ["Top: Coconut", "Middle: Vanilla", "Base: Sandalwood"],
    bestFor: "Living rooms, bedrooms, summer months",
  },
  "Vanilla Latte": {
    description: "A warm, comforting blend of rich coffee and sweet vanilla.",
    notes: ["Top: Coffee Bean", "Middle: Vanilla", "Base: Caramel"],
    bestFor: "Kitchens, dining areas, morning routines",
  },
  "Suede & Musk": {
    description: "A sophisticated, masculine blend with leather and musk notes.",
    notes: ["Top: Bergamot", "Middle: Suede", "Base: White Musk"],
    bestFor: "Offices, studies, evening gatherings",
  },
  "Blue Agave": {
    description: "A fresh, exotic blend with sweet agave and citrus notes.",
    notes: ["Top: Lime", "Middle: Blue Agave", "Base: Sea Salt"],
    bestFor: "Living rooms, patios, summer gatherings",
  },
  "Honey & Nectar": {
    description: "A sweet, golden blend with rich honey and floral nectar notes.",
    notes: ["Top: Orange Blossom", "Middle: Honey", "Base: Amber"],
    bestFor: "Dining rooms, living spaces, spring and summer",
  },
  "Amber & Oud": {
    description: "A luxurious, exotic blend with rich amber and precious oud wood.",
    notes: ["Top: Saffron", "Middle: Rose", "Base: Amber and Oud"],
    bestFor: "Evening gatherings, formal spaces, winter months",
  },
  "Lemon Zest": {
    description: "A bright, invigorating blend with fresh lemon and subtle herbal notes.",
    notes: ["Top: Sicilian Lemon", "Middle: Verbena", "Base: White Musk"],
    bestFor: "Kitchens, home offices, morning routines",
  },
  "Sea Salt": {
    description: "A fresh, oceanic blend with sea salt and coastal air notes.",
    notes: ["Top: Ozone", "Middle: Sea Salt", "Base: Driftwood"],
    bestFor: "Bathrooms, coastal homes, summer months",
  },
  "Damask Rose": {
    description: "A luxurious, romantic blend with rich rose and subtle spice notes.",
    notes: ["Top: Damask Rose", "Middle: Peony", "Base: Musk"],
    bestFor: "Bedrooms, living rooms, special occasions",
  }
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id ? params.id.toString() : ""

  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const enhanceProductData = (product: any) => {
    if (!product) return null

    const fragrance = product.fragrance || Object.keys(fragranceDescriptions)[0]
    const fragranceDetails = fragranceDescriptions[fragrance as keyof typeof fragranceDescriptions]
    const fallbackFragrance = Object.keys(fragranceDescriptions)[0]
    const fallbackDetails = fragranceDescriptions[fallbackFragrance as keyof typeof fragranceDescriptions]

    return {
      ...product,
      fragrance: fragrance,
      fragranceDescription: fragranceDetails?.description || fallbackDetails.description,
      fragranceNotes: fragranceDetails?.notes || fallbackDetails.notes,
      fragranceBestFor: fragranceDetails?.bestFor || fallbackDetails.bestFor,
      burnTime: product.burnTime || `${Math.round((product.weight || 65) / 2.5)}-${Math.round((product.weight || 65) / 2)} hours`,
      waxType: product.waxType ||
        (product.type.includes("Gel") ? "Premium Crystal Gel Wax" :
         product.type.includes("Soy") ? "100% Natural Soy Wax" :
         product.type.includes("Palm") ? "Sustainable Palm Wax" : "Specialty Wax Blend"),
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return

      setIsLoading(true)
      try {
        const response = await productAPI.getProduct(productId)
        setProduct(enhanceProductData(response.product))
        setRelatedProducts(response.relatedProducts.map((product: any) => enhanceProductData(product)))
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
  }, [productId, toast])

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
            <div className="aspect-square animate-pulse bg-purple-50 rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square animate-pulse bg-purple-50 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-9 w-3/4 animate-pulse bg-purple-50 rounded" />
            <div className="h-6 w-1/2 animate-pulse bg-purple-50 rounded" />
            <div className="h-8 w-1/4 animate-pulse bg-purple-50 rounded" />
            <div className="h-24 w-full animate-pulse bg-purple-50 rounded" />
            <div className="h-12 w-full animate-pulse bg-purple-50 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  const productImage = product.images?.[selectedImage] || `/placeholder.svg?height=800&width=800`

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <Image
              src={productImage}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square object-cover w-full"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {(product.images || []).slice(0, 4).map((image: string, index: number) => (
              <button
                key={index}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index ? "border-purple-600 ring-2 ring-purple-300" : "border-transparent hover:border-purple-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg?height=200&width=200"}
                  alt={`${product.name} ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="text-purple-700 bg-purple-100">
                {product.type}
              </Badge>
              {product.fragrance && (
                <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200">
                  {product.fragrance}
                </Badge>
              )}
              {product.isNew && <Badge className="bg-green-100 text-green-800">New Arrival</Badge>}
              {product.isBestSeller && (
                <Badge className="bg-amber-500 text-white hover:bg-amber-600 flex items-center">
                  <Award className="h-3 w-3 mr-1" />
                  Best Seller
                </Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3 flex items-center">
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.averageRating || 0) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({product.ratings?.length || 0} reviews)</span>
              {product.stock > 0 ? (
                <span className="ml-4 text-sm font-medium text-green-600">In Stock</span>
              ) : (
                <span className="ml-4 text-sm font-medium text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-3xl font-bold text-gray-900">EGP {product.price}</p>
            <p className="text-sm text-gray-500">Including VAT & shipping</p>
          </div>

          {product.fragrance && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
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
                      <span className="w-2 h-2 rounded-full bg-purple-600 mr-2"></span>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Size</p>
              <p className="text-sm font-medium text-gray-900">{product.size || "65g"}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Burn Time</p>
              <p className="text-sm font-medium text-gray-900">{product.burnTime}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Wax Type</p>
              <p className="text-sm font-medium text-gray-900">{product.waxType}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-500">Wick</p>
              <p className="text-sm font-medium text-gray-900">Premium Cotton Wick</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-900">Quantity</p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-full border-purple-300 text-purple-600 hover:bg-purple-100"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (product.stock || 10)}
                className="h-10 w-10 rounded-full border-purple-300 text-purple-600 hover:bg-purple-100"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-500 ml-auto">{product.stock} available</span>
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="flex-1 h-12 rounded-full bg-purple-600 hover:bg-purple-700 shadow-md"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-purple-300 text-purple-600 hover:bg-purple-100"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-purple-300 text-purple-600 hover:bg-purple-100"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 bg-purple-50 rounded-lg p-1 h-auto">
              <TabsTrigger
                value="description"
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="py-2 text-sm font-medium rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-4">
              <div className="prose prose-sm text-gray-600">
                {product.description || (
                  <>
                    <p>
                      Our handcrafted {product.type.toLowerCase()} candle is meticulously created using premium{" "}
                      {product.waxType.toLowerCase()} for a clean, even burn. Each candle is poured by hand in small
                      batches to ensure quality and consistency.
                    </p>
                    <p>
                      The {product.fragrance} fragrance provides a delightful aroma that fills your space with{" "}
                      {product.fragranceDescription?.toLowerCase() || "a beautiful scent"}. Perfect for{" "}
                      {product.fragranceBestFor?.toLowerCase() || "creating a warm atmosphere"}.
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
              {product.ratings?.length ? (
                <div className="space-y-6">
                  {product.ratings.map((rating: any, index: number) => (
                    <div key={index} className="border-b border-purple-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-purple-100 rounded-full h-10 w-10 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600">
                              {rating.userId?.name?.charAt(0) || "A"}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{rating.userId?.name || "Anonymous"}</p>
                            <div className="flex items-center mt-0.5">
                              {Array(5).fill(0).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < rating.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(rating.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      {rating.review && <p className="mt-3 text-sm text-gray-600">{rating.review}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-purple-100 p-4 rounded-full inline-block">
                    <Star className="h-6 w-6 text-purple-400" />
                  </div>
                  <p className="mt-3 text-gray-600">No reviews yet</p>
                  <p className="text-sm text-gray-500 mt-1">Be the first to share your experience with this product</p>
                  <Button className="mt-4 rounded-full bg-purple-600 hover:bg-purple-700">Write a Review</Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h3>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  )
}