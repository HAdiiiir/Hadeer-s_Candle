// app/about/page.tsx - Premium Our Story
import { Heart, Leaf, Sparkles, Award, Hand, LeafyGreen } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function OurStory() {
  return (
    <div className="bg-purple-50/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/texture.png')] bg-cover mix-blend-overlay"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Crafting Moments of Comfort
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Our journey from a small kitchen to your favorite candle brand
            </p>
            <Button asChild variant="secondary" className="rounded-full">
              <Link href="/products" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Shop Our Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Story Content */}
      <div className="container py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://i.pinimg.com/736x/d4/9d/de/d49ddefe33f958ce3b77a2e5d24343f8.jpg"
                alt="Founder making candles"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Humble Beginnings</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">
                  In 2023, what began as a passionate experiment in a home kitchen has blossomed into Hadeer's Candle - 
                  a brand synonymous with luxury, quality, and unforgettable fragrances. Each candle carries the dedication 
                  of our early days when we tested hundreds of wax blends to perfect our signature formula.
                </p>
                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                  <blockquote className="text-purple-700 italic">
                    "We don't just make candles - we craft experiences that transform your space into a sanctuary."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-purple-800 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide every decision we make and every candle we create
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Hand className="h-8 w-8 text-purple-600" />,
                  title: "Artisan Craftsmanship",
                  description: "Each candle is hand-poured in small batches by our skilled artisans",
                },
                {
                  icon: <LeafyGreen className="h-8 w-8 text-purple-600" />,
                  title: "Eco-Conscious",
                  description: "Sustainable materials and cruelty-free fragrances",
                },
                {
                  icon: <Award className="h-8 w-8 text-purple-600" />,
                  title: "Uncompromising Quality",
                  description: "Premium ingredients that meet rigorous standards",
                },
              ].map((value, index) => (
                <div key={index} className="bg-purple-50/50 p-6 rounded-xl hover:shadow-md transition-all">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">Our Meticulous Process</h2>
            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-0.5 bg-purple-100 md:left-1/2 md:-ml-1"></div>
              
              {[
                {
                  title: "Sourcing",
                  description: "We ethically source the finest natural waxes and essential oils",
                  icon: <Leaf className="h-5 w-5 text-purple-600" />,
                },
                {
                  title: "Blending",
                  description: "Our perfumers create unique fragrance combinations",
                  icon: <Sparkles className="h-5 w-5 text-purple-600" />,
                },
                {
                  title: "Crafting",
                  description: "Each candle is hand-poured and quality checked",
                  icon: <Hand className="h-5 w-5 text-purple-600" />,
                },
                {
                  title: "Aging",
                  description: "We allow proper curing time for optimal scent throw",
                  icon: <Heart className="h-5 w-5 text-purple-600" />,
                },
              ].map((step, index) => (
                <div key={index} className="relative mb-8 md:flex md:items-center md:odd:flex-row-reverse">
                  <div className={`md:w-1/2 p-4 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-50">
                      <h3 className="text-xl font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <span className="bg-purple-100 p-2 rounded-full">
                          {step.icon}
                        </span>
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience the Difference</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of customers who have transformed their homes with our candles
            </p>
            <Button asChild variant="secondary" size="lg" className="rounded-full">
              <Link href="/products" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Discover Our Collection
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}