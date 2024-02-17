import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; // Import Link from react-router-dom
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
                {/* Navigation bar */}
                {isLoggedIn && (
                    <nav>
                        <button onClick={handleLogout}>Logout</button>
                        <ul>
                            {/* Use Link components instead of anchor tags */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Profile">Profile</Link></li>
                            <li><Link to="/People">People</Link></li>
                            <li><Link to="/Matches">Matches</Link></li>
                        </ul>
                    </nav>
                )}

                {/* Login/register links */}
                {!isLoggedIn && (
                    <nav>
                        <ul>
                            <li><Link to="/Register">Register</Link></li>
                            <li><Link to="/Login">Login</Link></li>
                        </ul>
                    </nav>
                )}

                {/* Routes */}
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/People" element={<People />} />
                            <Route path="/Matches" element={<Matches />} />
                        </>
                    ) : (
                        <>
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/*" element={<Navigate to="/Login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
