import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
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

            const { token, username } = await response.json();
            localStorage.setItem('token', token);
            localStorage.setItem('username', username); // Store username in local storage

            // If login is successful, call the onLogin function passed from App.js
            onLogin();

        } catch (error) {
            console.error('Error:', error.message);
            // Handle login failure, show error message to the user, etc.
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField type="text" name="username" label="Username" value={formData.username} onChange={handleChange} required fullWidth />
            <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
            <Button type="submit" variant="contained" color="primary">Login</Button>
        </form>
    );
};

export default Login;
