import React, {useEffect, useState} from 'react';
import { api } from '../api';

export default function Marketplace(){
  const [slots,setSlots]=useState([]);
  const [mySwappables,setMySwappables]=useState([]);
  const [err,setErr]=useState('');
  useEffect(()=>load(),[]);
  async function load(){
    try{
      const s = await api('/swappable-slots');
      setSlots(s);
      const mine = await api('/events');
      setMySwappables(mine.filter(m=>m.status==='SWAPPABLE'));
    }catch(e){ setErr(e.message); }
  }
  async function requestSwap(theirSlotId, mySlotId){
    try{
      await api('/swap-request', { method: 'POST', body: { mySlotId, theirSlotId }});
      load();
    }catch(e){ setErr(e.message); }
  }
  return <div style={{marginTop:20}}>
    <h3>Marketplace</h3>
    <ul>
      {slots.map(s=> <li key={s.id}>
        <b>{s.title}</b> — {new Date(s.startTime).toLocaleString()} by {s.User?.name}
        <div>
          Offer one of your swappable slots:
          {mySwappables.length===0 && <div style={{color:'orange'}}>You have no SWAPPABLE slots. Make one from Dashboard.</div>}
          {mySwappables.map(m=> <button key={m.id} onClick={()=>requestSwap(s.id, m.id)} style={{marginLeft:6}}>
            Offer: {m.title}
          </button>)}
        </div>
      </li>)}
    </ul>
    <div style={{color:'red'}}>{err}</div>
  </div>;
}
