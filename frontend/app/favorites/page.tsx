"use client"

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Heart, Sparkles, ShoppingBag } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

// Skeleton component
const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-100 animate-pulse rounded-md ${className}`} />
)

// Custom hook for favorites using localStorage
const useLocalFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])

  // Initialize favorites from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem('guestFavorites')
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : [])
    }
  }, [])

  const addFavorite = (productId: string) => {
    const updatedFavorites = [...favorites, productId]
    setFavorites(updatedFavorites)
    localStorage.setItem('guestFavorites', JSON.stringify(updatedFavorites))
  }

  const removeFavorite = (productId: string) => {
    const updatedFavorites = favorites.filter(id => id !== productId)
    setFavorites(updatedFavorites)
    localStorage.setItem('guestFavorites', JSON.stringify(updatedFavorites))
  }

  return { favorites, addFavorite, removeFavorite }
}

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useLocalFavorites()
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedProducts, setRecommendedProducts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setRecommendedProducts([
        { 
          _id: 'rec1', 
          name: 'Lavender Dream', 
          price: 24.99, 
          type: "Candle", 
          images: ["/lavender-candle.jpg"], 
          isNew: true,
          fragrance: "Floral",
          burnTime: "45 hours"
        },
        { 
          _id: 'rec2', 
          name: 'Vanilla Bliss', 
          price: 22.99, 
          type: "Candle", 
          images: ["/vanilla-candle.jpg"], 
          isBestSeller: true,
          fragrance: "Sweet",
          burnTime: "50 hours"
        }
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const favoriteProducts = favorites.map(id => ({
    _id: id,
    name: `Product ${id}`,
    price: 99.99,
    type: "Candle",
    images: ["/placeholder.svg"],
    fragrance: ["Floral", "Woody", "Fresh"][Math.floor(Math.random() * 3)],
    burnTime: `${Math.floor(Math.random() * 20) + 30} hours`
  }))

  const handleRemoveAll = () => {
    favorites.forEach(id => removeFavorite(id))
    toast({
      title: "Cleared favorites",
      description: "All items have been removed from your favorites",
      className: "border-purple-200 bg-purple-50 text-purple-800",
    })
  }

  return (
    <div className="container py-8 md:py-12">
      {/* Header Section */}
      <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-100/20 to-transparent opacity-40"></div>
        <div className="relative z-10">
          <Button asChild variant="ghost" className="mb-6 group">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
                Your Favorite Items
                <Sparkles className="inline-block ml-2 h-6 w-6 text-purple-600 fill-purple-300" />
              </h1>
              <p className="text-gray-600">
                {favorites.length} {favorites.length === 1 ? 'precious item' : 'treasured items'} saved
              </p>
            </div>
            
            {favorites.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleRemoveAll}
                className="text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
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
      ) : favorites.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-purple-200 rounded-full blur-md opacity-30"></div>
            <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-full inline-block">
              <Heart className="h-12 w-12 text-purple-600 fill-purple-200" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your Favorites Collection Awaits</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Discover products that speak to you and save them here for easy access. Your perfect candle match is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200 transition-all">
              <Link href="/products" className="flex items-center">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Explore Our Collection
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Link href="/products?category=BestSellers">View Best Sellers</Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Recommendations Section */}
          {recommendedProducts.length > 0 && (
            <div className="mt-16 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-3">New</span>
                You Might Also Love
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendedProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}