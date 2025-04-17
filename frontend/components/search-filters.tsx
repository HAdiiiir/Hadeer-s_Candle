"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface SearchFiltersProps {
  products: any[] // Replace with your actual product type
  onFilter: (filteredProducts: any[]) => void
}

export function SearchFilters({ products, onFilter }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([200, 800])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isFiltered, setIsFiltered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const candleTypes = [
    { id: "gel", label: "Gel Wax" },
    { id: "palm", label: "Palm Wax" },
    { id: "soy", label: "Soy Wax" },
    { id: "shaped", label: "Shaped Candles" }
  ]

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    )
    setIsFiltered(true)
  }

  const clearAllFilters = () => {
    setPriceRange([200, 800])
    setSelectedTypes([])
    setIsFiltered(false)
    onFilter(products) // Reset to show all products
  }

  const applyFilters = () => {
    const filtered = products.filter(product => {
      // Price range filter
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      // Type filter (if any types are selected)
      const typeMatch = selectedTypes.length === 0 || 
                        selectedTypes.includes(product.type.toLowerCase())
      
      return priceMatch && typeMatch
    })
    
    onFilter(filtered)
    setIsOpen(false)
  }

  // Apply filters whenever price range or types change
  useEffect(() => {
    if (isFiltered) {
      applyFilters()
    }
  }, [priceRange, selectedTypes])

  return (
    <div className="space-y-6 p-4 border border-purple-100 rounded-lg bg-purple-50/30">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-800">Filters</h3>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearAllFilters}
          disabled={!isFiltered}
          className={cn(
            "text-purple-600 hover:text-purple-800 hover:bg-purple-100 transition-all",
            !isFiltered && "opacity-0 pointer-events-none"
          )}
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Price Range Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-3 px-2 rounded-lg hover:bg-purple-100/50 transition-colors">
          <h4 className="text-sm font-medium text-purple-700">Price Range</h4>
          <ChevronDown className="h-4 w-4 text-purple-600 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 px-2">
          <div className="space-y-4">
            <Slider
              value={priceRange}
              min={200}
              max={1000}
              step={10}
              onValueChange={(value) => {
                setPriceRange(value as number[])
                setIsFiltered(true)
              }}
              className="[&_[role=slider]]:bg-purple-600 [&_[role=slider]]:hover:bg-purple-700"
            />
            <div className="flex items-center justify-between text-sm text-purple-700">
              <span>EGP {priceRange[0]}</span>
              <span>EGP {priceRange[1]}</span>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Candle Type Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-3 px-2 rounded-lg hover:bg-purple-100/50 transition-colors">
          <h4 className="text-sm font-medium text-purple-700">Candle Type</h4>
          <ChevronDown className="h-4 w-4 text-purple-600 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 px-2">
          <div className="space-y-3">
            {candleTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-3">
                <Checkbox 
                  id={`type-${type.id}`}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeChange(type.id)}
                  className="border-purple-300 data-[state=checked]:bg-purple-600"
                />
                <label 
                  htmlFor={`type-${type.id}`} 
                  className="text-sm text-purple-700 hover:text-purple-900 cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Apply Button */}
      <Button 
        className={cn(
          "w-full bg-purple-600 hover:bg-purple-700 text-white transition-all mt-4",
          !isFiltered && "opacity-50 pointer-events-none"
        )}
        disabled={!isFiltered}
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  )
}