import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";

interface CandleProduct {
  _id: string;
  name: string;
  price: number;
  size?: string;
  type: string;
  category: string;
  fragrance: string;
  waxType: string;
  burnTime: string;
  description: string;
  images: string[];
}

const featuredProducts: CandleProduct[] = [
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
    description: "Elegant transparent gel candle in glass, infused with our signature Vanilla & Amber fragrance blend.",
    images: ["https://i.pinimg.com/474x/66/4f/f7/664ff7120a4fe85e6a29cb2bb5d547b6.jpg"],
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
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/73/02/fb/7302fbc2de81e6d75d305f745f9d560f.jpg"],
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
    description: "Natural soy wax candle blended with calming Lavender and Chamomile essential oils.",
    images: ["https://i.pinimg.com/474x/c2/2a/11/c22a1180ac440ed1f7b13129b63ebc27.jpg"],
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
    description: "Premium soy candle with exotic Sandalwood fragrance and wooden wick for crackling effect.",
    images: ["https://i.pinimg.com/474x/e1/fc/3d/e1fc3da4b8695718be3baa5553a19139.jpg"],
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
    description: "Extra-large soy candle with rich Vanilla Bean aroma for large rooms.",
    images: ["https://i.pinimg.com/474x/a5/e3/51/a5e3512de14b6007eadb0fffb652f745.jpg"],
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
    description: "Eco-friendly palm wax candle with energizing Citrus & Bergamot blend.",
    images: ["https://i.pinimg.com/474x/cd/08/c8/cd08c8e4ad1baf40f75006cf5907a2d0.jpg"],
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
    description: "Luxury palm wax candle with romantic Rose & Musk perfume.",
    images: ["https://i.pinimg.com/474x/e9/2c/64/e92c64a9419b290bdaafa0b0aff852f2.jpg"],
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
    description: "Adorable teddy bear shaped candle with warm Cinnamon & Spice fragrance.",
    images: ["https://i.pinimg.com/474x/e6/5b/d5/e65bd5da00ba6d82719cb7410399ca82.jpg"],
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
    description: "Elegant bride doll candle for weddings and anniversaries.",
    images: ["https://i.pinimg.com/474x/21/a8/5d/21a85d0df504e6096ca4be5627b12f3a.jpg"],
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
    description: "Playful panda shaped candle with refreshing Green Tea fragrance.",
    images: ["https://i.pinimg.com/474x/3b/55/2b/3b552b7edb38558fb473d7f170413ae5.jpg"],
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
    description: "Edgy skull shaped candle with mysterious Black Orchid scent.",
    images: ["https://i.pinimg.com/474x/38/1a/85/381a85cc95680915a1ecba9e349b67fd.jpg"],
  },
  {
    _id: "SH-BL-012",
    name: "Ball Shaped Candle",
    price: 310,
    type: "Shaped Candle",
    category: "Molded",
    fragrance: "Fresh Cotton",
    waxType: "Soy Wax",
    burnTime: "9-11 hours",
    description: "Sleek spherical candle with clean Fresh Cotton fragrance.",
    images: ["https://i.pinimg.com/474x/b8/ce/a3/b8cea390b5d394bbbb59ab8d37ffd985.jpg"],
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
    description: "Realistic seashell shaped candle with oceanic Sea Salt aroma.",
    images: ["https://i.pinimg.com/736x/29/e3/84/29e38499eef6d5054d60091a46bc7b99.jpg"],
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
    description: "Exquisite rose-shaped candle with authentic Damask Rose perfume.",
    images: ["https://i.pinimg.com/474x/98/01/44/98014458c7336f44ec850b5bba22beea.jpg"],
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
    description: "Cheerful sunflower shaped candle with sweet Honey & Nectar scent.",
    images: ["https://i.pinimg.com/474x/f6/4b/52/f64b52fab8fce0b0d080dd1c487f8bcf.jpg"],
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
    description: "Statement bubble candle with luxurious Amber & Oud fragrance.",
    images: ["https://i.pinimg.com/474x/07/76/a8/0776a8956a9d7f348e9b9b4bd7b46610.jpg"],
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
    description: "Playful bubble candle with zesty Lemon Zest fragrance.",
    images: ["https://i.pinimg.com/474x/59/ab/8a/59ab8a84daba472521a3effc9ba69802.jpg"],
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
    burnTime: "15-20 hours",
    description: "Classic soy candle with clean Fresh Linen scent.",
    images: ["https://i.pinimg.com/736x/f7/7f/b8/f77fb81380abb8226a5957263ad7b480.jpg"],
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
    burnTime: "20-25 hours",
    description: "Tropical-inspired palm wax candle with creamy Coconut Milk fragrance.",
    images: ["https://i.pinimg.com/474x/4a/c8/19/4ac819ef0f52d06d0b2b91cfd3c5e137.jpg"],
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
    burnTime: "30-35 hours",
    description: "Large soy candle with comforting Vanilla Latte aroma.",
    images: ["https://i.pinimg.com/474x/6c/b1/29/6cb129f0e6e4ebd50aec2fba6bedb0df.jpg"],
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
    burnTime: "40-45 hours",
    description: "Luxury palm wax candle with sophisticated Suede & Musk fragrance.",
    images: ["https://i.pinimg.com/474x/48/0d/6a/480d6a28128b5e1ea0a0f6b2e80e3e78.jpg"],
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
    burnTime: "10-15 hours",
    description: "Extra-large gel candle with exotic Blue Agave scent.",
    images: ["https://i.pinimg.com/474x/4e/e6/e7/4ee6e7aa7173a88b77559c5012267012.jpg"],
  },
  {
    _id: "CP-GL-023",
    name: "Clear Gel Wax Candle",
    price: 710,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/3a/78/c9/3a78c9197fd3048ad9000dbc65e80a43.jpg"],
  },
  {
    _id: "CP-GL-024",
    name: "Clear Gel Wax Candle",
    price: 650,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/d6/2f/50/d62f50a93f9229616e66ca024850814d.jpg"],
  },
  {
    _id: "CP-GL-025",
    name: "Clear Gel Wax Candle",
    price: 650,
    size: "300g",
    type: "Gel Wax",
    category: "Cup",
    fragrance: "Ocean Breeze",
    waxType: "Crystal Clear Gel",
    burnTime: "35-40 hours",
    description: "Crystal clear gel candle with refreshing Ocean Breeze scent and decorative seashell embeds.",
    images: ["https://i.pinimg.com/474x/0a/4d/83/0a4d834a962a31b3450a4e91a664632e.jpg"],
  },
  {
    _id: "BB-SM-026",
    name: "Square-shaped Candle",
    price: 190,
    size: "165g",
    type: "Square-shaped Gel wax Candle",
    category: "Special",
    fragrance: "Lemon Zest",
    waxType: "Soy Wax",
    burnTime: "3-4 hours",
    description: "Playful bubble candle with zesty Lemon Zest fragrance.",
    images: ["https://i.pinimg.com/474x/5e/6c/43/5e6c4368f5c491193482e2920fe0a0f1.jpg"],
  },
  {
    _id: "CP-PL-027",
    name: "Palm Cup Candle (300g)",
    price: 600,
    size: "300g",
    type: "Cup Candle",
    category: "Cup",
    fragrance: "Suede & Musk",
    waxType: "Premium Palm Wax",
    burnTime: "40-45 hours",
    description: "Luxury palm wax candle with sophisticated Suede & Musk fragrance.",
    images: ["https://i.pinimg.com/736x/d9/9e/fd/d99efd0aa56362d580c04d829fdacaed.jpg"],
  },
];

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
              Discover our premium candles, each hand-poured with care and infused with exquisite fragrance blends
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