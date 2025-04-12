// app/sustainability/page.tsx - Sustainability
import { Package, Globe, Truck, Recycle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Sustainability() {
  const initiatives = [
    {
      title: "Eco-Friendly Packaging",
      description: "All our packaging is 100% recyclable and made from post-consumer materials",
      icon: <Package className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Responsible Sourcing",
      description: "Ingredients are ethically sourced from suppliers who share our sustainability values",
      icon: <Globe className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Carbon Neutral Shipping",
      description: "We offset all shipping emissions through verified carbon credit programs",
      icon: <Truck className="h-6 w-6 text-purple-600" />
    },
    {
      title: "Zero Waste Production",
      description: "Production scraps are repurposed or recycled whenever possible",
      icon: <Recycle className="h-6 w-6 text-purple-600" />
    }
  ]

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Our Sustainability Commitment</h1>
        <p className="text-lg text-gray-700 mb-8">
          At our core, we believe luxury shouldn't come at the expense of our planet. That's why we've built sustainability
          into every aspect of our business, from sourcing to shipping.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {initiatives.map((initiative, index) => (
            <div key={index} className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {initiative.icon}
              </div>
              <h3 className="text-xl font-semibold text-purple-700 mb-2">{initiative.title}</h3>
              <p className="text-gray-600">{initiative.description}</p>
            </div>
          ))}
        </div>
        
        <div className="prose prose-purple">
          <h2 className="text-2xl font-bold text-purple-800">Our Materials</h2>
          <p>
            We carefully select each component of our candles to ensure they meet our high standards for both quality
            and environmental impact:
          </p>
          <ul>
            <li><strong>Plant-based waxes:</strong> Soy, coconut, and beeswax blends for clean burning</li>
            <li><strong>Cotton wicks:</strong> Lead-free and sustainably sourced</li>
            <li><strong>Essential oil blends:</strong> Phthalate-free fragrances derived from natural sources</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-purple-800 mt-8">Future Goals</h2>
          <p>
            We're continuously working to reduce our environmental footprint. Our 2025 goals include:
          </p>
          <ul>
            <li>Achieving 100% renewable energy in our production facilities</li>
            <li>Implementing a candle jar return and refill program</li>
            <li>Partnering with reforestation initiatives to offset our carbon footprint</li>
          </ul>
        </div>
      </div>
    </div>
  )
}