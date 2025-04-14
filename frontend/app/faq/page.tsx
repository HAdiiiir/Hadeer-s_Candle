// app/faq/page.tsx - Enhanced FAQ (No Framer Motion)
'use client'

import { ChevronDown, MessageCircle, Sparkles, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const faqs = [
    {
      question: "How long do your candles typically burn?",
      answer: "Our standard candles burn for approximately 40-50 hours depending on size and burning conditions. Proper care (trimming wicks to 1/4 inch before each use and avoiding drafts) can extend burn time by up to 20%.",
      category: "Product Care"
    },
    {
      question: "Are your candles vegan and cruelty-free?",
      answer: "Absolutely! All our candles are 100% vegan, cruelty-free, and made with sustainable plant-based waxes (soy and coconut blend) and premium cotton wicks. We never test on animals.",
      category: "Ethics"
    },
    {
      question: "Do you offer international shipping?",
      answer: "We currently ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You'll see available shipping options and rates at checkout.",
      category: "Shipping"
    },
    {
      question: "What's your return policy?",
      answer: "We offer hassle-free returns within 30 days of purchase for unused, unburned products in their original packaging. For quality and safety reasons, we cannot accept returns of used candles.",
      category: "Policies"
    },
    {
      question: "How should I store my candles?",
      answer: "For optimal preservation: \n• Store in a cool, dry place (18-22°C ideal) \n• Keep away from direct sunlight \n• Avoid temperature fluctuations \n• Keep lids on when not in use \n• Use within 12 months for best fragrance",
      category: "Product Care"
    },
    {
      question: "Why does my candle tunnel?",
      answer: "Tunneling occurs when the wax doesn't melt evenly. To prevent: \n• Always allow wax to melt to the edges on first burn (3-4 hours) \n• Keep wick trimmed to 1/4 inch \n• Avoid placing in drafty areas \n• Burn for appropriate durations (2-4 hours per session)",
      category: "Troubleshooting"
    }
  ]

  const categories = [...new Set(faqs.map(faq => faq.category))]
  const filteredFAQs = activeCategory 
    ? faqs.filter(faq => faq.category === activeCategory) 
    : faqs

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="container py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-3 animate-fade-in">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in delay-100">
            Everything you need to know about our candles and services
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-medium text-purple-700 mb-3">Filter by Category</h3>
              <Button 
                variant={activeCategory ? "ghost" : "secondary"}
                className="w-full justify-start"
                onClick={() => setActiveCategory(null)}
              >
                All Questions
              </Button>
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-lg border border-purple-100 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-purple-50 transition-colors"
                >
                  <div>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full mb-1 inline-block">
                      {faq.category}
                    </span>
                    <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-purple-500 transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-200 ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-5 pb-5 text-gray-600 whitespace-pre-line">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-purple-100 p-3 rounded-full mb-4">
              <MessageCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-purple-800 mb-3">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our candle experts are ready to help you with any questions about scents, care, or custom orders.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button asChild className="bg-purple-600 hover:bg-purple-700 gap-2">
                <Link href="/contact">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-purple-300 text-purple-700 hover:bg-purple-50 gap-2">
                <Link href="/products">
                  <Sparkles className="h-4 w-4" />
                  Browse Candles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  )
}