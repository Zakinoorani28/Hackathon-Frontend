// src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import necessary routing components
import LandingPage from './pages/Landingpage';
import Dashboard from './components/Dashboard'; // Import the Dashboard

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
      <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
    </Routes>
  );
}

export default App;
