// Check if we're in production (Netlify)
const isProduction = import.meta.env.PROD

// API functions for production, mock for local development
const apiCall = async (functionName, data) => {
  if (isProduction) {
    // Use Netlify Functions in production
    const response = await fetch(`/.netlify/functions/${functionName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'API call failed')
    }
    return result
  } else {
    // Use mock data for local development
    return mockAPI(functionName, data)
  }
}

// Mock API for local development
const mockAPI = async (functionName, data) => {
  console.log('Mock API call:', functionName, data)
  
  if (functionName === 'auth-signin') {
    // Mock user lookup
    return { data: { id: '1', email: data.email, name: 'Mock User' } }
  }
  
  if (functionName === 'auth-signup') {
    // Mock user creation
    return { data: { id: crypto.randomUUID(), ...data } }
  }
  
  return { data: null }
}

export const createUser = async (userData) => {
  try {
    const result = await apiCall('auth-signup', userData)
    return result.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUserByEmail = async (email) => {
  try {
    const result = await apiCall('auth-signin', { email })
    return result.data
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

export const checkUserExists = async (email) => {
  try {
    const result = await apiCall('auth-check-user', { email })
    return result.data
  } catch (error) {
    console.error('Error checking if user exists:', error)
    throw error
  }
}

export const createSkill = async (skillData) => {
  try {
    // For now, just return mock data
    return { 
      id: crypto.randomUUID(), 
      created_at: new Date().toISOString(),
      status: 'approved',
      ...skillData 
    }
  } catch (error) {
    console.error('Error creating skill:', error)
    throw error
  }
}

export const getApprovedSkills = async (category = null) => {
  try {
    // For now, return empty array
    return []
  } catch (error) {
    console.error('Error getting approved skills:', error)
    throw error
  }
}
