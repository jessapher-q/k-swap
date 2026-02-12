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
    const { email, name } = JSON.parse(event.body)
    console.log('Attempting signup for email:', email, 'name:', name)

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
    const existingUser = await client.query('SELECT * FROM users WHERE email = $1', [email])

    console.log('Existing user check:', existingUser.rows)

    if (existingUser.rows.length > 0) {
      await client.end()
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User already exists with this email' })
      }
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

    const result = await client.query('INSERT INTO users (id, email, name, nickname, bio, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [userData.id, userData.email, userData.name, userData.nickname, userData.bio, userData.location])

    console.log('User created:', result.rows)

    await client.end()

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result.rows[0] })
    }
  } catch (error) {
    console.error('Auth signup error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create account. Please try again.' })
    }
  }
}
