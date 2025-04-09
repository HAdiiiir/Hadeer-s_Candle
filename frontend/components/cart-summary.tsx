import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export function CartSummary() {
  // Sample cart data
  const subtotal = 950
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="rounded-lg border bg-purple-50 p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-purple-900">Order Summary</h3>
      <Separator className="my-4 border-purple-300" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-sm text-gray-700">Subtotal</p>
          <p className="font-medium text-purple-900">EGP {subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-gray-700">Shipping</p>
          <p className="font-medium text-purple-900">EGP {shipping}</p>
        </div>
        <Separator className="border-purple-300" />
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-purple-900">Total</p>
          <p className="font-semibold text-purple-900">EGP {total}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input placeholder="Discount code" className="border-purple-600 focus:ring-purple-600" />
          <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
            Apply
          </Button>
        </div>
        <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
          Checkout
        </Button>
        <p className="text-center text-xs text-gray-500">Taxes and shipping calculated at checkout</p>
      </div>
    </div>
  )
}
