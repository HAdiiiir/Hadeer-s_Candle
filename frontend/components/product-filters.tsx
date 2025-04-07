"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([200, 800])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Filters</h3>
        <Button variant="outline" size="sm" className="mb-4 w-full justify-start">
          Clear All
        </Button>
      </div>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium">Price Range</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            <Slider
              defaultValue={priceRange}
              min={200}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value as number[])}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm">EGP {priceRange[0]}</p>
              <p className="text-sm">EGP {priceRange[1]}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium">Candle Type</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="type-gel" />
              <label htmlFor="type-gel" className="text-sm">
                Gel Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-palm" />
              <label htmlFor="type-palm" className="text-sm">
                Palm Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-soy" />
              <label htmlFor="type-soy" className="text-sm">
                Soy Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="type-shaped" />
              <label htmlFor="type-shaped" className="text-sm">
                Shaped Candles
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium">Size</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="size-65" />
              <label htmlFor="size-65" className="text-sm">
                65g
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-165" />
              <label htmlFor="size-165" className="text-sm">
                165g
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-275" />
              <label htmlFor="size-275" className="text-sm">
                275g
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-300" />
              <label htmlFor="size-300" className="text-sm">
                300g
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="size-320" />
              <label htmlFor="size-320" className="text-sm">
                320g
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h4 className="text-sm font-medium">Shaped Candles</h4>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-bride" />
              <label htmlFor="shape-bride" className="text-sm">
                Bride
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-teddy" />
              <label htmlFor="shape-teddy" className="text-sm">
                Teddy Bear
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-ball" />
              <label htmlFor="shape-ball" className="text-sm">
                Ball
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-crescent" />
              <label htmlFor="shape-crescent" className="text-sm">
                Crescent
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-lantern" />
              <label htmlFor="shape-lantern" className="text-sm">
                Lantern
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="shape-skull" />
              <label htmlFor="shape-skull" className="text-sm">
                Skull
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

