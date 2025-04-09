"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([200, 800])

  const shapedOptions = [
    "Bride",
    "Teddy Bear",
    "Ball",
    "Crescent",
    "Lantern",
    "Skull"
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-purple-900">Filters</h3>
        <Button variant="outline" size="sm" className="mb-4 w-full justify-start border-purple-600 text-purple-600 hover:bg-purple-50">
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium text-purple-800">Price Range</h4>
          <ChevronDown className="h-4 w-4 text-purple-600" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            <Slider
              defaultValue={priceRange}
              min={100}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value as number[])}
              className="text-purple-600"
            />
            <div className="flex items-center justify-between text-xs text-purple-500">
              <span>From: <strong>EGP {priceRange[0]}</strong></span>
              <span>To: <strong>EGP {priceRange[1]}</strong></span>
            </div>
            <Button className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700">Done</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Candle Type */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium text-purple-800">Candle Type</h4>
          <ChevronDown className="h-4 w-4 text-purple-600" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-2">
          {["Gel Wax", "Palm Wax", "Soy Wax", "Shaped Candles"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type.toLowerCase().replace(" ", "-")}`} />
              <label htmlFor={`type-${type.toLowerCase().replace(" ", "-")}`} className="text-sm text-purple-700">{type}</label>
            </div>
          ))}
          <Button className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700">Done</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Size */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium text-purple-800">Size</h4>
          <ChevronDown className="h-4 w-4 text-purple-600" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 grid grid-cols-2 gap-3">
          {[65, 165, 275, 300, 320].map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox id={`size-${size}`} />
              <label htmlFor={`size-${size}`} className="text-sm text-purple-700">{size}g</label>
            </div>
          ))}
          <div className="col-span-2">
            <Button className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700">Done</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Shaped Candles */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium text-purple-800">Shaped Candles</h4>
          <ChevronDown className="h-4 w-4 text-purple-600" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-2">
          {shapedOptions.map((shape) => (
            <div key={shape} className="flex items-center space-x-2">
              <Checkbox id={`shape-${shape.toLowerCase().replace(" ", "-")}`} />
              <label htmlFor={`shape-${shape.toLowerCase().replace(" ", "-")}`} className="text-sm text-purple-700">{shape}</label>
            </div>
          ))}
          <Button className="w-full mt-2 bg-purple-600 text-white hover:bg-purple-700">Done</Button>
        </CollapsibleContent>
      </Collapsible>

      {/* Submit Button */}
      <div className="pt-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Submit</Button>
      </div>
    </div>
  )
}
