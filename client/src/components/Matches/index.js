import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function Matches() {
  const [matchedUserProfiles, setMatchedUserProfiles] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchMatchedUserProfiles(username);
  }, [username]);

  const fetchMatchedUserProfiles = async (username) => {
    try {
      const response = await fetch(`/api/matchedUserProfiles/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch matched user profiles');
      }
      const data = await response.json();
      setMatchedUserProfiles(data);
    } catch (error) {
      console.error('Error fetching matched user profiles:', error);
    }
  };

  return (
    <div>
      <h1>Matches</h1>
      <div className="user-cards-container">
        {matchedUserProfiles.map(user => (
          <Card key={user.id} className="user-card" style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Username: {user.username}</Typography>
              <Typography gutterBottom>Email: {user.email}</Typography>
              <Typography gutterBottom>Age: {user.age}</Typography>
              <Typography gutterBottom>Bio: {user.bio}</Typography>
              {user.hobbies && (
                <div style={{ marginTop: '10px' }}>
                  <Typography variant="h6">Hobbies:</Typography>
                  <Typography>{user.hobbies}</Typography>
                </div>
              )}
              {user.social_media && (
                <div style={{ marginTop: '10px' }}>
                  <Typography variant="h6">Social Media:</Typography>
                  <List>
                    {user.social_media.split(', ').map((platform, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={platform} />
                        {index < user.social_media.split(', ').length - 1 && <Divider />}
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Matches;
