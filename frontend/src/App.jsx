import React, {useState, useEffect} from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Requests from './pages/Requests';
import { api, setToken, getToken } from './api';

export default function App(){
  const [token, setTok] = useState(getToken());
  useEffect(()=> setToken(token), [token]);

  if(!token) return <Auth setToken={setTok} />;

  return (
    <div style={{fontFamily:'Arial', padding:20}}>
      <h1>SlotSwapper</h1>
      <nav style={{marginBottom:20}}>
        <button onClick={()=>setTok(null)}>Logout</button>
      </nav>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
        <div>
          <Dashboard token={token}/>
        </div>
        <div>
          <Marketplace token={token}/>
          <Requests token={token}/>
        </div>
      </div>
    </div>
  );
}

function Auth({setToken}){
  const [mode, setMode] = useState('login');
  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>SlotSwapper</h1>
      <div style={{display:'flex', gap:10}}>
        <button onClick={()=>setMode('login')}>Login</button>
        <button onClick={()=>setMode('signup')}>Signup</button>
      </div>
      {mode==='login' ? <Login onLogin={setToken}/> : <Signup onSignup={setToken}/>}
      <div style={{marginTop:12, color:'#777'}}>Use seeded users: alice@example.com/alice123 or bob@example.com/bob123</div>
    </div>
  );
}
