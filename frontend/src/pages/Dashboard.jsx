import React, {useEffect, useState} from 'react';
import { api } from '../api';

export default function Dashboard(){
  const [events,setEvents]=useState([]);
  const [form,setForm]=useState({title:'',startTime:'',endTime:''});
  const [err,setErr]=useState('');
  async function load(){
    try{ const ev = await api('/events'); setEvents(ev); } catch(e){ setErr(e.message); }
  }
  useEffect(()=>{ load(); },[]);
  async function create(e){
    e.preventDefault();
    try{
      await api('/events',{method:'POST', body:form});
      setForm({title:'',startTime:'',endTime:''});
      load();
    }catch(err){ setErr(err.message); }
  }
  async function makeSwappable(id){
    await api('/events/'+id,{method:'PATCH', body:{status:'SWAPPABLE'}});
    load();
  }
  return <div>
    <h3>My Events</h3>
    <form onSubmit={create}>
      <input placeholder="title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><br/>
      <input placeholder="startTime (ISO)" value={form.startTime} onChange={e=>setForm({...form,startTime:e.target.value})}/><br/>
      <input placeholder="endTime (ISO)" value={form.endTime} onChange={e=>setForm({...form,endTime:e.target.value})}/><br/>
      <button type="submit">Create</button>
    </form>
    <ul>
      {events.map(ev=> <li key={ev.id}>
        <b>{ev.title}</b> ({new Date(ev.startTime).toLocaleString()} - {new Date(ev.endTime).toLocaleString()}) [{ev.status}]
        {ev.status==='BUSY' && <button onClick={()=>makeSwappable(ev.id)}>Make Swappable</button>}
      </li>)}
    </ul>
    <div style={{color:'red'}}>{err}</div>
  </div>;
}
