import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

const featuredProducts = [
  {
    _id: "CP-GL-001",
    name: "Luxury Gel Wax Candle",
    price: 310,
    size: "65g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Vanilla & Amber",
    waxType: "Premium Crystal Gel",
    burnTime: "20-25 hours",
    description: "Elegant transparent gel candle in IKEA glass, infused with our signature Vanilla & Amber fragrance blend. Perfect for creating a cozy atmosphere in small spaces.",
    images: ["/candles/gel-vanilla-amber.jpg"],
  },
  {
    _id: "CP-GL-002",
    name: "Clear Gel Wax Candle",
    price: 350,
    size: "165g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle in IKEA tumbler with refreshing Ocean Breeze scent. Features decorative seashell embeds. Ideal for bathrooms and coastal-themed decor.",
    images: ["/candles/gel-ocean.jpg"],
  },
  {
    _id: "CP-SY-003",
    name: "Natural Soy Wax Candle",
    price: 330,
    size: "65g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Lavender & Chamomile",
    waxType: "100% Soy Wax",
    burnTime: "20-25 hours",
    description: "Natural soy wax candle in IKEA glass, blended with calming Lavender and Chamomile essential oils. Perfect for bedtime relaxation and meditation spaces.",
    images: ["/candles/soy-lavender.jpg"],
  },
  {
    _id: "CP-SY-004",
    name: "Premium Soy Wax Candle",
    price: 450,
    size: "165g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Sandalwood",
    waxType: "Organic Soy Wax",
    burnTime: "35-40 hours",
    description: "Premium soy candle in IKEA jar with exotic Sandalwood fragrance. Features wooden wick for crackling fireplace effect. Great for living rooms and offices.",
    images: ["/candles/soy-sandalwood.jpg"],
  },
  {
    _id: "CP-SY-005",
    name: "Large Soy Wax Candle",
    price: 650,
    size: "275g",
    type: "Soy Wax",
    category: "Cup",
    fragrance: "Vanilla Bean",
    waxType: "Soy Wax Blend",
    burnTime: "50-55 hours",
    description: "Extra-large soy candle in IKEA container with rich Vanilla Bean aroma. Long-lasting burn time makes it perfect for frequent use in large rooms.",
    images: ["/candles/soy-vanilla.jpg"],
  },
  {
    _id: "CP-PL-006",
    name: "Palm Wax Candle",
    price: 269,
    size: "65g",
    type: "Palm Wax",
    category: "Cup",
    fragrance: "Citrus & Bergamot",
    waxType: "Sustainable Palm Wax",
    burnTime: "20-25 hours",
    description: "Eco-friendly palm wax candle in IKEA glass with energizing Citrus & Bergamot blend. Features unique crystalline pattern when solid.",
    images: ["/candles/palm-citrus.jpg"],
  },
  {
    _id: "CP-PL-007",
    name: "Palm Wax Candle Large",
    price: 500,
    size: "300g",
    type: "Palm Wax",
    category: "Cup",
    fragrance: "Rose & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "60-65 hours",
    description: "Luxury palm wax candle in large IKEA vessel with romantic Rose & Musk perfume. Beautiful feathery crystallization pattern develops as it cools.",
    images: ["/candles/palm-rose.jpg"],
  },
  {
    _id: "SH-TD-008",
    name: "Teddy Bear Shaped Candle",
    price: 350,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Cinnamon & Spice",
    waxType: "Soy-Palm Blend",
    burnTime: "4-6 hours",
    description: "Adorable teddy bear shaped candle with warm Cinnamon & Spice fragrance. Makes a perfect gift for children's rooms or baby showers. Hand-poured with care.",
    images: ["/candles/teddy-bear.jpg"],
  },
  {
    _id: "SH-BR-009",
    name: "Bride Doll Candle",
    price: 240,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Jasmine & Lily",
    waxType: "Premium Paraffin",
    burnTime: "5-7 hours",
    description: "Elegant bride doll candle for weddings and anniversaries. Scented with romantic Jasmine & Lily bouquet. Traditional Egyptian design with intricate details.",
    images: ["/candles/bride-doll.jpg"],
  },
  {
    _id: "SH-PD-010",
    name: "Panda Shaped Candle",
    price: 190,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Green Tea",
    waxType: "Soy Wax",
    burnTime: "4-5 hours",
    description: "Playful panda shaped candle with refreshing Green Tea fragrance. Features black and white color details. Great for kids' rooms or as desk decor.",
    images: ["/candles/panda.jpg"],
  },
  {
    _id: "SH-SK-011",
    name: "Skull Shaped Candle",
    price: 210,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Black Orchid",
    waxType: "Palm-Paraffin Blend",
    burnTime: "6-8 hours",
    description: "Edgy skull shaped candle with mysterious Black Orchid scent. Detailed mold captures realistic features. Popular for Halloween and Gothic decor.",
    images: ["/candles/skull.jpg"],
  },
  {
    _id: "SH-BL-012",
    name: "Ball Shaped Candle",
    price:  310,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Fresh Cotton",
    waxType: "Soy Wax",
    burnTime: "9-11 hours",
    description: "Sleek spherical candle with clean Fresh Cotton fragrance. Minimalist design fits any decor style. Available in multiple pastel color options.",
    images: ["/candles/ball.jpg"],
  },
  {
    _id: "SH-SH-013",
    name: "Shell Shaped Candle",
    price: 50,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Sea Salt",
    waxType: "Palm Wax",
    burnTime: "1-2 hours",
    description: "Realistic seashell shaped candle with oceanic Sea Salt aroma. Features natural shell texture and pearlescent finish. Perfect for beach-themed decor.",
    images: ["/candles/shell.jpg"],
  },
  {
    _id: "SH-RS-014",
    name: "Rose Shaped Candle",
    price: 170,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Damask Rose",
    waxType: "Beeswax-Soy Blend",
    burnTime: "2-3 hours",
    description: "Exquisite rose-shaped candle with authentic Damask Rose perfume. Each petal is hand-shaped for realistic appearance. Romantic gift for special occasions.",
    images: ["/candles/rose.jpg"],
  },
  {
    _id: "SH-SF-015",
    name: "Sunflower Shaped Candle",
    price: 60,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Honey & Nectar",
    waxType: "Soy Wax",
    burnTime: "1-2 hours",
    description: "Cheerful sunflower shaped candle with sweet Honey & Nectar scent. Vibrant yellow petals with brown center. Brings summer vibes to any room.",
    images: ["/candles/sunflower.jpg"],
  },
  {
    _id: "BB-LG-016",
    name: "Large Bubble Candle",
    price: 140,
    size: "320g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Amber & Oud",
    waxType: "Paraffin-Soy Blend",
    burnTime: "3-4 hours",
    description: "Statement bubble candle with luxurious Amber & Oud fragrance. Unique textured surface creates beautiful light patterns. Makes a dramatic centerpiece.",
    images: ["/candles/bubble-large.jpg"],
  },
  {
    _id: "BB-SM-017",
    name: "Small Bubble Candle",
    price: 120,
    size: "165g",
    type: "Bubble Candle",
    category: "Special",
    fragrance: "Lemon Zest",
    waxType: "Soy Wax",
    burnTime: "1-2 hours",
    description: "Playful bubble candle with zesty Lemon Zest fragrance. Smaller version of our popular bubble design. Great for grouping or as accent pieces.",
    images: ["/candles/bubble-small.jpg"],
  },
  {
    _id: "CP-SY-018",
    name: "Soy Cup Candle (65g)",
    price: 250,
    size: "65g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Fresh Linen",
    waxType: "100% Soy Wax",
    burnTime: "10-15 hours",
    description: "Classic soy candle in IKEA glass with clean Fresh Linen scent. Simple and versatile for any room. Cotton wick for clean burn.",
    images: ["/candles/cup-65g.jpg"],
  },
  {
    _id: "CP-PL-019",
    name: "Palm Cup Candle (165g)",
    price: 380,
    size: "165g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Coconut Milk",
    waxType: "Sustainable Palm Wax",
    burnTime: "15-17 hours",
    description: "Tropical-inspired palm wax candle in IKEA jar with creamy Coconut Milk fragrance. Features natural crystalline surface pattern.",
    images: ["/candles/cup-165g.jpg"],
  },
  {
    _id: "CP-SY-020",
    name: "Soy Cup Candle (275g)",
    price: 550,
    size: "275g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Vanilla Latte",
    waxType: "Soy Wax Blend",
    burnTime: "15-20 hours",
    description: "Large soy candle in IKEA container with comforting Vanilla Latte aroma. Perfect for coffee lovers and cozy winter evenings.",
    images: ["/candles/cup-275g.jpg"],
  },
  {
    _id: "CP-PL-021",
    name: "Palm Cup Candle (300g)",
    price: 600,
    size: "300g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Suede & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "20-30 hours",
    description: "Luxury palm wax candle in large IKEA vessel with sophisticated Suede & Musk fragrance. Elegant masculine scent for offices and studies.",
    images: ["/candles/cup-300g.jpg"],
  },
  {
    _id: "CP-GL-022",
    name: "Gel Cup Candle (320g)",
    price: 650,
    size: "320g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Blue Agave",
    waxType: "Crystal Gel",
    burnTime: "8-10 hours",
    description: "Extra-large gel candle in IKEA glass with exotic Blue Agave scent. Can be customized with decorative embeds. Makes a stunning gift.",
    images: ["/candles/cup-320g.jpg"],
  }
]

export function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/20 to-muted/60">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                Handcrafted Candles Collection
              </span>
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover our premium candles, each hand-poured with care in IKEA glassware and infused with exquisite fragrance blends
            </p>
          </div>
        </div>
        
        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button variant="outline" className="rounded-full px-5 border-amber-300 text-amber-700 hover:bg-amber-50">
            All Products
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-green-300 text-green-700 hover:bg-green-50">
            Soy Wax
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-blue-300 text-blue-700 hover:bg-blue-50">
            Palm Wax
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-purple-300 text-purple-700 hover:bg-purple-50">
            Gel Wax
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-pink-300 text-pink-700 hover:bg-pink-50">
            Shaped Candles
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-gray-300 text-gray-700 hover:bg-gray-50">
            Cup Candles
          </Button>
          <Button variant="outline" className="rounded-full px-5 border-teal-300 text-teal-700 hover:bg-teal-50">
            Bubble Candles
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <div key={product._id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
              <ProductCard product={product} />
              
              {/* Enhanced Product Details */}
              <div className="p-4 pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.type}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                    {product._id}
                  </span>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">EGP {product.price}</span>
                  {product.size && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {product.size}
                    </span>
                  )}
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Fragrance:</h4>
                  <p className="text-sm text-gray-600">{product.fragrance}</p>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-900">Description:</h4>
                  <p className="mt-1 text-sm text-gray-600">{product.description}</p>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                    {product.waxType}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                    Burn Time: {product.burnTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-4">
          <Button asChild className="rounded-full px-8 py-5 text-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg">
            <Link href="/products" className="flex items-center">
              Explore Full Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild className="rounded-full px-8 py-5 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg">
            <Link href="/checkout" className="flex items-center">
              Confirm Your Order <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}