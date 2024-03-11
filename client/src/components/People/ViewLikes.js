import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const ViewLikes = () => {
    const [likedProfiles, setLikedProfiles] = useState([]);

    useEffect(() => {
        fetchLikedProfiles();
    }, []);

    const fetchLikedProfiles = () => {
        const signedInUsername = localStorage.getItem('username');
        fetch(`/api/profile/viewLikes/${signedInUsername}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setLikedProfiles(data.profiles);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => console.error('Error fetching liked profiles:', error));
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ overflow: 'auto' }}>
                    {likedProfiles.map(profile => (
                        <Box key={profile.id} mb={3}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{profile.full_name}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Username: {profile.username}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>University: {profile.university_name}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Program of Study: {profile.program_of_study}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Age: {profile.age}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Bio: {profile.bio}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Hobbies: {profile.hobbies}</Typography>
                                    <Typography variant="body2" color="textSecondary">Public Social Media: {profile.public_social_media}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ViewLikes;
