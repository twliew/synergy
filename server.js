import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import mysql from 'mysql';
import config from './config'; // Assuming config.js is in the same directory

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection(config); // Use the configuration from config.js

connection.connect();

// Register route
app.post('/register', (req, res) => {
    // Extract user details from request body
    const { username, email, password, full_name, university_name, program_of_study, age, bio } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Construct user object
    const newUser = {
        username,
        email,
        password: hashedPassword,
        full_name,
        university_name,
        program_of_study,
        age,
        bio
    };

    // Insert user into the twliew.user table
    connection.query('INSERT INTO twliew.user SET ?', newUser, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to register user.' });
        }
        res.status(201).json({ success: true, message: 'User registered successfully' });
    });
});

// Login route
app.post('/login', (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Query the twliew.user table to find the user with the provided email
    connection.query('SELECT * FROM twliew.user WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }

        // Check if a user with the provided email exists
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Compare the provided password with the hashed password from the database
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Authentication successful
        res.json({ success: true, message: 'Login successful', user });
    });
});
// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
