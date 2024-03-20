import React, { useState } from 'react';
import Firebase from '../Firebase';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [university_name, setUniversityName] = useState('');
  const [program_of_study, setProgramOfStudy] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if the password meets your requirements (e.g., length)
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      const firebase = new Firebase();
      const firebaseUser = await firebase.doCreateUserWithEmailAndPassword(email, password);

      // Register user in your backend
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          username: username,
          email: email,
          password: password,
          full_name: full_name,
          university_name: university_name,
          program_of_study: program_of_study,
          age: age,
          bio: bio
        })
      });

      if (!response.ok) {
        throw new Error('Error registering user');
      }

      // Registration successful, you may redirect the user or show a success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>University Name:</label>
          <input
            type="text"
            value={university_name}
            onChange={(e) => setUniversityName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Program of Study:</label>
          <input
            type="text"
            value={program_of_study}
            onChange={(e) => setProgramOfStudy(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;


/* import React, { useState } from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Firebase from '../Firebase';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    full_name: '',
    university_name: '',
    program_of_study: '',
    age: '',
    bio: '',
    availability: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmEmail, password, ...userDataWithoutConfirm } = formData;
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Register user with Firebase
        const { email, password } = formData;
        const userCredential = await Firebase.doCreateUserWithEmailAndPassword(email, password);

        // Get Firebase UID
        const uid = userCredential.uid;

        // Send other form data to MySQL
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...userDataWithoutConfirm, id: uid })
        });

        if (!response.ok) {
          throw new Error('Failed to register user');
        }

        console.log('User registered successfully');
      } catch (error) {
        console.error('Error:', error.message);
        setErrors({ submit: error.message });
      }
    } else {
      setErrors(validationErrors);
    }
  };
  

  const validateForm = (data) => { // Validate form data
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
    if (typeof data.availability !== 'string' || !data.availability.trim()) {
      //error handling for availability
      errors.availability = 'Availability is required';
  }
    return errors;
  };

  const isUniversityEmail = (email) => { // Check if email is from a university domain
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
        <FormControl fullWidth>
          <InputLabel id="availability-label">Availability</InputLabel>
          <Select
            labelId="availability-label"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <MenuItem value={1}>Available</MenuItem>
            <MenuItem value={0}>Unavailable</MenuItem>
          </Select>
        </FormControl>
        {errors.submit && <Typography color="error">{errors.submit}</Typography>}
        <Button type="submit" variant="contained" color="primary">Register</Button>
      </form>
    </div>
  );
};

export default Register;

 */