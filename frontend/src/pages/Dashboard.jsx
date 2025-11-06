import React from "react";

export default function Dashboard({ onLogout }) {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>
          Slot<span style={{ color: "#00c6ff" }}>Swapper</span>
        </h1>
        <button style={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* My Events Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>📅 My Events</h2>
          <input style={styles.input} placeholder="Title" />
          <input style={styles.input} placeholder="Start Time (ISO)" />
          <input style={styles.input} placeholder="End Time (ISO)" />
          <button style={styles.createBtn}>Create Event</button>
        </div>

        {/* Marketplace Section */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>🌐 Marketplace</h2>
          <div style={styles.marketBox}>
            <p>Incoming Requests</p>
            <div style={styles.divider}></div>
            <p>Outgoing Requests</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        © {new Date().getFullYear()} SlotSwapper. All rights reserved.
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #00c6ff 100%)",
    fontFamily: "Poppins, sans-serif",
    color: "#333",
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  logoutBtn: {
    background: "white",
    color: "#00c6ff",
    fontWeight: "600",
    border: "none",
    padding: "8px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  content: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    padding: "40px 60px",
  },
  card: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    fontSize: "22px",
    color: "#004aad",
    fontWeight: "600",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px",
    fontSize: "14px",
    outline: "none",
  },
  createBtn: {
    width: "100%",
    padding: "10px",
    background: "#00c6ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  marketBox: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  divider: {
    height: "1px",
    background: "#eee",
    margin: "10px 0",
  },
  footer: {
    textAlign: "center",
    padding: "12px",
    fontSize: "13px",
    color: "#fff",
    background: "rgba(255,255,255,0.1)",
  },
};
