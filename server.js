import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

const db = mysql.createConnection({
  host: 'ec2-3-137-65-169.us-east-2.compute.amazonaws.com',
  user: 'twliew',
  password: 'MSCI342',
  database: 'twliew'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL Database');
});

// Register Route
app.post('/api/register', (req, res) => {
  const userData = req.body;

const userDataWithoutConfirm = { ...userData };
delete userDataWithoutConfirm.confirmEmail;

// If all validations pass, proceed with user registration
const sql = 'INSERT INTO twliew.user SET ?';
db.query(sql, userDataWithoutConfirm, (err, result) => {
  if (err) {
    return res.status(400).send('Failed to register user');
  }
  res.status(200).send('User registered successfully');
});

  // Check if username already exists
  const checkUsernameQuery = 'SELECT * FROM twliew.user WHERE username = ?';
  db.query(checkUsernameQuery, [userData.username], (err, usernameResults) => {
    if (err) {
      res.status(500).send('Internal server error');
      throw err;
    }

    if (usernameResults.length > 0) {
      res.status(400).send('Username already exists');
    } else {
      // Check if email already exists
      const checkEmailQuery = 'SELECT * FROM twliew.user WHERE email = ?';
      db.query(checkEmailQuery, [userData.email], (err, emailResults) => {
        if (err) {
          res.status(500).send('Internal server error');
          throw err;
        }

        if (emailResults.length > 0) {
          res.status(400).send('Email already exists');
        } else if (!isUniversityEmail(userData.email)) {
          res.status(400).send('Only university email addresses with valid university domains are allowed');
        } else {
          // Implement password strength criteria validation
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
          if (!passwordRegex.test(userData.password)) {
            return res.status(400).send('Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character');
          }

          // If all validations pass, proceed with user registration
          const sql = 'INSERT INTO twliew.user SET ?';
          db.query(sql, userData, (err, result) => {
            if (err) {
              res.status(400).send('Failed to register user');
              throw err;
            }
            res.status(200).send('User registered successfully');
          });
        }
      });
    }
  });
});

// Check if email is from an accepted university domain
const isUniversityEmail = (email) => {
  const universityDomains = ['uwaterloo.ca', 'mail.utoronto.ca', 'mcmaster.ca', 'wlu.ca'];
  const domain = email.split('@')[1];
  return universityDomains.includes(domain);
};


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

// Get all hobbies
app.get('/api/hobbies', (req, res) => {
  const getHobbiesQuery = 'SELECT * FROM twliew.hobbies';
  db.query(getHobbiesQuery, (err, results) => {
    if (err) {
      console.error('Error fetching hobbies:', err);
      return res.status(500).send('Internal server error');
    }
    res.status(200).json({ hobbies: results });
  });
});

// Update user hobbies
app.put('/api/profile/:username/hobbies', (req, res) => {
  const { username } = req.params;
  const { interests } = req.body;

  // Retrieve user ID based on username
  const getUserIdQuery = 'SELECT id FROM twliew.user WHERE username = ?';
  db.query(getUserIdQuery, [username], (err, results) => {
    if (err) {
      res.status(500).send('Internal server error');
      throw err;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
    } else {
      const userId = results[0].id;

      // Delete existing user hobbies
      const deleteQuery = 'DELETE FROM twliew.user_hobbies WHERE user_id = ?';
      db.query(deleteQuery, [userId], (err) => {
        if (err) {
          res.status(500).send('Internal server error');
          throw err;
        }

        // Insert new user hobbies
        const insertQuery = 'INSERT INTO twliew.user_hobbies (user_id, hobby_id) VALUES ?';
        const values = interests.map((hobbyId) => [userId, hobbyId]);
        db.query(insertQuery, [values], (err) => {
          if (err) {
            res.status(500).send('Internal server error');
            throw err;
          }
          res.status(200).send('User hobbies updated successfully');
        });
      });
    }
  });
});

// Get selected interests for a user
app.get('/api/profile/:username/interests', (req, res) => {
  const username = req.params.username;

  // Query the database to fetch the user's selected interests based on the username
  const sql = `
      SELECT h.id, h.hobby_name 
      FROM twliew.hobbies AS h
      JOIN twliew.user_hobbies AS uh ON h.id = uh.hobby_id
      JOIN twliew.user AS u ON u.id = uh.user_id
      WHERE u.username = ?;
  `;

  db.query(sql, [username], (err, results) => {
      if (err) {
          console.error('Error fetching selected interests:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      return res.status(200).json({ success: true, selectedInterests: results });
  });
});

// POST request to create a new hobby
app.post('/api/hobbies', (req, res) => {
  const { hobbyName } = req.body;

  // Check if the hobby name is provided
  if (!hobbyName) {
      return res.status(400).json({ success: false, message: 'Hobby name is required' });
  }

  // Check if the hobby already exists
  const sqlCheckExistingHobby = 'SELECT id FROM hobbies WHERE hobby_name = ?';
  db.query(sqlCheckExistingHobby, [hobbyName], (err, results) => {
      if (err) {
          console.error('Error checking existing hobby:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length > 0) {
          return res.status(400).json({ success: false, message: 'Hobby already exists' });
      }

      // Insert the new hobby into the database
      const sqlInsertHobby = 'INSERT INTO hobbies (hobby_name) VALUES (?)';
      db.query(sqlInsertHobby, [hobbyName], (err, results) => {
          if (err) {
              console.error('Error inserting new hobby:', err);
              return res.status(500).json({ success: false, message: 'Internal server error' });
          }

          return res.status(201).json({ success: true, message: 'Hobby created successfully' });
      });
  });
});

// POST request to add social media information for a user
app.post('/api/profile/:username/social-media', (req, res) => {
  const { username } = req.params;
  const { platform_name, sm_username, url, visibility } = req.body;

  // Retrieve user ID based on username
  const getUserIdQuery = 'SELECT id FROM twliew.user WHERE username = ?';
  db.query(getUserIdQuery, [username], (err, results) => {
      if (err) {
          console.error('Error fetching user id:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }
      
      if (results.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      const userId = results[0].id;

      // Fetch the count of existing social media profiles for the user
      const getSocialMediaCountQuery = 'SELECT COUNT(*) AS count FROM twliew.social_media WHERE user_id = ?';
      db.query(getSocialMediaCountQuery, [userId], (err, countResults) => {
          if (err) {
              console.error('Error fetching social media count:', err);
              return res.status(500).json({ success: false, message: 'Internal server error' });
          }
          
          const entryNumber = countResults[0].count + 1; // Assign the next entry number
          
          // Insert the new social media information into the database
          const sqlInsertSocialMedia = 'INSERT INTO twliew.social_media (user_id, platform_name, sm_username, url, visibility, entry_number) VALUES (?, ?, ?, ?, ?, ?)';
          db.query(sqlInsertSocialMedia, [userId, platform_name, sm_username, url, visibility, entryNumber], (err, results) => {
              if (err) {
                  console.error('Error inserting new social media:', err);
                  return res.status(500).json({ success: false, message: 'Internal server error' });
              }

              return res.status(201).json({ success: true, message: 'Social media added successfully' });
          });
      });
  });
});

// PUT request to update social media information for a user based on user_id and entry_number
app.put('/api/profile/:username/social-media/:entryNumber', (req, res) => {
  const { username, entryNumber } = req.params;
  const socialMedia = req.body;

  const sqlGetUserId = 'SELECT id FROM user WHERE username = ?';
  db.query(sqlGetUserId, [username], (err, results) => {
      if (err) {
          console.error('Error fetching user id:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      const user_id = results[0].id;

      const sqlUpdateSocialMedia = 'UPDATE social_media SET platform_name = ?, sm_username = ?, url = ?, visibility = ? WHERE user_id = ? AND entry_number = ?';
      db.query(sqlUpdateSocialMedia, [socialMedia.platform_name, socialMedia.sm_username, socialMedia.url, socialMedia.visibility, user_id, entryNumber], (err, results) => {
          if (err) {
              console.error('Error updating social media:', err);
              return res.status(500).json({ success: false, message: 'Internal server error' });
          }

          if (results.affectedRows === 0) {
              return res.status(404).json({ success: false, message: 'Social media entry not found' });
          }

          return res.status(200).json({ success: true, message: 'Social media updated successfully' });
      });
  });
});

// GET request to fetch social media information for a user
app.get('/api/profile/:username/social-media', (req, res) => {
  const { username } = req.params;

  // Fetch social media information from the database
  const sqlFetchSocialMedia = 'SELECT platform_name, sm_username, url, visibility FROM twliew.social_media WHERE user_id = (SELECT id FROM twliew.user WHERE username = ?)';
  db.query(sqlFetchSocialMedia, [username], (err, results) => {
      if (err) {
          console.error('Error fetching social media:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      return res.status(200).json({ success: true, socialMedia: results });
  });
});

// DELETE endpoint for deleting a specific social media entry
app.delete('/api/profile/:username/social-media/:entryNumber', (req, res) => {
  const username = req.params.username;
  const entryNumber = req.params.entryNumber;

  // Assuming you have a database table named 'social_media' where social media entries are stored
  const deleteSocialMediaQuery = 'DELETE FROM social_media WHERE user_id = (SELECT id FROM user WHERE username = ?) AND entry_number = ?';
  const updateEntryNumbersQuery = 'UPDATE social_media SET entry_number = entry_number - 1 WHERE user_id = (SELECT id FROM user WHERE username = ?) AND entry_number > ?';
  
  db.query(deleteSocialMediaQuery, [username, entryNumber], (err, results) => {
      if (err) {
          console.error('Error deleting social media entry:', err);
          return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Social media entry not found' });
      }

      // Update entry numbers after deletion
      db.query(updateEntryNumbersQuery, [username, entryNumber], (updateErr, updateResults) => {
          if (updateErr) {
              console.error('Error updating entry numbers:', updateErr);
              // Handle error updating entry numbers (rollback deletion?)
          }

          return res.sendStatus(204); // Send a successful response with status code 204 (No Content)
      });
  });
});


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
