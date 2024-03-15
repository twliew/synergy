import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const ViewLikes = () => {
    const [likedProfiles, setLikedProfiles] = useState([]);
    const [likedStatus, setLikedStatus] = useState({});

    useEffect(() => {
        fetchLikedProfiles();
    }, []);

    const fetchLikedProfiles = () => {
        const signedInUsername = localStorage.getItem('username');
        fetch(`/api/profile/viewLikes/${signedInUsername}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setLikedProfiles(data.profiles);
                    checkLikedStatus(data.profiles);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => console.error('Error fetching liked profiles:', error));
    };

    const checkLikedStatus = (profiles) => {
        const signedInUsername = localStorage.getItem('username');
        profiles.forEach(profile => {
            fetch(`/api/like/check/${signedInUsername}/${profile.username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        setLikedStatus(prevStatus => ({
                            ...prevStatus,
                            [profile.username]: data.liked
                        }));
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch(error => console.error(`Error checking liked status for ${profile.username}:`, error));
        });
    };

    const handleLikeUser = (likedUsername) => {
        const signedInUsername = localStorage.getItem('username');
        fetch(`/api/like/${signedInUsername}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likedUsername })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchLikedProfiles(); // Update liked profiles after liking
        })
        .catch(error => console.error('Error liking user:', error));
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
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Public Social Media: {profile.public_social_media}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Liked by: {profile.mood}</Typography>
                                    <Button
                                        onClick={() => handleLikeUser(profile.username)}
                                        disabled={likedStatus[profile.username]}
                                    >
                                        {likedStatus[profile.username] ? 'Liked' : 'Like'}
                                    </Button>
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
