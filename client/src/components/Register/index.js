import React, { useState } from 'react';
import axios from 'axios';

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
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Client-side form validation
    if (!formData.username || !formData.email || !formData.password || !formData.full_name) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data);
      // Provide feedback to the user
      alert('Registration successful!');
      // Clear form after successful registration
      setFormData({
        username: '',
        email: '',
        password: '',
        full_name: '',
        university_name: '',
        program_of_study: '',
        age: '',
        bio: ''
      });
    } catch (error) {
      console.error(error);
      // Handle server-side errors
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Full Name" />
        <input type="text" name="university_name" value={formData.university_name} onChange={handleChange} placeholder="University Name" />
        <input type="text" name="program_of_study" value={formData.program_of_study} onChange={handleChange} placeholder="Program of Study" />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"></textarea>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
