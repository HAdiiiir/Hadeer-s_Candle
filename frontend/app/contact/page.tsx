// app/contact/page.tsx - Contact Us
import { Mail, Phone, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Contact() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions or feedback? We'd love to hear from you! Reach out through any of the channels below.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">hello@candlecraft.com</p>
                <p className="text-sm text-gray-500 mt-1">Typically responds within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Phone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Visit Us</h3>
                <p className="text-gray-600">123 Candle Lane</p>
                <p className="text-gray-600">Brooklyn, NY 11201</p>
                <p className="text-sm text-gray-500 mt-1">By appointment only</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-8 rounded-lg border border-purple-100">
          <h2 className="text-xl font-semibold text-purple-700 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}