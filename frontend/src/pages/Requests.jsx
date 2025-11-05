import React, {useEffect, useState} from 'react';
import { api } from '../api';

export default function Requests(){
  const [incoming,setIncoming]=useState([]);
  const [outgoing,setOutgoing]=useState([]);
  const [err,setErr]=useState('');
  async function load(){
    try{
      const r = await api('/requests');
      setIncoming(r.incoming);
      setOutgoing(r.outgoing);
    }catch(e){ setErr(e.message); }
  }
  useEffect(()=>load(),[]);
  async function respond(id, accept){
    try{
      await api('/swap-response/'+id, { method: 'POST', body: { accept }});
      load();
    }catch(e){ setErr(e.message); }
  }
  return <div style={{marginTop:20}}>
    <h3>Incoming Requests</h3>
    <ul>{incoming.map(req=> <li key={req.id}>
      From user: {req.requesterId} — {req.mySlot?.title} ↔ {req.theirSlot?.title} — {req.status}
      {req.status==='PENDING' && <>
        <button onClick={()=>respond(req.id, true)}>Accept</button>
        <button onClick={()=>respond(req.id, false)}>Reject</button>
      </>}
    </li>)}</ul>

    <h3>Outgoing Requests</h3>
    <ul>{outgoing.map(req=> <li key={req.id}>
      To user: {req.responderId} — {req.mySlot?.title} ↔ {req.theirSlot?.title} — {req.status}
    </li>)}</ul>

    <div style={{color:'red'}}>{err}</div>
  </div>;
}
