import { sql } from './db'

export const createUser = async (userData) => {
  try {
    const result = await sql`
      INSERT INTO users (id, email, name, nickname, bio, location)
      VALUES (${userData.id}, ${userData.email}, ${userData.name}, ${userData.nickname}, ${userData.bio}, ${userData.location})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getUserByEmail = async (email) => {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `
    return result[0]
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

export const createSkill = async (skillData) => {
  try {
    const result = await sql`
      INSERT INTO skills (id, user_id, title, description, category, price_type, price_amount, location, availability)
      VALUES (${skillData.id}, ${skillData.user_id}, ${skillData.title}, ${skillData.description}, ${skillData.category}, ${skillData.price_type}, ${skillData.price_amount}, ${skillData.location}, ${skillData.availability})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Error creating skill:', error)
    throw error
  }
}

export const getApprovedSkills = async (category = null) => {
  try {
    let query = sql`
      SELECT s.*, u.name, u.nickname 
      FROM skills s 
      JOIN users u ON s.user_id = u.id 
      WHERE s.status = 'approved'
    `
    
    if (category && category !== 'all') {
      query = query` AND s.category = ${category}`
    }
    
    query = query` ORDER BY s.created_at DESC`
    
    return await query
  } catch (error) {
    console.error('Error getting approved skills:', error)
    throw error
  }
}
