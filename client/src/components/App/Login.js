import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = ({ onLogin }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const theme = createTheme({
        palette: {
          primary: {
            main: '#7487cc',
            light: '#e0c8d2',
            background: '#eeeeee'
          },
          secondary: {
            main: '#c5ceed',
          },
        },
      });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const auth = getAuth(); // Get Firebase authentication instance
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password); // Sign in with email and password

            // If sign-in is successful
            if (userCredential.user) {
                const idToken = await userCredential.user.getIdToken(); // Retrieve ID token
                localStorage.setItem('token', idToken); // Store ID token in local storage

                const email = formData.email;
                const response = await fetch(`/api/getUsername?email=${encodeURIComponent(email)}`);
                const data = await response.json();
                
                if (data.username) {
                    localStorage.setItem('username', data.username); // Store fetched username in local storage
                    onLogin();
                    navigate('/home'); // Navigate to /home on successful login
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
            <ThemeProvider theme={theme}>
                <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth />
                        <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                    </form>
                </Container>
            </ThemeProvider>
        </div>
    );
};

export default Login;
