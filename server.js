import express from 'express';
import bodyParser from 'body-parser';
// import bcrypt from 'bcrypt';
import cors from 'cors';
import mysql from 'mysql';
// import { configuration } from './config';

const config = {
    host    : 'ec2-3-137-65-169.us-east-2.compute.amazonaws.com',
    user    : 'twliew',
    password: 'MSCI342',
    database: 'twliew'
  };
  
  

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection(config); // Use the configuration from config.js

connection.connect();

app.get('/', (req, res) => {
    res.send('Hello, World!');
}
);

// Register route
app.post('/api/register', (req, res) => {
    // Extract user details from request body
    console.log(req.body);
    const { username, email, password, full_name, university_name, program_of_study, age, bio } = req.body;

    // Hash the password
    // const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("I am here");

    // Construct user object
    const newUser = {
        username,
        email,
        password: password,
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
