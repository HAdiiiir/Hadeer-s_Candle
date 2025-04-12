// app/faq/page.tsx - FAQ
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQ() {
  const faqs = [
    {
      question: "How long do your candles typically burn?",
      answer: "Our standard candles burn for approximately 40-50 hours depending on size and burning conditions. Proper care (trimming wicks, avoiding drafts) can extend burn time."
    },
    {
      question: "Are your candles vegan and cruelty-free?",
      answer: "Yes! All our candles are 100% vegan, cruelty-free, and made with plant-based waxes and cotton wicks."
    },
    {
      question: "Do you offer international shipping?",
      answer: "We currently ship to select international destinations. Please check our shipping page for the most up-to-date list of countries we serve."
    },
    {
      question: "What's your return policy?",
      answer: "We offer returns within 30 days of purchase for unused products. Due to the nature of our products, we cannot accept returns of used candles."
    },
    {
      question: "How should I store my candles?",
      answer: "Store in a cool, dry place away from direct sunlight to preserve fragrance and color. Avoid extreme temperature changes."
    }
  ]

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about our products and policies</p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-purple-100 pb-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-medium text-gray-900 group-open:text-purple-600">{faq.question}</h3>
                  <ChevronDown className="h-5 w-5 text-purple-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-purple-50 p-6 rounded-lg border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">Still have questions?</h2>
          <p className="text-gray-600 mb-4">We're here to help! Contact our customer support team for assistance.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}