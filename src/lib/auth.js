const JWT_SECRET = 'your-secret-key-change-in-production'

export const generateToken = (user) => {
  return btoa(JSON.stringify(user)) // Simple encoding for demo
}

export const verifyToken = (token) => {
  try {
    return JSON.parse(atob(token))
  } catch {
    return null
  }
}
