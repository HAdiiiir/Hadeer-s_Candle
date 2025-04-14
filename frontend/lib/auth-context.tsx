"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authAPI } from "./api"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: { email: string; password: string; name?: string }) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (profileData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          // Try both methods for backward compatibility
          try {
            const { user } = await authAPI.getCurrentUser()
            setUser(user)
          } catch {
            const response = await fetch('/api/auth/me')
            if (response.ok) {
              const userData = await response.json()
              setUser(userData)
            }
          }
        }
      } catch (err) {
        console.error('Auth check failed', err)
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function with both API options
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      // Try new API first, fallback to old
      try {
        const { token, user } = await authAPI.login(email, password)
        localStorage.setItem("token", token)
        setUser(user)
        router.push('/')
      } catch {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Login failed')
        }
        
        const userData = await response.json()
        setUser(userData)
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Register function with both API options
  const register = async (userData: { email: string; password: string; name?: string }) => {
    setIsLoading(true)
    setError(null)
    try {
      // Try new API first, fallback to old
      try {
        const { token, user } = await authAPI.register(userData)
        localStorage.setItem("token", token)
        setUser(user)
        router.push('/')
      } catch {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Registration failed')
        }
        
        const userData = await response.json()
        setUser(userData)
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    setIsLoading(true)
    try {
      // Try both logout methods
      try {
        await authAPI.logout()
      } catch {
        await fetch('/api/auth/logout', { method: 'POST' })
      }
      localStorage.removeItem("token")
      setUser(null)
      router.push('/login')
    } catch (err) {
      console.error('Logout failed', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Update profile function
  const updateProfile = async (profileData: Partial<User>) => {
    setIsLoading(true)
    setError(null)
    try {
      const { user } = await authAPI.updateProfile(profileData)
      setUser(prev => ({ ...prev!, ...user }))
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}