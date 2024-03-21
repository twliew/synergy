import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Firebase from '../Firebase'; // Import Firebase class

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
            const firebase = new Firebase(); // Initialize Firebase instance
            const user = await firebase.doSignInWithEmailAndPassword(formData.email, formData.password); // Use Firebase login method
            
            // If login is successful, call onLogin function and store token and email in local storage
            if (user) {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                if (response.ok) {
                    const { token, email } = await response.json(); // Get token and email from response
                    localStorage.setItem('token', token); // Store token in local storage
                    localStorage.setItem('email', email); // Store email in local storage
                    onLogin(); // Call onLogin function
                } else {
                    throw new Error('Failed to login'); // Throw error if login is unsuccessful
                }
            } else {
                throw new Error('Failed to login');
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
