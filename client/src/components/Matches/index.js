import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Button, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Matches() {
  const [matchedUserProfiles, setMatchedUserProfiles] = useState([]);
  const username = localStorage.getItem('username');

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

  const removeLike = async (signedInUsername, likedUserId) => {
    try {
      const response = await fetch(`/api/removeLike/${likedUserId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ signedInUsername })
      });
      if (!response.ok) {
        throw new Error('Failed to remove like');
      }
      // Refresh matched user profiles after like removal
      fetchMatchedUserProfiles(signedInUsername);
    } catch (error) {
      console.error('Error removing like:', error);
    }
  };
  
  

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h2" align="center" sx={{ fontWeight: 'bold' }}>Matches</Typography>
      <Typography variant="h6" align="center">View users who you've matched with to begin your new friendship!</Typography>
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
              <Button onClick={() => removeLike(username, user.id)} variant="contained" color="primary">Remove Like</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default Matches;
