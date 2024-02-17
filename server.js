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

// Root Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
