import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'ec2-3-137-65-169.us-east-2.compute.amazonaws.com',
  user: 'twliew',
  password: 'MSCI342',
  database: 'twliew'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL Database');
});

// Register Route
app.post('/api/register', (req, res) => {
  const userData = req.body;
  const sql = 'INSERT INTO twliew.user SET ?';

  db.query(sql, userData, (err, result) => {
    if (err) {
      res.status(400).json({ success: false, message: 'Failed to register user' });
      throw err;
    }
    res.status(200).json({ success: true, message: 'User registered successfully' });
  });
});

// Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM twliew.user WHERE username = ? AND password = ?';
  const values = [username, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Internal server error' });
      throw err;
    }

    if (result.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    } else {
      // Assuming result contains the user's information
      const user = result[0];
      
      // Attach user information to req.user
      req.user = user;
      
      res.status(200).json({ success: true, message: 'Login successful', username });
    }
  });
});

// Profile Route
app.get('/api/profile/:username', (req, res) => {
  const username = req.params.username;

  // Query the database to fetch the user's profile data based on the username
  const sql = 'SELECT * FROM twliew.user WHERE username = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Error fetching profile data:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'User profile not found' });
    }

    const userProfile = result[0];
    return res.status(200).json({ success: true, userProfile });
  });
});

// Profile Update Route
app.put('/api/profile/:username', (req, res) => {
  const username = req.params.username;
  const updatedProfileData = req.body;

  // Update the user's profile data in the database
  const sql = 'UPDATE twliew.user SET ? WHERE username = ?';

  db.query(sql, [updatedProfileData, username], (err, result) => {
      if (err) {
          console.error('Error updating profile data:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: 'Profile data updated successfully' });
  });
});



// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
