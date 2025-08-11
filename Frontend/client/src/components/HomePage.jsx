import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import NavBar from "./NavBar";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Decorative Ticket Background */}
      <div style={styles.ticketDecor}>
        <div style={{ ...styles.ticket, ...styles.blueTicketTopLeft }} />
        <div style={{ ...styles.ticket, ...styles.blueTicketBottomLeft }} />
        <div style={{ ...styles.ticket, ...styles.purpleTicketBottomRight }} />
      </div>

      {/* Top Navigation */}
      <NavBar />

      {/* Centered Welcome Section */}
      <div style={styles.centerContent}>
        <h1 style={styles.welcomeTitle}>Welcome to QuickShow</h1>
        <p style={styles.description}>
          Book your <strong>favorite</strong> movie tickets with ease. Select your <strong>show</strong>, choose your <strong>seats</strong>, and enjoy the experience.
        </p>
        <button style={styles.browseButton} onClick={() => navigate("/movies")}>
          <FaFilm style={{ marginRight: "0.5rem" }} />
          Browse Movies
        </button>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e3f2fd", // Light blue background
    color: "#333",
    minHeight: "100vh",
    padding: "0",
    margin: "0",
    position: "relative",
    overflow: "hidden"
  },
  ticketDecor: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none"
  },
  ticket: {
    position: "absolute",
    width: "100px",
    height: "50px",
    borderRadius: "10px",
    opacity: 0.6,
    border: "2px dashed rgba(255,255,255,0.4)"
  },
  blueTicketTopLeft: {
    backgroundColor: "#64b5f6",
    top: "20px",
    left: "20px",
    transform: "rotate(-15deg)"
  },
  blueTicketBottomLeft: {
    backgroundColor: "#64b5f6",
    bottom: "40px",
    left: "30px",
    transform: "rotate(10deg)"
  },
  purpleTicketBottomRight: {
    backgroundColor: "#9575cd",
    bottom: "30px",
    right: "30px",
    transform: "rotate(15deg)"
  },
  centerContent: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "8rem auto"
  },
  welcomeTitle: {
    fontSize: "3rem",
    color: "#d32f2f", // Red title
    fontWeight: "bold",
    marginBottom: "1rem"
  },
  description: {
    fontSize: "1.2rem",
    color: "#000", // Black text
    maxWidth: "600px",
    margin: "0 auto 2rem auto",
    lineHeight: "1.6"
  },
  browseButton: {
    backgroundColor: "#1976d2", // Blue button
    color: "#fff",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif"
  }
};

export default HomePage;
