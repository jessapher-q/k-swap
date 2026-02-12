import { sql } from '@vercel/postgres'

// Get Neon connection string from environment
const connectionString = process.env.VITE_NEON_DATABASE_URL

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { email } = JSON.parse(event.body)

    // Initialize database connection
    const db = sql(connectionString)

    // Get user from database
    const result = await db`
      SELECT * FROM users WHERE email = ${email}
    `

    if (result.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No account found with this email' })
      }
    }

    // In a real app, you'd verify password hash here
    // For now, we'll accept any password for demo purposes

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result[0] })
    }
  } catch (error) {
    console.error('Auth signin error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to sign in. Please check your credentials.' })
    }
  }
}
