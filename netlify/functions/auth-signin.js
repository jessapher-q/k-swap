import { Client } from 'pg'

// Get Neon connection string from environment
const connectionString = process.env.VITE_NEON_DATABASE_URL

export async function handler(event) {
  console.log('Function invoked:', event.httpMethod)
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { email } = JSON.parse(event.body)
    console.log('Attempting login for email:', email)

    // Check if connection string exists
    if (!connectionString) {
      console.error('Database connection string not found in environment')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database configuration error' })
      }
    }

    // Initialize database connection
    const client = new Client({ connectionString })
    await client.connect()

    // Get user from database
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])

    console.log('Query result:', result.rows)

    await client.end()

    if (result.rows.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No account found with this email' })
      }
    }

    // In a real app, you'd verify password hash here
    // For now, we'll accept any password for demo purposes

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.rows[0] })
    }
  } catch (error) {
    console.error('Auth signin error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to sign in. Please check your credentials.' })
    }
  }
}
