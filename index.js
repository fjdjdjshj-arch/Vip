import Link from 'next/link'
import axios from 'axios'
import {useState,useEffect} from 'react'
export default function Home(){
  const [balance, setBalance] = useState(0)
  useEffect(()=>{fetchBalance()},[])
  async function fetchBalance(){
    try{
      const res = await axios.get('/api/me')
      if(res.data && res.data.user) setBalance(res.data.user.balance_usdt || 0)
    }catch(e){}
  }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>VIP Tasks - Demo</h2>
        <div>الرصيد: <strong>{balance} USDT</strong></div>
      </div>
      <div className='card'>
        <h3>المهام</h3>
        <Link href='/tasks'><a>عرض المهام</a></Link>
      </div>
      <div className='card'>
        <h3>السحب</h3>
        <Link href='/withdraw'><a>طلب سحب</a></Link>
      </div>
      <div className='card'>
        <h3>لوحة الإدارة</h3>
        <Link href='/admin'><a>ادخل للوحة الإدارة</a></Link>
      </div>
      <div style={{marginTop:20}}>
        <Link href='/login'><a>تسجيل / دخول</a></Link>
      </div>
    </div>
  )
}
