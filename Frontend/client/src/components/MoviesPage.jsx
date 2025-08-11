
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Alert,
  CardMedia,
  Stack
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  //  Get user info from state or localStorage
  const userId = location.state?.userId || localStorage.getItem("userId");
  const userName = location.state?.userName || localStorage.getItem("userName");

  const imageMap = {
    "The Last Stand": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639868/the_last_stand_tcb2gb.jpg",
    "Laugh Riot": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639862/laugh_riot_umm625.jpg",
    "Life Unfolded": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639862/life_unfolded_ockyre.jpg",
    "Jungle Quest": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639861/jungle_quest_ece4ug.jpg",
    "Night Whispers": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639863/night_whispers_nifzp8.jpg",
    "Dil Ki Baat": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639862/dil_ki_baat_dn9raf.webp",
    "The Braveheart": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639863/the_braveheart_hdb19r.png",
    "Voices of Change": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639868/voices_of_change_np9zye.jpg",
    "Chasing Glory": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639861/chasing_glory_ku7ul2.jpg",
    "Battlefront": "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639861/battlefront_d7kwmf.jpg"
  };

  const defaultImageUrl = "https://res.cloudinary.com/dzoowqxpk/image/upload/v1754639860/default_poster.jpg";

  useEffect(() => {
    axios.get('http://localhost:8080/movie/all')
      .then(res => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load movies. Please try again later.');
        setLoading(false);
      });
  }, []);

  const goToDetails = (movieId) => {
    navigate(`/movie/${movieId}`, {
      state: { userId, userName },
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.page}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={styles.header}>
          🎬 Welcome, {userName || 'Guest'}! Explore Movies
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {movies.slice(0, 10).map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card sx={styles.card}>
                <CardMedia
                  component="img"
                  height="200"
                  image={imageMap[movie.movieName] || defaultImageUrl}
                  alt={movie.movieName}
                  sx={styles.cardMedia}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={styles.movieTitle}>
                    {movie.movieName}
                  </Typography>
                  <Typography variant="body2">🎭 Genre: {movie.genre}</Typography>
                  <Typography variant="body2">🗣 Language: {movie.language}</Typography>
                  <Typography variant="body2">⏱ Duration: {movie.duration} mins</Typography>
                  <Typography variant="body2">⭐ Rating: {movie.rating}</Typography>
                  <Typography variant="body2">📅 Release: {movie.releaseDate}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    fullWidth
                    sx={styles.button}
                    onClick={() => goToDetails(movie.id)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            sx={styles.homeButton}
            onClick={() => navigate('/')}
          >
             Back to Home
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
             Logout
          </Button>
        </Stack>
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
    marginBottom: '1rem'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  cardMedia: {
    objectFit: 'cover',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px'
  },
  movieTitle: {
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  button: {
    backgroundColor: '#1976d2',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 'bold'
  },
  homeButton: {
    borderColor: '#1976d2',
    color: '#1976d2',
    textTransform: 'none',
    fontWeight: 'bold'
  }
};

export default MoviesPage;
