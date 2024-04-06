import React, { useState } from 'react';
import Firebase from '../Firebase';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [university_name, setUniversityName] = useState('');
  const [program_of_study, setProgramOfStudy] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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
    }
    if (!data.confirmEmail.trim()) {
      errors.confirmEmail = 'Please confirm your email';
    } else if (data.email !== data.confirmEmail) {
      errors.confirmEmail = 'Emails do not match';
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

  const isUniversityEmail = (email) => {
    const universityDomains = ['uwaterloo.ca', 'mail.utoronto.ca', 'mcmaster.ca', 'wlu.ca'];
    const domain = email.split('@')[1];
    return universityDomains.includes(domain);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({ ...formErrors, [name]: '' });
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'confirmEmail': // Added case for confirm email
        setConfirmEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'full_name':
        setFullName(value);
        break;
      case 'university_name':
        setUniversityName(value);
        break;
      case 'program_of_study':
        setProgramOfStudy(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'bio':
        setBio(value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = { username, email, confirmEmail, password, full_name, university_name, program_of_study, age, bio };
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      try {
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
            bio: bio,
          })
        });

        if (!response.ok) {
          throw new Error('Error registering user');
        }

      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Container maxWidth="md" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleRegister}>
        <div>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.username && <Typography variant="body2">{formErrors.username}</Typography>}
        </div>
        <div>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.email && <Typography variant="body2">{formErrors.email}</Typography>}
        </div>
        <div>
          <TextField
            label="Confirm Email"
            type="email"
            name="confirmEmail"
            value={confirmEmail}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.confirmEmail && <Typography variant="body2">{formErrors.confirmEmail}</Typography>}
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.password && <Typography variant="body2">{formErrors.password}</Typography>}
        </div>
        <div>
          <TextField
            label="Full Name"
            type="text"
            name="full_name"
            value={full_name}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.full_name && <Typography variant="body2">{formErrors.full_name}</Typography>}
        </div>
        <div>
          <TextField
            label="University Name"
            type="text"
            name="university_name"
            value={university_name}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.university_name && <Typography variant="body2">{formErrors.university_name}</Typography>}
        </div>
        <div>
          <TextField
            label="Program of Study"
            type="text"
            name="program_of_study"
            value={program_of_study}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.program_of_study && <Typography variant="body2">{formErrors.program_of_study}</Typography>}
        </div>
        <div>
          <TextField
            label="Age"
            type="number"
            name="age"
            value={age}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.age && <Typography variant="body2">{formErrors.age}</Typography>}
        </div>
        <div>
          <TextField
            label="Bio"
            multiline
            rows={4}
            name="bio"
            value={bio}
            onChange={handleInputChange}
            required fullWidth
          />
          {formErrors.bio && <Typography variant="body2">{formErrors.bio}</Typography>}
        </div>
        <Button type="submit" variant="contained" color="primary">Register</Button>
        {error && <Typography variant="body2">{error}</Typography>}
      </form>
      </Container>
      </ThemeProvider>
    </div>
  );
};


export default Register;