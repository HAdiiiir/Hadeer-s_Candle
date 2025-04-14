// app/blog/[id]/page.tsx
import { notFound } from 'next/navigation'
import { Flame, Leaf, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// This should match your post data structure from the blog page
interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  content: string
}

// Mock database of full articles (in a real app, this would come from a CMS or database)
const fullArticles: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Candle Burning: Maximizing Your Candle's Lifespan",
    excerpt: "Learn proper techniques to extend your candle's burn time...",
    date: "May 15, 2023",
    category: "Care Tips",
    readTime: "4 min read",
    content: `
      <h2>Introduction</h2>
      <p>Proper candle burning techniques can significantly extend your candle's lifespan...</p>
      
      <h2>First Burn is Crucial</h2>
      <p>When lighting your candle for the first time, allow it to burn until...</p>
      <ul>
        <li>Burn for at least 2 hours</li>
        <li>Let the wax melt to the edges</li>
        <li>This prevents "tunneling"</li>
      </ul>
      
      <h2>Trimming the Wick</h2>
      <p>Keep wicks trimmed to 1/4 inch before each burn to...</p>
      
      <h2>Storage Tips</h2>
      <p>Store candles in a cool, dark place when not in use...</p>
    `
  },
  {
    id: 2,
    title: "Soy vs. Beeswax: Choosing the Right Wax for Your Needs",
    excerpt: "Compare the benefits of different candle wax types...",
    date: "April 2, 2023",
    category: "Materials",
    readTime: "6 min read",
    content: `
      <h2>Wax Comparison Guide</h2>
      <p>Choosing between soy and beeswax depends on your priorities...</p>
      
      <h3>Soy Wax Benefits</h3>
      <ul>
        <li>Renewable resource</li>
        <li>Cleaner burn with less soot</li>
        <li>Excellent scent throw</li>
        <li>Lower melting point (longer burn time)</li>
      </ul>
      
      <h3>Beeswax Benefits</h3>
      <ul>
        <li>Natural air purifier</li>
        <li>Sweet honey-like aroma</li>
        <li>Longer shelf life</li>
        <li>Harder wax (less prone to melting in heat)</li>
      </ul>
      
      <h2>Which Should You Choose?</h2>
      <p>For eco-conscious consumers, soy may be preferable...</p>
    `
  },
  // Add all other articles with full content
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = fullArticles.find(post => post.id === Number(params.id))
  
  if (!post) {
    return notFound()
  }

  // Get the appropriate icon based on category
  const getCategoryIcon = () => {
    switch(post.category) {
      case 'Care Tips': return <Flame className="h-6 w-6 text-amber-500" />
      case 'Materials': return <Leaf className="h-6 w-6 text-emerald-500" />
      case 'Lifestyle': return <Sparkles className="h-6 w-6 text-purple-500" />
      default: return <BookOpen className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Button asChild variant="link" className="mb-6 pl-0 text-purple-600">
          <Link href="/blog">
            ← Back to all articles
          </Link>
        </Button>
        
        {/* Article header */}
        <div className="flex items-center gap-2 mb-4">
          {getCategoryIcon()}
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {post.category}
          </Badge>
          <span className="text-sm text-gray-500">{post.date}</span>
          <span className="text-sm text-purple-500 ml-auto">{post.readTime}</span>
        </div>
        
        {/* Article title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{post.title}</h1>
        
        {/* Article content */}
        <div 
          className="prose prose-purple max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Share buttons */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Share this article</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-gray-300">
              Twitter
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Facebook
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300">
              Copy Link
            </Button>
          </div>
        </div>
        
        {/* Related articles */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">More {post.category} Articles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {fullArticles
              .filter(p => p.category === post.category && p.id !== post.id)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-gray-900 mb-2">{relatedPost.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
                  <span className="inline-block mt-2 text-sm text-purple-600">Read more →</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}