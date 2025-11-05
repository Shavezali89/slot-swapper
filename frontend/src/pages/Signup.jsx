import React, { useState } from 'react';
import { api } from '../api';

export default function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      const r = await api('/auth/signup', { method: 'POST', body: { name, email, password } });
      onSignup(r.token);
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Join SlotSwapper in seconds</p>
        <form onSubmit={submit} style={styles.form}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            style={styles.input}
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email address"
            style={styles.input}
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
          {err && <div style={styles.error}>{err}</div>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  card: {
    background: '#fff',
    padding: '40px 35px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    width: '320px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '10px',
    fontSize: '24px',
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    fontSize: '14px',
  },
  button: {
    padding: '10px',
    background: '#43e97b',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '13px',
  },
};
