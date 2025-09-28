import {useState,useEffect} from 'react'
import axios from 'axios'
export default function Admin(){
  const [withdraws,setWithdraws]=useState([])
  const [pass,setPass]=useState('')
  const [authed,setAuthed]=useState(false)
  useEffect(()=>{if(authed)fetchWithdraws()},[authed])
  async function login(e){
    e.preventDefault()
    if(pass==='adminpass'){ setAuthed(true); } else alert('Wrong admin password (demo)')
  }
  async function fetchWithdraws(){
    const res = await axios.get('/api/admin/withdraws')
    setWithdraws(res.data.withdraws||[])
  }
  async function approve(id){
    await axios.post('/api/admin/withdraws/approve',{id})
    fetchWithdraws()
  }
  return (
    <div>
      <h2>لوحة الإدارة (Demo)</h2>
      {!authed ? (
        <form onSubmit={login} className="card">
          <label>كلمة سر المدير</label><br/>
          <input value={pass} onChange={e=>setPass(e.target.value)} /><br/><br/>
          <button type="submit">دخول</button>
        </form>
      ) : (
        <div>
          <h3>طلبات السحب</h3>
          {withdraws.map(w=>(
            <div key={w.id} className="card">
              <div><strong>{w.userEmail}</strong> — {w.amount} USDT</div>
              <div>Wallet: {w.wallet}</div>
              <div>Status: {w.status}</div>
              {w.status==='pending' && <button onClick={()=>approve(w.id)}>موافقة</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
