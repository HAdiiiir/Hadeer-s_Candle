// app/gift-sets/page.tsx
import { Gift, Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GiftSets() {
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
      image: "/gift-set-1.jpg"
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
      image: "/gift-set-2.jpg"
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
      image: "/gift-set-3.jpg"
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
      image: "/gift-set-4.jpg"
    }
  ]

  const specialOffers = [
    {
      title: "Free Shipping",
      description: "On all orders over $50",
      icon: <Truck className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Bundle Discount",
      description: "Save 15% when you buy 2+ gift sets",
      icon: <Tag className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Gift Wrapping",
      description: "Free elegant gift wrapping",
      icon: <Gift className="h-6 w-6 text-purple-600" />
    }
  ]

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-purple-100 px-4 py-2 rounded-full mb-4">
          <Gift className="h-5 w-5 text-purple-600 mr-2" />
          <span className="font-medium text-purple-700">Perfect Presents</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Thoughtful Gift Sets</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Beautifully curated collections at perfect price points. Our gift sets make choosing presents effortless.
        </p>
      </div>

      {/* Special Offers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {specialOffers.map((offer, index) => (
          <div key={index} className="bg-purple-50 p-6 rounded-lg border border-purple-100 flex items-start">
            <div className="bg-purple-100 p-2 rounded-full mr-4">
              {offer.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gift Sets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {giftSets.map((set) => (
          <div key={set.id} className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 z-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
            >
              <Heart className="h-4 w-4 fill-purple-100 text-purple-600 group-hover:fill-purple-200 transition-colors" />
            </Button>

            {/* Sale Badge */}
            {set.originalPrice && (
              <div className="absolute left-3 top-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                SAVE {Math.round(100 - (set.price / set.originalPrice * 100))}%
              </div>
            )}

            {/* Product Image */}
            <div className="aspect-square bg-gray-100">
              <img
                src={set.image}
                alt={set.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h2 className="font-bold text-lg text-gray-900 mb-1">{set.name}</h2>
              <p className="text-gray-600 text-sm mb-3">{set.description}</p>
              
              <div className="mb-4">
                <p className="text-lg font-bold text-purple-600">${set.price.toFixed(2)}</p>
                {set.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">${set.originalPrice.toFixed(2)}</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase">Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {set.contents.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mr-2"></span>
                      {item}
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
      <div className="bg-purple-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Need Help Choosing?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our gift experts can help you select the perfect set for any occasion.
        </p>
        <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
          Contact Our Gifting Team
        </Button>
      </div>
    </div>
  )
}