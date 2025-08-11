import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Button,
} from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;
  const userName = location.state?.userName;

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/movie/${movieId}`)
      .then(res => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Movie not found or failed to load.');
        setLoading(false);
      });
  }, [movieId]);

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.page}>
        <Container maxWidth="sm">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.page}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom sx={styles.header}>
           Movie Details for {userName || 'Guest'}
        </Typography>

        <Card elevation={4} sx={styles.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={styles.movieTitle}>
              {movie.movieName}
            </Typography>
            {/* <Typography variant="body1">🎭 Genre: {movie.genre}</Typography>
            <Typography variant="body1">🗣 Language: {movie.language}</Typography>
            <Typography variant="body1">⏱ Duration: {movie.duration} mins</Typography>
            <Typography variant="body1">⭐ Rating: {movie.rating}</Typography>
            <Typography variant="body1">📅 Release: {movie.releaseDate}</Typography> */}


            <Typography variant="body1"> Genre: {movie.genre}</Typography>
            <Typography variant="body1"> Language: {movie.language}</Typography>
            <Typography variant="body1"> Duration: {movie.duration} mins</Typography>
            <Typography variant="body1"> Rating: {movie.rating}</Typography>
            <Typography variant="body1"> Release: {movie.releaseDate}</Typography>


          </CardContent>
        </Card>

        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            ⬅ Back to Movies
          </Button>

          <Button
            variant="contained"
            sx={styles.bookButton}
            onClick={() =>
              navigate(`/book/${movieId}`, {
                state: { userId, userName, movieName: movie.movieName },
              })
            }
          >
             Book Ticket
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  page: {
    backgroundColor: '#e3f2fd',
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
    padding: '2rem 0'
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#e3f2fd'
  },
  header: {
    textAlign: 'center',
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: '2rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1.5rem'
  },
  movieTitle: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  bookButton: {
    backgroundColor: '#1976d2',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 'bold'
  }
};

export default MovieDetailsPage;
