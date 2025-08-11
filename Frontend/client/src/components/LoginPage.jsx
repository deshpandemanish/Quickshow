
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack
} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        emailId,
        mobileNo
      });

      const data = response.data;
      console.log("Login response:", data);

      if (typeof data === "object" && data.name) {
        const userName = data.name;

        localStorage.setItem("userName", userName);

        navigate("/movies", {
          state: {
            userName
          }
        });
      } else {
        throw new Error("Invalid login credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: "#d32f2f", fontWeight: "bold" }}>
            🔐 Login to QuickShow
          </Typography>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Mobile Number"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </Box>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outlined" fullWidth onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Stack>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </Paper>
      </Container>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem"
  }
};

export default LoginPage;
