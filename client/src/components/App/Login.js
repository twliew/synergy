import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication methods

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const auth = getAuth(); // Get Firebase authentication instance
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password); // Sign in with email and password

            // If sign-in is successful, fetch username and store it in local storage
            if (userCredential.user) {
                const email = formData.email;
                const response = await fetch(`/api/getUsername?email=${encodeURIComponent(email)}`);
                const data = await response.json();
                
                if (data.username) {
                    localStorage.setItem('username', data.username); // Store fetched username in local storage
                    onLogin();
                } else {
                    throw new Error('Failed to fetch username');
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth />
                <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </div>
    );
};

export default Login;
