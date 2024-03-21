import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const Login = ({ onLogin }) => { // Pass onLogin function as a prop
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => { // Update form data when input changes
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => { // Handle login form submission
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const { token, username } = await response.json(); // Get token and username from response
            localStorage.setItem('token', token); // Store token in local storage
            localStorage.setItem('username', username); // Store username in local storage
            onLogin();

        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = (e) => { // Handle form submission
        e.preventDefault();
        handleLogin();
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name="username" label="Username" value={formData.username} onChange={handleChange} required fullWidth />
                <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </div>
    );
};

export default Login;
