import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import HomePage from '../HomePage';
import Profile from '../Profile';
import People from '../People';
import Matches from '../Matches';
import Register from './Register';
import Login from './Login';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {/* Conditional rendering for navigation links */}
                        {isLoggedIn && (
                            <>
                                {/* Home Link */}
                                <Typography variant="h6" component="div">
                                    <Link id="Home" to="/Home" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>Home</Link>
                                </Typography>
                                {/* Profile Link */}
                                <Typography variant="h6" component="div">
                                    <Link id="Profile" to="/Profile" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>Profile</Link>
                                </Typography>
                                {/* People Link */}
                                <Typography variant="h6" component="div">
                                    <Link id="People" to="/People" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>People</Link>
                                </Typography>
                                {/* Matches Link */}
                                <Typography variant="h6" component="div">
                                    <Link id="Matches" to="/Matches" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>Matches</Link>
                                </Typography>
                            </>
                        )}
                        {/* Conditional rendering for logout button when logged in */}
                        {isLoggedIn ? (
                            <Box sx={{ marginLeft: 'auto' }}>
                                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            </Box>
                        ) : (
                            <>
                                {/* Render Register and Login links only when logged out */}
                                <Button color="inherit"><Link to="/Register" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>Register</Link></Button>
                                <Button color="inherit"><Link to="/Login" style={{ color: 'inherit', textDecoration: 'none', marginRight: '20px' }}>Login</Link></Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>

                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/Home" element={<HomePage />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/People" element={<People />} />
                            <Route path="/Matches" element={<Matches />} />
                        </>
                    ) : (
                        <>
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/*" element={<Navigate to="/Home" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
