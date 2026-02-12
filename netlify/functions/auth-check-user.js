import { Client } from 'node-postgres'

// Get Neon connection string from environment
const connectionString = process.env.VITE_NEON_DATABASE_URL

export async function handler(event) {
  console.log('Check user function invoked:', event.httpMethod)
  
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { email } = JSON.parse(event.body)
    console.log('Checking if user exists for email:', email)

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

    // Check if user exists
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email])

    console.log('User exists check result:', result.rows)

    await client.end()

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.rows[0] || null })
    }
  } catch (error) {
    console.error('Check user exists error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to check user existence.' })
    }
  }
}
