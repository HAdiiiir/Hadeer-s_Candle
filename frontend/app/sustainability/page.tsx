'use client'

import { Package, Globe, Truck, Recycle, Leaf, Trees, Droplet } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Sustainability() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const initiatives = [
    {
      title: "Eco-Friendly Packaging",
      description: "All our packaging is 100% recyclable and made from post-consumer materials. We've eliminated single-use plastics entirely from our supply chain.",
      icon: <Package className="h-8 w-8 text-green-600" />,
      stats: "100% plastic-free"
    },
    {
      title: "Responsible Sourcing",
      description: "Ingredients are ethically sourced from suppliers who share our sustainability values. We conduct regular audits to ensure fair labor practices.",
      icon: <Globe className="h-8 w-8 text-green-600" />,
      stats: "92% local suppliers"
    },
    {
      title: "Carbon Neutral Shipping",
      description: "We offset all shipping emissions through verified carbon credit programs. Our delivery fleet is transitioning to electric vehicles.",
      icon: <Truck className="h-8 w-8 text-green-600" />,
      stats: "100% offset"
    },
    {
      title: "Zero Waste Production",
      description: "Production scraps are repurposed or recycled whenever possible. Our facilities achieve 98% waste diversion from landfills.",
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      stats: "98% diverted"
    }
  ]

  const goals = [
    {
      title: "Renewable Energy",
      description: "Transition production facilities to 100% renewable energy",
      icon: <Leaf className="h-6 w-6 text-purple-600" />,
      progress: 65
    },
    {
      title: "Refill Program",
      description: "Implement candle jar return and refill system",
      icon: <Trees className="h-6 w-6 text-purple-600" />,
      progress: 30
    },
    {
      title: "Water Conservation",
      description: "Reduce water usage in production by 50%",
      icon: <Droplet className="h-6 w-6 text-purple-600" />,
      progress: 45
    }
  ]

  return (
    <div className="container py-12 px-4 sm:px-6">
      <div className={`max-w-5xl mx-auto transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Our Sustainability Commitment</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Crafting luxurious candles while nurturing our planet - because beauty shouldn't cost the earth.
          </p>
        </div>
        
        {/* Impact Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-purple-800 mb-8 text-center">Our Current Impact</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {initiatives.map((initiative, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="bg-green-50 w-14 h-14 rounded-full flex items-center justify-center mb-5">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{initiative.title}</h3>
                <p className="text-gray-600 mb-3">{initiative.description}</p>
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {initiative.stats}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Materials Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">Conscious Materials</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-6">
                  Every component is selected for minimal environmental impact without compromising quality:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Leaf className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Plant-based waxes</h4>
                      <p className="text-gray-600">Soy, coconut, and beeswax blends for clean burning</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Recycle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Cotton wicks</h4>
                      <p className="text-gray-600">Lead-free and sustainably sourced</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Package className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Essential oils</h4>
                      <p className="text-gray-600">Phthalate-free fragrances from natural sources</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Environmental Savings (Per Candle)</h3>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Carbon Reduced</span>
                      <span className="text-sm text-gray-500">120g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Water Saved</span>
                      <span className="text-sm text-gray-500">0.5L</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Waste Diverted</span>
                      <span className="text-sm text-gray-500">85g</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-purple-800 mb-8 text-center">Our 2025 Sustainability Goals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-4">
                    {goal.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{goal.description}</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 flex-1 mr-3">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-purple-600">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Sustainability Journey</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Discover how you can make a difference by choosing eco-conscious luxury for your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="secondary" className="text-purple-900 border-purple-100 hover:bg-white/10">
              <Link href="/products">Shop Sustainable Candles</Link>
            </Button>
            <Button asChild variant="outline" className="text-purple-900 border-purple-100 hover:bg-white/10">
              <Link href="/about">Learn About Our Mission</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}