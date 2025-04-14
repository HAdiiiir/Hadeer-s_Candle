// app/blog/page.tsx
'use client'; // Required for useState and useSearchParams

import { BookOpen, Flame, Leaf, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Full list of all possible blog posts
const allPostsData = [
  {
    id: 1,
    slug: "candle-burning-art",
    title: "The Art of Candle Burning: Maximizing Your Candle's Lifespan",
    excerpt: "Learn proper techniques to extend your candle's burn time and enjoy its fragrance longer with our expert care guide.",
    date: "May 15, 2023",
    category: "Care Tips",
    icon: <Flame className="h-8 w-8 text-amber-500" />,
    readTime: "4 min read"
  },
  {
    id: 2,
    slug: "soy-vs-beeswax",
    title: "Soy vs. Beeswax: Choosing the Right Wax for Your Needs",
    excerpt: "Compare the benefits of different candle wax types to find your perfect match for health and ambiance.",
    date: "April 2, 2023",
    category: "Materials",
    icon: <Leaf className="h-8 w-8 text-emerald-500" />,
    readTime: "6 min read"
  },
  {
    id: 3,
    slug: "perfect-ambiance",
    title: "Creating the Perfect Ambiance with Scented Candles",
    excerpt: "Discover how to use fragrance to enhance different rooms and occasions for maximum relaxation.",
    date: "March 10, 2023",
    category: "Lifestyle",
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    readTime: "5 min read"
  },
  {
    id: 4,
    slug: "seasonal-scents",
    title: "Seasonal Scents: Choosing Candles for Every Time of Year",
    excerpt: "Our guide to selecting the perfect fragrances to match seasonal moods and celebrations.",
    date: "February 22, 2023",
    category: "Lifestyle",
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    readTime: "5 min read"
  },
  {
    id: 5,
    slug: "candle-safety",
    title: "Candle Safety: Protecting Your Home and Family",
    excerpt: "Essential safety tips every candle lover should know to enjoy candles responsibly.",
    date: "January 15, 2023",
    category: "Care Tips",
    icon: <Flame className="h-8 w-8 text-amber-500" />,
    readTime: "3 min read"
  },
  {
    id: 6,
    slug: "science-fragrances",
    title: "The Science Behind Candle Fragrances",
    excerpt: "How scent molecules work to create mood and evoke memories through candle aromas.",
    date: "December 5, 2023",
    category: "Materials",
    icon: <Leaf className="h-8 w-8 text-emerald-500" />,
    readTime: "7 min read"
  },
  {
    id: 7,
    slug: "handmade-care",
    title: "Handmade Candle Care: Preserving Your Artisan Pieces",
    excerpt: "Special care instructions for maintaining the beauty of handmade candle creations.",
    date: "November 10, 2023",
    category: "Care Tips",
    icon: <Flame className="h-8 w-8 text-amber-500" />,
    readTime: "5 min read"
  },
  {
    id: 8,
    slug: "oil-blends",
    title: "Essential Oil Blends for Relaxation",
    excerpt: "Discover the most calming essential oil combinations for your homemade candles.",
    date: "October 18, 2023",
    category: "Materials",
    icon: <Leaf className="h-8 w-8 text-emerald-500" />,
    readTime: "6 min read"
  },
  {
    id: 9,
    slug: "candle-gifting",
    title: "Candle Gifting: How to Choose the Perfect Scent",
    excerpt: "Our guide to selecting candles as gifts for different personalities and occasions.",
    date: "September 5, 2023",
    category: "Lifestyle",
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    readTime: "4 min read"
  },
  {
    id: 10,
    slug: "history-candles",
    title: "The History of Candle Making",
    excerpt: "A journey through time exploring how candle making has evolved over centuries.",
    date: "August 12, 2023",
    category: "Lifestyle",
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    readTime: "8 min read"
  },
  {
    id: 11,
    slug: "sustainable-candles",
    title: "Sustainable Candle Practices",
    excerpt: "How to enjoy candles while being environmentally conscious.",
    date: "July 20, 2023",
    category: "Materials",
    icon: <Leaf className="h-8 w-8 text-emerald-500" />,
    readTime: "5 min read"
  },
  {
    id: 12,
    slug: "candle-storage",
    title: "Candle Storage Tips for Longevity",
    excerpt: "Proper storage techniques to preserve your candles' quality and fragrance.",
    date: "June 8, 2023",
    category: "Care Tips",
    icon: <Flame className="h-8 w-8 text-amber-500" />,
    readTime: "3 min read"
  }
];

const postsPerLoad = 3; // Number of posts to load each time

export default function Blog() {
  const searchParams = useSearchParams();
  const [visiblePosts, setVisiblePosts] = useState(postsPerLoad);
  const selectedCategory = searchParams?.get('category') || 'All';

  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? allPostsData 
    : allPostsData.filter(post => post.category === selectedCategory);

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Posts to display (limited by visiblePosts)
  const postsToShow = sortedPosts.slice(0, visiblePosts);

  const categories = [
    { name: "All", count: allPostsData.length },
    { name: "Care Tips", count: allPostsData.filter(p => p.category === "Care Tips").length },
    { name: "Materials", count: allPostsData.filter(p => p.category === "Materials").length },
    { name: "Lifestyle", count: allPostsData.filter(p => p.category === "Lifestyle").length }
  ];

  const loadMore = () => {
    setVisiblePosts(prev => prev + postsPerLoad);
  };

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Candle Care Journal</h1>
        <p className="text-lg text-gray-600 mb-6">
          Expert insights and inspiration for candle enthusiasts
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <Button 
              key={cat.name}
              asChild
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === cat.name ? 'bg-purple-600' : 'border-purple-200 text-purple-700 hover:bg-purple-50'}`}
            >
              <Link href={cat.name === 'All' ? '/blog' : `/blog?category=${cat.name}`}>
                {cat.name} <span className="ml-1">({cat.count})</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
      
      {postsToShow.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsToShow.map((post) => (
            <Card 
              key={post.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-50"
            >
              <CardHeader className="p-0">
                <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center">
                  {post.icon}
                  <Badge variant="secondary" className="mt-4 bg-white text-purple-700">
                    {post.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-xs text-purple-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  asChild
                  variant="link" 
                  className="text-purple-600 p-0 h-auto font-medium group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found in this category.</p>
        </div>
      )}

      {visiblePosts < filteredPosts.length && (
        <div className="mt-12 text-center">
          <Button 
            onClick={loadMore}
            variant="outline"
            className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3"
          >
            Load More Articles
          </Button>
        </div>
      )}
    </div>
  )
}