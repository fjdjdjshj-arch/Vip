import {useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const router = useRouter()
  async function submit(e){
    e.preventDefault()
    try{
      const res = await axios.post('/api/auth/login',{email,password})
      if(res.data && res.data.token){
        localStorage.setItem('token', res.data.token)
        alert('Logged in')
        router.push('/')
      }else alert('Login failed')
    }catch(err){ alert('Error') }
  }
  return (
    <div>
      <h2>تسجيل / دخول</h2>
      <form onSubmit={submit} className="card">
        <label>البريد</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <label>كلمة المرور</label><br/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/><br/>
        <button type="submit">دخول</button>
      </form>
    </div>
  )
}
