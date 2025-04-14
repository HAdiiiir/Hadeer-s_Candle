// app/contact/page.tsx - Contact Us
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function Contact() {
  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
        {/* Contact Information Section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-4">Get in Touch</h1>
            <p className="text-gray-600">
              Have questions about our handmade candles or want to discuss a custom order? 
              We're here to help and would love to hear from you!
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Instagram Contact */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full mr-4">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Instagram</h3>
                    <Link 
                      href="https://www.instagram.com/haders_candle?igsh=MXVyZzlvNnhmMWRidA==" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      @haders_candle
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Fastest response - DM us anytime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Phone Contact */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone/WhatsApp</h3>
                    <Link 
                      href="tel:+201030822692" 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      +2 01030822692
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">Available 10AM-8PM EET</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Online Presence */}
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Our Online Shop</h3>
                    <p className="text-gray-600">Available 24/7</p>
                    <p className="text-sm text-gray-500 mt-1">Browse our collections anytime</p>
                    <Button variant="outline" className="mt-2 border-purple-300 text-purple-700 hover:bg-purple-50">
                      <Link href="/shop">Visit Shop</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="space-y-6">
          <Card className="border-purple-100 shadow-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold text-purple-700">Send Us a Message</h2>
              <p className="text-sm text-gray-500">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                    className="focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    className="focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="+20 100 000 0000"
                    className="focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your candle needs..."
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Social Proof Section */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <h3 className="font-medium text-purple-800 mb-3">Why Our Customers Love Us</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700 italic">"The communication was excellent and the candles arrived perfectly packaged!"</p>
                <p className="text-sm text-purple-600 mt-1">- Fatma A.</p>
              </div>
              <div>
                <p className="text-gray-700 italic">"Quick responses on Instagram and helped me choose the perfect gift."</p>
                <p className="text-sm text-purple-600 mt-1">- Mohamed S.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}