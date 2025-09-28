import {useState} from 'react'
import axios from 'axios'
export default function Withdraw(){
  const [amount,setAmount]=useState(''); const [wallet,setWallet]=useState('')
  async function submit(e){
    e.preventDefault()
    try{
      const res = await axios.post('/api/withdraws', {amount, wallet})
      if(res.data && res.data.ok) alert('طلب السحب تم وإنتظار الموافقة')
      else alert('خطأ')
    }catch(e){ alert('خطأ') }
  }
  return (
    <div>
      <h2>طلب سحب</h2>
      <form onSubmit={submit} className="card">
        <label>المبلغ (USDT)</label><br/>
        <input value={amount} onChange={e=>setAmount(e.target.value)} /><br/>
        <label>محفظة (Wallet Address)</label><br/>
        <input value={wallet} onChange={e=>setWallet(e.target.value)} /><br/><br/>
        <button type="submit">طلب السحب</button>
      </form>
    </div>
  )
}
