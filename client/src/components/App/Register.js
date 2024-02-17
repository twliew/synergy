import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    university_name: '',
    program_of_study: '',
    age: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      const responseData = await response.json();
      if (responseData.success) {
        setSuccess(true);
        // Store session ID securely (e.g., localStorage)
        localStorage.setItem('sessionId', responseData.sessionId);
        // Redirect to a logged-in page or display appropriate message
      } else {
        setError(responseData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error.message);
      setError(error.message);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" />
          <input type="text" name="university_name" value={formData.university_name} onChange={handleChange} placeholder="University Name" />
          <input type="text" name="program_of_study" value={formData.program_of_study} onChange={handleChange} placeholder="Program of Study" />
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
        {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
        {success && <Typography style={{ color: 'green' }}>Registration successful!</Typography>}
      </Grid>
    </Grid>
  );
}

export default Register;
