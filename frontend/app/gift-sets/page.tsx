// app/gift-sets/page.tsx - Enhanced Gift Sets
'use client'

import { Gift, Star, ShoppingCart, Heart, Truck, Tag, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function GiftSets() {
  const [favorites, setFavorites] = useState<number[]>([])

  const giftSets = [
    {
      id: 1,
      name: "Luxury Candle Trio",
      price: 600,
      originalPrice: 1000,
      description: "Three premium candles in elegant seasonal scents",
      contents: [
        "Vanilla & Amber (8oz)",
        "Sandalwood & Cedar (8oz)",
        "Jasmine & Lily (8oz)"
      ],
      image: "/gift-set-1.jpg",
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: 2,
      name: "Self-Care Bundle",
      price: 550,
      originalPrice: 850,
      description: "Everything you need for a relaxing evening",
      contents: [
        "Lavender Candle (6oz)",
        "Soy Wax Melts (4pc)",
        "Bamboo Wick Trimmer"
      ],
      image: "/gift-set-2.jpg",
      rating: 4.9,
      reviewCount: 87
    },
    {
      id: 3,
      name: "Holiday Collection",
      price: 439,
      originalPrice: 600,
      description: "Festive scents for the holiday season",
      contents: [
        "Spiced Apple (6oz)",
        "Peppermint Cocoa (6oz)",
        "Frosted Pine (6oz)"
      ],
      image: "/gift-set-3.jpg",
      rating: 4.7,
      reviewCount: 56,
      isNew: true
    },
    {
      id: 4,
      name: "New Home Gift Set",
      price: 700,
      originalPrice: 950,
      description: "Perfect housewarming present",
      contents: [
        "Fresh Linen Candle (8oz)",
        "Mini Room Spray",
        "Decorative Matchbox Set"
      ],
      image: "/gift-set-4.jpg",
      rating: 4.6,
      reviewCount: 42,
      bestSeller: true
    }
  ]

  const specialOffers = [
    {
      title: "Free Shipping",
      description: "On all orders over $50",
      icon: <Truck className="h-5 w-5 text-purple-600" />
    },
    {
      title: "Bundle Discount",
      description: "Save 15% when you buy 2+ gift sets",
      icon: <Tag className="h-5 w-5 text-purple-600" />
    },
    {
      title: "Gift Wrapping",
      description: "Free elegant gift wrapping",
      icon: <Gift className="h-5 w-5 text-purple-600" />
    }
  ]

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className="container py-12 px-4 sm:px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-100">
          <Gift className="h-4 w-4 mr-2" />
          Perfect Presents
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thoughtful Gift Sets</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Beautifully curated collections at perfect price points. Our gift sets make choosing presents effortless.
        </p>
      </div>

      {/* Special Offers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {specialOffers.map((offer, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-start">
            <div className="bg-purple-100 p-3 rounded-full mr-4 flex-shrink-0">
              {offer.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gift Sets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {giftSets.map((set) => (
          <div key={set.id} className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
            {/* Badges */}
            <div className="absolute left-3 top-3 space-y-2 z-10">
              {set.originalPrice && (
                <Badge variant="destructive" className="shadow-sm">
                  SAVE {Math.round(100 - (set.price / set.originalPrice * 100))}%
                </Badge>
              )}
              {set.isNew && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 shadow-sm">
                  NEW
                </Badge>
              )}
              {set.bestSeller && (
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 shadow-sm">
                  BESTSELLER
                </Badge>
              )}
            </div>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
              onClick={() => toggleFavorite(set.id)}
            >
              <Heart 
                className={`h-4 w-4 ${favorites.includes(set.id) ? 'fill-red-500 text-red-600' : 'fill-white text-gray-400'}`} 
              />
            </Button>

            {/* Product Image */}
            <div className="aspect-square bg-gray-100 relative">
              <Image
                src={set.image}
                alt={set.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            {/* Product Details */}
            <div className="p-5">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{set.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({set.reviewCount})</span>
              </div>

              <h2 className="font-bold text-lg text-gray-900 mb-2">{set.name}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{set.description}</p>
              
              <div className="mb-4">
                <p className="text-lg font-bold text-purple-600">${set.price.toFixed(2)}</p>
                {set.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">${set.originalPrice.toFixed(2)}</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1.5">
                  {set.contents.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional CTA */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-10 text-center border border-purple-100">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center bg-purple-100 p-3 rounded-full mb-4">
            <MessageCircle className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-6">
            Our gift experts can help you select the perfect set for any occasion.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link href="/contact">
                Contact Our Gifting Team
              </Link>
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
              View Gift Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}