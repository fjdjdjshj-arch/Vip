const { readDB, writeDB } = require('./_db')
export default function handler(req,res){
  const db = readDB()
  if(req.method==='GET'){
    res.status(200).json({ tasks: db.tasks })
  } else if(req.method==='POST'){
    const { title, description, reward_usdt } = req.body
    const id = db.tasks.length ? Math.max(...db.tasks.map(t=>t.id))+1 : 1
    db.tasks.push({id,title,description,reward_usdt,active:true})
    writeDB(db)
    res.status(200).json({ ok:true })
  }
}
