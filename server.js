import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import cors from 'cors'; // Import cors module
import config from './config'; // Assuming config.js is in the same directory

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const connection = mysql.createConnection(config); // Use the configuration from config.js

connection.connect();

// Register route
app.post('/register', (req, res) => {
    const {
        username,
        email,
        password,
        full_name,
        university_name,
        program_of_study,
        age,
        bio
    } = req.body;

    // Hash password
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

    // Insert user into database
    connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to register user.' });
        }
        res.status(201).json({ success: true, message: 'User registered successfully' });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ userId: user.id }, 'your_secret_key');
                res.json({ success: true, token });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ success: false, message: 'User not found' });
        }
    });
});

const port = process.env.PORT || 3000;

// Listen on the specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
