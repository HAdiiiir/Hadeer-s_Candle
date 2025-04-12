// app/about/page.tsx - Our Story
import { Heart, Leaf, Sparkles } from 'lucide-react'

export default function OurStory() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-6">Our Story</h1>
        <div className="prose prose-purple">
          <p className="text-lg text-gray-700 mb-4">
            Founded in 2020, our candle company began as a small passion project in a home kitchen. What started as a 
            creative outlet quickly grew into a beloved brand known for its exquisite fragrances and commitment to quality.
          </p>
          <div className="bg-purple-50 p-6 rounded-lg my-6 border border-purple-100">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">Why We Do It</h2>
            <p className="text-gray-600">
              We believe in the power of scent to transform spaces and elevate moods. Each candle is hand-poured with care 
              using only the finest ingredients to create moments of tranquility in your daily life.
            </p>
          </div>
          <h2 className="text-2xl font-bold text-purple-800 mt-8 mb-4">Our Values</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Heart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Handcrafted Quality</h3>
                <p className="text-gray-600">Each product is carefully made in small batches</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Leaf className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Sustainable Practices</h3>
                <p className="text-gray-600">Eco-friendly materials and responsible sourcing</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Signature Scents</h3>
                <p className="text-gray-600">Unique fragrance blends you won't find elsewhere</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}