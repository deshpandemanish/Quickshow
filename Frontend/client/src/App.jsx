  
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddNewUserForm from './components/AddNewUserForm';
import MoviesPage from './components/MoviesPage';
import MovieDetailsPage from './components/MovieDetailsPage'; 
import BookingPage from './components/BookingPage'; 
import TheaterSeatsPage from './components/TheaterSeatsPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PaymentPage from './components/PaymentPage'; // Razorpay integrated
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<AddNewUserForm />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      <Route path="/book/:movieId" element={<BookingPage />} />
      <Route path="/seats/:showId" element={<TheaterSeatsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/payment" element={<PaymentPage amount={250} />} /> {/* Pass amount dynamically if needed */}
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
}

export default App;
