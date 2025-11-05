const API = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api';

export function setToken(t){
  if(t){ localStorage.setItem('ss_token', t); }
  else { localStorage.removeItem('ss_token'); }
}

export function getToken(){ return localStorage.getItem('ss_token'); }

export async function api(path, {method='GET', body, token} = {}){
  const headers = { 'Content-Type': 'application/json' };
  const tok = token || getToken();
  if(tok) headers['Authorization'] = 'Bearer ' + tok;
  const res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json();
  if(!res.ok) throw new Error(json.error || 'API error');
  return json;
}
export default api;
