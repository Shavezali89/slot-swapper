import React, {useState} from 'react';
import { api } from '../api';

export default function Login({onLogin}){
  const [email,setEmail]=useState('alice@example.com');
  const [password,setPassword]=useState('alice123');
  const [err,setErr]=useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const r = await api('/auth/login',{method:'POST', body:{email,password}});
      onLogin(r.token);
    }catch(e){ setErr(e.message); }
  }
  return <form onSubmit={submit} style={{marginTop:10}}>
    <h3>Login</h3>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/><br/>
    <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/><br/>
    <button type="submit">Login</button>
    <div style={{color:'red'}}>{err}</div>
  </form>;
}
