"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authAPI } from "./api"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  updateProfile: (profileData: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if user is logged in on initial load
  useEffect(() => {
    if (!isClient) return

    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          const { user } = await authAPI.getCurrentUser()
          setUser(user)
        }
      } catch (err) {
        // Clear invalid token
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [isClient])

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { token, user } = await authAPI.login(email, password)
      localStorage.setItem("token", token)
      setUser(user)
    } catch (err: any) {
      setError(err.message || "Login failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData: any) => {
    setLoading(true)
    setError(null)
    try {
      const { token, user } = await authAPI.register(userData)
      localStorage.setItem("token", token)
      setUser(user)
    } catch (err: any) {
      setError(err.message || "Registration failed")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  // Update profile function
  const updateProfile = async (profileData: any) => {
    setLoading(true)
    setError(null)
    try {
      const { user } = await authAPI.updateProfile(profileData)
      setUser(user)
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
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
