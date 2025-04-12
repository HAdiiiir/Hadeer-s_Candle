import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { ArrowRight, BadgePercent } from "lucide-react"

export function CartSummary() {
  // Sample cart data
  const subtotal = 950
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-6 shadow-sm backdrop-blur-sm">
      <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
        <BadgePercent className="h-5 w-5 text-purple-600" />
        Order Summary
      </h3>
      
      <Separator className="my-4 bg-purple-200" />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-purple-700">Subtotal</p>
          <p className="font-medium text-purple-900">EGP {subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-purple-700">Shipping</p>
          <p className="font-medium text-purple-900">EGP {shipping.toFixed(2)}</p>
        </div>
        
        <Separator className="bg-purple-200" />
        
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-purple-800">Total</p>
          <p className="text-lg font-bold text-purple-900">EGP {total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Discount code" 
            className="flex-1 border-purple-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200" 
          />
          <Button 
            variant="outline" 
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors"
          >
            Apply
          </Button>
        </div>
        
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <p className="text-center text-xs text-purple-600">
          Taxes and shipping calculated at checkout
        </p>
      </div>

      {/* Payment methods */}
      <div className="mt-6 flex justify-center gap-4">
        <div className="h-8 w-12 rounded border bg-white p-1 flex items-center justify-center">
          {/* Visa logo placeholder */}
          <span className="text-xs font-bold text-blue-800">VISA</span>
        </div>
        <div className="h-8 w-12 rounded border bg-white p-1 flex items-center justify-center">
          {/* Mastercard logo placeholder */}
          <span className="text-xs font-bold text-orange-500">MC</span>
        </div>
        <div className="h-8 w-12 rounded border bg-white p-1 flex items-center justify-center">
          {/* PayPal logo placeholder */}
          <span className="text-xs font-bold text-blue-500">PP</span>
        </div>
      </div>
    </div>
  )
}