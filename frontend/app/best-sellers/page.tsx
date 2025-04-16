"use client"

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Award, ShoppingBag, Star } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const bestSellers = [
  {
    _id: "CP-GL-025",
    name: "Clear Gel Wax Candle",
    price: 650,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/0a/4d/83/0a4d834a962a31b3450a4e91a664632e.jpg"],
    isBestSeller: true,
    rating: 4.9,
    ratings: [{}, {}, {}, {}] // 4 reviews
  },
  {
    _id: "CP-GL-024",
    name: "Clear Gel Wax Candle",
    price: 650,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/d6/2f/50/d62f50a93f9229616e66ca024850814d.jpg"],
    isBestSeller: true,
    rating: 4.8,
    ratings: [{}, {}, {}] // 3 reviews
  },
  {
    _id: "CP-GL-023",
    name: "Clear Gel Wax Candle",
    price: 710,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/3a/78/c9/3a78c9197fd3048ad9000dbc65e80a43.jpg"],
    isBestSeller: true,
    rating: 4.7,
    ratings: [{}, {}] // 2 reviews
  },
  {
    _id: "SH-SK-011",
    name: "Skull Shaped Candle",
    price: 210,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Black Orchid",
    waxType: "Palm-Paraffin Blend",
    burnTime: "6-8 hours",
    description: "Edgy skull shaped candle with mysterious Black Orchid scent.",
    images: ["https://i.pinimg.com/474x/38/1a/85/381a85cc95680915a1ecba9e349b67fd.jpg"],
    isBestSeller: true,
    rating: 4.6,
    ratings: [{}] // 2 review
  },
  {
    _id: "SH-RS-014",
    name: "Rose Shaped Candle",
    price: 170,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Damask Rose",
    waxType: "Beeswax-Soy Blend",
    burnTime: "2-3 hours",
    description: "Exquisite rose-shaped candle with authentic Damask Rose perfume.",
    images: ["https://i.pinimg.com/474x/98/01/44/98014458c7336f44ec850b5bba22beea.jpg"],
    isBestSeller: true,
    rating: 4.5,
    ratings: [{}] // 4 review
  },
  {
    _id: "SH-SH-013",
    name: "Shell Shaped Candle",
    price: 50,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Sea Salt",
    waxType: "Palm Wax",
    burnTime: "1-2 hours",
    description: "Realistic seashell shaped candle with oceanic Sea Salt aroma.",
    images: ["https://i.pinimg.com/736x/29/e3/84/29e38499eef6d5054d60091a46bc7b99.jpg"],
    isBestSeller: true,
    rating: 4.4,
    ratings: [{}] // 3 review
  },
    // ... rest of your products

]

export default function BestSellersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // Fixed type here

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load products') // Now this will work
        setIsLoading(false)
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (error) return (
    <div className="container py-12 text-center text-red-500">
      <p>{error}</p>
      <Button className="mt-4" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )

  // ... rest of your component remains the same

  return (
    <div className="container py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-50 to-purple-50 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100/20 to-transparent opacity-40"></div>
        <div className="relative z-10">
          <Button asChild variant="ghost" className="mb-6 group">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
                Our Best Sellers
                <Award className="inline-block ml-2 h-6 w-6 text-amber-600 fill-amber-200" />
              </h1>
              <p className="text-gray-600">
                Customer favorites that never disappoint
              </p>
            </div>
            
            <Button asChild variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : bestSellers.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-amber-100 p-4 rounded-full inline-block mb-4">
            <Award className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Best Sellers Available</h2>
          <p className="text-gray-600 mb-6">Our top products will appear here soon</p>
          <Button asChild>
            <Link href="/products">Explore Products</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Testimonials Section */}
          <div className="mt-16 bg-purple-50 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">
              Why Customers Love These
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The Clear Gel candles are absolutely stunning! The ocean breeze scent is so refreshing and they look beautiful in my bathroom."
                </p>
                <p className="text-sm font-medium text-purple-800">- Sarah M.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I bought the Skull Shaped candle as a gift for my goth friend and she loved it! The black orchid scent is mysterious and perfect."
                </p>
                <p className="text-sm font-medium text-purple-800">- James T.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The Rose Shaped candles are my go-to gifts for romantic occasions. They look so real and the Damask Rose fragrance is heavenly!"
                </p>
                <p className="text-sm font-medium text-purple-800">- Amina K.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">
              Ready to Experience Our Best?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who love our premium candles.
            </p>
            <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg">
              <Link href="/products" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Shop the Collection
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}