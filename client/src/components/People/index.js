import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchPeople from './Search';
import ViewLikes from './ViewLikes'; 

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const People = () => {
    const [users, setUsers] = useState([]);
    const [allHobbies, setAllHobbies] = useState([]);
    const [isSearching, setIsSearching] = useState(false); 
    const [viewLikes, setViewLikes] = useState(false); 

    useEffect(() => {
        fetchAllUsers();
        fetchHobbies();
    }, []);

    const fetchAllUsers = () => {
        const username = localStorage.getItem('username');
        fetch(`/api/profile/exclude/${username}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.profiles); 
            })
            .catch(error => console.error('Error fetching users:', error));
    };    

    const fetchHobbies = () => {
        fetch(`/api/hobbies`)
            .then(response => response.json())
            .then(data => {
                setAllHobbies(data.hobbies);
            })
            .catch(error => console.error('Error fetching hobbies:', error));
    };

    const handleSearch = (selectedHobbies) => {
        const username = localStorage.getItem('username');
        fetch(`/api/profile/search/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hobbies: selectedHobbies, username: username }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setUsers(data.profiles); 
                setIsSearching(true); 
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => console.error('Error searching users:', error));
    };

    const undoSearch = () => {
        fetchAllUsers();
        setIsSearching(false); 
    };

    const handleLike = (likedUserId, likedUsername) => {
        const signedInUsername = localStorage.getItem('username');
        fetch('/api/like/' + signedInUsername, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ likedUsername }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => console.error('Error liking user:', error));
    };

    const toggleViewLikes = () => {
        setViewLikes(!viewLikes);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" gutterBottom>{viewLikes ? 'Profiles of Users who Liked You' : 'People'}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchPeople 
                        allHobbies={allHobbies}
                        onSearch={(selectedHobbies) => handleSearch(selectedHobbies)}
                        onUndoSearch={undoSearch}
                    />
                    <Button onClick={toggleViewLikes} variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
                        {viewLikes ? 'Back to People' : 'View Likes'}
                    </Button>
                </Box>
                <Box sx={{ overflow: 'auto' }}>
                    {viewLikes ? (
                        <ViewLikes />
                    ) : ( 
                        <>
                            {users.map(user => (
                                <UserCard key={user.id} user={user} handleLike={handleLike} />
                            ))}
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const UserCard = ({ user, handleLike }) => {
    return (
        <Box mb={3}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{user.full_name}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Username: {user.username}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>University: {user.university_name}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Program of Study: {user.program_of_study}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Age: {user.age}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Bio: {user.bio}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>Hobbies: {user.hobbies}</Typography>
                    <Typography variant="body2" color="textSecondary">Public Social Media: {user.public_social_media}</Typography>
                    <Button onClick={() => handleLike(user.id, user.username)} variant="contained" color="primary">Like</Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default People;
