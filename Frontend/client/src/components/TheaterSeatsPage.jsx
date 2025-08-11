import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const TheaterSeatsPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [theaterName, setTheaterName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState("");

  const userId = location.state?.userId;
  const userName = location.state?.userName;

  useEffect(() => {
    const fetchTheaterName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/show/theaterByShow/${showId}`);
        setTheaterName(response.data.name);
      } catch (err) {
        console.error("Error fetching theater name:", err);
        setError("Failed to load theater name.");
      }
    };

    fetchTheaterName();
  }, [showId]);

  const rows = "ABCDEFGHIJKL".split("");
  const cols = Array.from({ length: 9 }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getOrderId = async (amount) => {
    const response = await axios.get(`http://localhost:8080/payment/createOrderId/${amount}`);
    return response.data;
  };

  const triggerPayment = async (amount) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const orderId = await getOrderId(amount);

    const options = {
      key: "rzp_test_HuZOl6727Ym83q",
      amount: amount * 100,
      currency: "INR",
      name: "QuickShow",
      description: "Movie Ticket",
      order_id: orderId,
      handler: async function (response) {
        try {
          await axios.post("http://localhost:8080/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });

          navigate("/success", {
            state: {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              userId,
              userName,
              seats: selectedSeats
            }
          });
        } catch (err) {
          alert("Payment verification failed. Please contact support.");
          console.error("Verification error:", err);
        }
      },
      prefill: {
        name: userName,
        email: "test@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#1976d2"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleConfirmBooking = async () => {
    try {
      await axios.post("http://localhost:8080/booking/bookSeats", {
        showId,
        seatNumbers: selectedSeats
      });

      const ticketAmount = selectedSeats.length * 250;
      await triggerPayment(ticketAmount);
    } catch (err) {
      console.error("Booking error:", err);
      setError("Booking failed. Try again.");
    }
  };

  const handleBackToMovies = () => {
    navigate("/movies", {
      state: { userId, userName }
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.header}>🎭 Theater: {theaterName}</h2>
        <h3 style={styles.subHeader}>Welcome, {userName} 👋</h3>
        <h3 style={styles.subHeader}>Select your seat</h3>

        <div style={styles.seatGrid}>
          {rows.map((row) => (
            <div key={row} style={styles.row}>
              {cols.map((col) => {
                const seat = `${row}${col}`;
                return (
                  <button
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    style={{
                      ...styles.seat,
                      backgroundColor: selectedSeats.includes(seat) ? "#1976d2" : "#f5f5f5",
                      color: selectedSeats.includes(seat) ? "#fff" : "#333"
                    }}
                  >
                    {seat}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div style={styles.screenLabel}>SCREEN SIDE</div>

        {selectedSeats.length > 0 && (
          <div style={styles.selectionBox}>
            <p>Selected Seats: {selectedSeats.join(", ")}</p>
            <button onClick={handleConfirmBooking} style={styles.confirmButton}>
              Confirm Booking & Pay ₹{selectedSeats.length * 250}
            </button>
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.navBox}>
          <button onClick={handleBackToMovies} style={styles.backButton}>
            ⬅ Back to Movies
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    padding: "2rem"
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  header: {
    textAlign: "center",
    color: "#d32f2f",
    fontWeight: "bold",
    marginBottom: "1rem"
  },
  subHeader: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "1rem",
    color: "#555"
  },
  seatGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    alignItems: "center",
    flexWrap: "wrap"
  },
  row: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  seat: {
    padding: "0.6rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    minWidth: "45px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease"
  },
  screenLabel: {
    textAlign: "center",
    marginTop: "2rem",
    borderTop: "4px solid #1976d2",
    borderRadius: "50%/100px",
    paddingTop: "0.5rem",
    color: "#1976d2",
    fontWeight: "bold"
  },
  selectionBox: {
    marginTop: "2rem",
    textAlign: "center"
  },
  confirmButton: {
    marginTop: "1rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem"
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "1rem"
  },
  navBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem"
  },
  backButton: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#f5f5f5",
    color: "#1976d2",
    border: "1px solid #1976d2",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default TheaterSeatsPage;

