import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export function CartSummary() {
  // Sample cart data
  const subtotal = 950
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <p className="font-medium">EGP {subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Shipping</p>
          <p className="font-medium">EGP {shipping}</p>
        </div>
        <Separator />
        <div className="flex justify-between">
          <p className="text-sm font-semibold">Total</p>
          <p className="font-semibold">EGP {total}</p>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input placeholder="Discount code" />
          <Button variant="outline">Apply</Button>
        </div>
        <Button className="w-full">Checkout</Button>
        <p className="text-center text-xs text-gray-500">Taxes and shipping calculated at checkout</p>
      </div>
    </div>
  )
}

