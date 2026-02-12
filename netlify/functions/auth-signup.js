import { sql } from '@vercel/postgres'

export async function handler(event) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { email, name } = JSON.parse(event.body)

    // Check if user exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingUser.length > 0) {
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

    const result = await sql`
      INSERT INTO users (id, email, name, nickname, bio, location)
      VALUES (${userData.id}, ${userData.email}, ${userData.name}, ${userData.nickname}, ${userData.bio}, ${userData.location})
      RETURNING *
    `

    return {
      statusCode: 200,
      body: JSON.stringify({ data: result[0] })
    }
  } catch (error) {
    console.error('Auth signup error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create account. Please try again.' })
    }
  }
}
