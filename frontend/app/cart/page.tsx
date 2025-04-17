"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

export default function CartPage() {
  // This is now a Client Component that can use hooks
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  const isEmpty = cartItems.length === 0
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const shipping = subtotal > 1000 ? 0 : 50 // Free shipping for orders over 1000 EGP
  const total = subtotal + shipping

  const handleProceedToPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method")
      return
    }
    setShowPaymentDetails(true)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-purple-800">Shopping Cart</h1>
        <Separator />
        
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <ShoppingBag className="h-12 w-12 text-purple-400" />
            <div className="space-y-2 text-center">
              <h2 className="text-xl font-semibold text-purple-600">Your cart is empty</h2>
              <p className="text-gray-500">Add some products to continue shopping</p>
            </div>
            <Button asChild>
              <Link href="/products" className="text-purple-600 hover:text-purple-500">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-start space-x-4 rounded-lg border p-4 hover:bg-gray-50 transition-all">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-purple-800">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.size} - {item.type} - {item.fragrance}
                          </p>
                        </div>
                        <p className="text-lg font-medium text-purple-800">EGP {item.price}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity || 1}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary and Payment */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-purple-800">Order Summary</h2>
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">EGP {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `EGP ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold text-purple-800">EGP {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                {!showPaymentDetails ? (
                  <div className="mt-6 space-y-4">
                    <h3 className="font-medium text-gray-900">Select Payment Method</h3>
                    
                    <div className="space-y-2">
                      <div 
                        className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${paymentMethod === "visa" ? "border-purple-500 bg-purple-50" : ""}`}
                        onClick={() => setPaymentMethod("visa")}
                      >
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                        <div className="h-4 w-4 rounded-full border border-purple-500 flex items-center justify-center">
                          {paymentMethod === "visa" && <div className="h-2 w-2 rounded-full bg-purple-500"></div>}
                        </div>
                      </div>

                      <div 
                        className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer ${paymentMethod === "vodafone" ? "border-purple-500 bg-purple-50" : ""}`}
                        onClick={() => setPaymentMethod("vodafone")}
                      >
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Vodafone Cash</span>
                        </div>
                        <div className="h-4 w-4 rounded-full border border-purple-500 flex items-center justify-center">
                          {paymentMethod === "vodafone" && <div className="h-2 w-2 rounded-full bg-purple-500"></div>}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4" onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-6">
                    {paymentMethod === "visa" ? (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Card Payment Details</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                            <input 
                              type="text" 
                              placeholder="1234 5678 9012 3456" 
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                              <input 
                                type="text" 
                                placeholder="MM/YY" 
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                              <input 
                                type="text" 
                                placeholder="123" 
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                            <input 
                              type="text" 
                              placeholder="Name as it appears on your card" 
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          Confirm Payment
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="font-medium text-gray-900">Vodafone Cash Payment</h3>
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">
                            To pay <span className="font-semibold">EGP {total.toFixed(2)}</span> via Vodafone Cash:
                          </p>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                            <li>Open Vodafone Cash app on your phone</li>
                            <li>Select "Send Money"</li>
                            <li>Enter wallet number: <span className="font-mono bg-gray-100 px-2 py-1 rounded">01001234567</span></li>
                            <li>Enter amount: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{total.toFixed(2)}</span></li>
                            <li>Enter your PIN</li>
                            <li>Save the transaction number</li>
                          </ol>
                          <div className="mt-4">
                            <p className="text-sm text-gray-600">
                              After payment, your order will be confirmed within 24 hours.
                            </p>
                          </div>
                        </div>
                        <Button className="w-full mt-4">
                          I've Made the Payment
                        </Button>
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowPaymentDetails(false)}
                    >
                      Back to Payment Methods
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}