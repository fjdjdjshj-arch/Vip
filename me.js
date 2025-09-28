const { readDB } = require('./_db')
export default function handler(req,res){
  // demo: return first user as logged-in user
  const db = readDB()
  const user = db.users[0] || null
  res.status(200).json({ user })
}
