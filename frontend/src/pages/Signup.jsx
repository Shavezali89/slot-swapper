import React, {useState} from 'react';
import { api } from '../api';

export default function Signup({onSignup}){
  const [name,setName]=useState('New User');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const r = await api('/auth/signup',{method:'POST', body:{name,email,password}});
      onSignup(r.token);
    }catch(e){ setErr(e.message); }
  }
  return <form onSubmit={submit} style={{marginTop:10}}>
    <h3>Signup</h3>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="name"/><br/>
    <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/><br/>
    <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/><br/>
    <button type="submit">Signup</button>
    <div style={{color:'red'}}>{err}</div>
  </form>;
}
