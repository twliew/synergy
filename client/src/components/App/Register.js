import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '', // Added for confirming email
    password: '',
    full_name: '',
    university_name: '',
    program_of_study: '',
    age: '',
    bio: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmEmail, ...userDataWithoutConfirm } = formData; // Exclude confirmEmail from userData
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, submit data
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userDataWithoutConfirm) //
        });
  
        if (!response.ok) {
          throw new Error('Failed to register user');
        }
  
        // Handle success response from the server, if needed
      } catch (error) {
        console.error('Error:', error.message);
        setErrors({ submit: error.message });
      }
    } else {
      // Form has validation errors, display them
      setErrors(validationErrors);
    }
  };

  // Validation function to check if form fields are filled out
  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    } else if (!isUniversityEmail(data.email)) {
      errors.email = 'Only university email addresses are allowed';
    } else if (data.email !== data.confirmEmail) {
      errors.confirmEmail = 'Emails do not match';
    }
    if (!data.confirmEmail.trim()) {
      errors.confirmEmail = 'Please confirm your email';
    }
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(data.password)) {
      errors.password = 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character';
    }
    if (!data.full_name.trim()) {
      errors.full_name = 'Full Name is required';
    }
    if (!data.university_name.trim()) {
      errors.university_name = 'University Name is required';
    }
    if (!data.program_of_study.trim()) {
      errors.program_of_study = 'Program of Study is required';
    }
    if (!data.age.trim()) {
      errors.age = 'Age is required';
    } else if (isNaN(data.age)) {
      errors.age = 'Age must be a number';
    }
    if (!data.bio.trim()) {
      errors.bio = 'Bio is required';
    }
    return errors;
  };

  // Check if email is from an accepted university domain
  const isUniversityEmail = (email) => {
    const universityDomains = ['uwaterloo.ca', 'mail.utoronto.ca', 'mcmaster.ca', 'wlu.ca'];
    const domain = email.split('@')[1];
    return universityDomains.includes(domain);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField type="text" name="username" label="Username" value={formData.username} onChange={handleChange} required fullWidth error={!!errors.username} helperText={errors.username} />
        <TextField type="email" name="email" label="Email" value={formData.email} onChange={handleChange} required fullWidth error={!!errors.email} helperText={errors.email} />
        <TextField type="email" name="confirmEmail" label="Confirm Email" value={formData.confirmEmail} onChange={handleChange} required fullWidth error={!!errors.confirmEmail} helperText={errors.confirmEmail} />
        <TextField type="password" name="password" label="Password" value={formData.password} onChange={handleChange} required fullWidth error={!!errors.password} helperText={errors.password} />
        <TextField type="text" name="full_name" label="Full Name" value={formData.full_name} onChange={handleChange} fullWidth />
        <TextField type="text" name="university_name" label="University Name" value={formData.university_name} onChange={handleChange} fullWidth />
        <TextField type="text" name="program_of_study" label="Program of Study" value={formData.program_of_study} onChange={handleChange} fullWidth />
        <TextField type="number" name="age" label="Age" value={formData.age} onChange={handleChange} fullWidth />
        <TextField name="bio" label="Bio" value={formData.bio} onChange={handleChange} multiline fullWidth />
        {errors.submit && <Typography color="error">{errors.submit}</Typography>}
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </div>
  );
};

export default Register; 
