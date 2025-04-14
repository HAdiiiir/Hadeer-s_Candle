"use client"

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Award, ShoppingBag, Star, Sparkles } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const bestSellers = [
  {
    _id: 'bs1',
    name: 'Vanilla Dream',
    price: 29.99,
    type: "Candle",
    images: ["/vanilla-candle.jpg"],
    fragrance: "Sweet",
    burnTime: "50 hours",
    isBestSeller: true,
    rating: 4.9,
    ratings: [{}, {}, {}, {}] // 4 reviews
  },
  {
    _id: 'bs2',
    name: 'Lavender Serenity',
    price: 32.99,
    type: "Candle",
    images: ["/lavender-candle.jpg"],
    fragrance: "Floral",
    burnTime: "45 hours",
    isBestSeller: true,
    rating: 4.8,
    ratings: [{}, {}, {}] // 3 reviews
  },
  {
    _id: 'bs3',
    name: 'Sandalwood Mystique',
    price: 34.99,
    type: "Candle",
    images: ["/sandalwood-candle.jpg"],
    fragrance: "Woody",
    burnTime: "55 hours",
    isBestSeller: true,
    rating: 4.7,
    ratings: [{}, {}] // 2 reviews
  },
  {
    _id: 'bs4',
    name: 'Citrus Burst',
    price: 27.99,
    type: "Candle",
    images: ["/citrus-candle.jpg"],
    fragrance: "Fresh",
    burnTime: "40 hours",
    isBestSeller: true,
    rating: 4.6,
    ratings: [{}] // 1 review
  }
]

export default function BestSellersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // In production, replace with actual API call
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load products')
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
          {[...Array(4)].map((_, i) => (
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
                  "The Vanilla Dream candle fills my entire home with the most luxurious scent. It's become my signature fragrance!"
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
                  "I've tried many candles, but Lavender Serenity is truly special. The burn time is incredible and the scent is so authentic."
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
                  "Sandalwood Mystique is my go-to gift for friends and family. Everyone always asks where I got it from!"
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
              Join thousands of satisfied customers who have made these candles part of their daily rituals.
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