import { createContext, useContext, useEffect, useState } from 'react'
import { getUserByEmail, createUser } from '../lib/dbHelpers'
import { generateToken, verifyToken } from '../lib/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('k-swap-token')
    if (token) {
      const userData = verifyToken(token)
      setUser(userData)
    }
    setLoading(false)
  }, [])

  const signUp = async (email, password, name) => {
    try {
      // Check if user exists
      const existingUser = await getUserByEmail(email)
      if (existingUser) {
        return { error: 'User already exists with this email' }
      }

      // Create new user
      const userId = crypto.randomUUID()
      const userData = { 
        id: userId, 
        email, 
        name, 
        nickname: '', 
        bio: '', 
        location: '' 
      }
      
      const createdUser = await createUser(userData)
      
      const token = generateToken(createdUser)
      localStorage.setItem('k-swap-token', token)
      setUser(createdUser)
      
      return { data: createdUser }
    } catch (error) {
      console.error('Sign up error:', error)
      return { error: 'Failed to create account. Please try again.' }
    }
  }

  const signIn = async (email, password) => {
    try {
      // Get user from database
      const userData = await getUserByEmail(email)
      if (!userData) {
        return { error: 'No account found with this email' }
      }

      // In a real app, you'd verify the password hash here
      // For now, we'll accept any password for demo purposes
      
      const token = generateToken(userData)
      localStorage.setItem('k-swap-token', token)
      setUser(userData)
      
      return { data: userData }
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: 'Failed to sign in. Please check your credentials.' }
    }
  }

  const signOut = () => {
    localStorage.removeItem('k-swap-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
