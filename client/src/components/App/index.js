import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from '../HomePage';
import Profile from '../Profile';
import People from '../People';
import Matches from '../Matches';
import Register from '../Register';
import Login from '../Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuth();
  }, []);

  const checkAuth = () => {
    axios.get('http://localhost:5000/check-auth')
      .then(response => {
        setIsAuthenticated(response.data.isAuthenticated);
        setLoading(false);
      })
      .catch(error => {
        console.error('Authentication check failed:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/people" element={isAuthenticated ? <People /> : <Navigate to="/login" />} />
        <Route path="/matches" element={isAuthenticated ? <Matches /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
