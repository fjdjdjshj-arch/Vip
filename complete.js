const { readDB, writeDB } = require('../_db')
export default function handler(req,res){
  if(req.method!=='POST') return res.status(405).end()
  const { taskId } = req.body
  const db = readDB()
  const user = db.users[0]
  const task = db.tasks.find(t=>t.id===taskId)
  if(!task) return res.status(400).json({error:'no task'})
  user.balance_usdt = (user.balance_usdt || 0) + (task.reward_usdt || 0)
  db.transactions = db.transactions || []
  db.transactions.push({ id: db.transactions.length+1, user_id: user.id, amount: task.reward_usdt, type:'credit', status:'done' , created_at: new Date().toISOString() })
  writeDB(db)
  res.status(200).json({ ok:true })
}
