"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function SearchFilters() {
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
              <Checkbox id="search-type-gel" />
              <label htmlFor="search-type-gel" className="text-sm">
                Gel Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="search-type-palm" />
              <label htmlFor="search-type-palm" className="text-sm">
                Palm Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="search-type-soy" />
              <label htmlFor="search-type-soy" className="text-sm">
                Soy Wax
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="search-type-shaped" />
              <label htmlFor="search-type-shaped" className="text-sm">
                Shaped Candles
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

