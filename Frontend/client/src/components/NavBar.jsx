
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logo}>
        <img src="/quickshow-logo.jpg" alt="QuickShow Logo" style={styles.logoImage} />
        <span style={styles.logoText}>QuickShow</span>
      </div>

      {/* Auth Buttons */}
      <div style={styles.authButtons}>
        <button style={styles.navButton} onClick={() => navigate("/login")}>Login</button>
        <button style={styles.navButton} onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem"
  },
  logoImage: {
    height: "40px",
    borderRadius: "8px"
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#d32f2f",
    fontFamily: "'Segoe UI', sans-serif"
  },
  authButtons: {
    display: "flex",
    gap: "1rem"
  },
  navButton: {
    backgroundColor: "#ff3d00",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontFamily: "'Segoe UI', sans-serif"
  }
};

export default NavBar;

