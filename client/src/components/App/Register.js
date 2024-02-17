import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const Register = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      console.log(data);
      // handle success response from the server, if needed
    } catch (error) {
      console.error('Error:', error.message);
      // handle error response from the server, if needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField type="text" name="username" label="Username" value={formData.username} onChange={handleChange} required fullWidth />
      <TextField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth />
      <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth />
      <TextField type="text" name="full_name" label="Full Name" value={formData.full_name} onChange={handleChange} fullWidth />
      <TextField type="text" name="university_name" label="University Name" value={formData.university_name} onChange={handleChange} fullWidth />
      <TextField type="text" name="program_of_study" label="Program of Study" value={formData.program_of_study} onChange={handleChange} fullWidth />
      <TextField type="number" name="age" label="Age" value={formData.age} onChange={handleChange} fullWidth />
      <TextField name="bio" label="Bio" value={formData.bio} onChange={handleChange} multiline fullWidth />
      <Button type="submit" variant="contained" color="primary">Register</Button>
    </form>
  );
};

export default Register;
