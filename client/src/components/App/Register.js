import React, { useState } from 'react';
import Firebase from '../Firebase';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(''); // Added confirm email state
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [university_name, setUniversityName] = useState('');
  const [program_of_study, setProgramOfStudy] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

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
    const formData = { username, email, confirmEmail, password, full_name, university_name, program_of_study, age, bio }; // Include confirmEmail in formData
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
            bio: bio
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            required
          />
          {formErrors.username && <p>{formErrors.username}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <p>{formErrors.email}</p>}
        </div>
        <div>
          <label>Confirm Email:</label> {/* Added Confirm Email field */}
          <input
            type="email"
            name="confirmEmail"
            value={confirmEmail}
            onChange={handleInputChange}
            required
          />
          {formErrors.confirmEmail && <p>{formErrors.confirmEmail}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          {formErrors.password && <p>{formErrors.password}</p>}
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={full_name}
            onChange={handleInputChange}
            required
          />
          {formErrors.full_name && <p>{formErrors.full_name}</p>}
        </div>
        <div>
          <label>University Name:</label>
          <input
            type="text"
            name="university_name"
            value={university_name}
            onChange={handleInputChange}
            required
          />
          {formErrors.university_name && <p>{formErrors.university_name}</p>}
        </div>
        <div>
          <label>Program of Study:</label>
          <input
            type="text"
            name="program_of_study"
            value={program_of_study}
            onChange={handleInputChange}
            required
          />
          {formErrors.program_of_study && <p>{formErrors.program_of_study}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleInputChange}
            required
          />
          {formErrors.age && <p>{formErrors.age}</p>}
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={bio}
            onChange={handleInputChange}
            required
          />
          {formErrors.bio && <p>{formErrors.bio}</p>}
        </div>
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;