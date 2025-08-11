


import React from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();

  if (!state) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No booking data found.</p>;
  }

  const { userName, seats, paymentId, orderId } = state;

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ color: "#388e3c" }}> Booking Confirmed!</h2>
      <p>Thank you, <strong>{userName}</strong> </p>
      <p>Seats Booked: <strong>{seats.join(", ")}</strong></p>
      <p>Payment ID: <code>{paymentId}</code></p>
      <p>Order ID: <code>{orderId}</code></p>
      <p style={{ marginTop: "1rem" }}>Enjoy your movie! </p>
    </div>
  );
};

export default SuccessPage;
