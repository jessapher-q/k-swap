// Mock database for local development, real Neon for production
const isProduction = import.meta.env.PROD

// Mock data for local development
const mockUsers = []
const mockSkills = []

// Mock SQL function for local development
const mockSQL = async (templateStrings, ...values) => {
  console.log('Mock SQL query:', templateStrings, values)
  
  // Reconstruct the query string
  let query = templateStrings.join('')
  
  // Handle different query types
  if (query.includes('SELECT * FROM users WHERE email')) {
    const email = values[0]
    const foundUser = mockUsers.find(user => user.email === email)
    return foundUser ? [foundUser] : []
  }
  
  if (query.includes('INSERT INTO users')) {
    const userData = values[0]
    const newUser = { 
      id: crypto.randomUUID(), 
      created_at: new Date().toISOString(),
      ...userData 
    }
    mockUsers.push(newUser)
    return [newUser]
  }
  
  if (query.includes('SELECT s.*, u.name, u.nickname')) {
    return mockSkills.map(skill => ({
      ...skill,
      name: skill.user_name || 'Test User',
      nickname: skill.user_nickname || ''
    }))
  }
  
  if (query.includes('INSERT INTO skills')) {
    const skillData = values[0]
    const newSkill = { 
      id: crypto.randomUUID(), 
      created_at: new Date().toISOString(),
      status: 'approved',
      ...skillData 
    }
    mockSkills.push(newSkill)
    return [newSkill]
  }
  
  return []
}

// Export mock SQL for local development
export { mockSQL as sql }
