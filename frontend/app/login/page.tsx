"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"

// Google Icon SVG component
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
)

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [guestLoading, setGuestLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      // Simulate Google auth
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem('userEmail', 'user@gmail.com')
      localStorage.setItem('authMethod', 'google')
      
      toast({
        title: "Login successful",
        description: "Welcome! You're now logged in with Google",
      })
      
      router.push("/")
      
    } catch (error) {
      console.error("Google login error:", error)
      toast({
        title: "Login error",
        description: "Couldn't sign in with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestCheckout = async () => {
    setGuestLoading(true)
    
    try {
      // Create a guest session
      const guestId = `guest_${Date.now()}`
      localStorage.setItem('guestId', guestId)
      localStorage.setItem('authMethod', 'guest')
      
      toast({
        title: "Guest session started",
        description: "You can now proceed with your order",
      })
      
      // Redirect to checkout or home page
      router.push("/checkout") // or "/" depending on your flow
      
    } catch (error) {
      console.error("Guest checkout error:", error)
      toast({
        title: "Error",
        description: "Couldn't start guest session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGuestLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 flex items-center justify-center py-12 md:py-24">
      <div className="container max-w-md">
        <div className="mx-auto w-full space-y-6 rounded-lg border bg-white p-8 shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-purple-600">Welcome</h1>
            <p className="text-gray-500">Sign in or continue as guest to place your order</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
            >
              <GoogleIcon />
              {isLoading ? "Signing in..." : "Continue with Google"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  OR
                </span>
              </div>
            </div>
            
            <Button
              onClick={handleGuestCheckout}
              disabled={guestLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {guestLoading ? "Processing..." : "Continue as Guest"}
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  )
}