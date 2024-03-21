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
        fetchAllUsers(); //fetch all users
        fetchHobbies(); //fetch all hobbies
    }, []);

    const fetchAllUsers = () => { //fetch all users
        const username = localStorage.getItem('username');
        fetch(`/api/profile/exclude/${username}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.profiles); 
            })
            .catch(error => console.error('Error fetching users:', error));
    };    

    const fetchHobbies = () => { //fetch all hobbies
        fetch(`/api/hobbies`)
            .then(response => response.json())
            .then(data => {
                setAllHobbies(data.hobbies);
            })
            .catch(error => console.error('Error fetching hobbies:', error));
    };

    const handleSearch = (selectedHobbies) => { //search for users with the selected hobbies
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
                setUsers(data.profiles.map(profile => ({ ...profile, hobbies: profile.all_hobbies }))); 
                setIsSearching(true); 
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => console.error('Error searching users:', error));
    };

    const undoSearch = () => { //undo the search
        fetchAllUsers(); //fetch all users
        setIsSearching(false); 
    };

    const handleLike = (likedUserId, likedUsername) => { //like a user
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
            fetchAllUsers(); //fetch all users
        })
        .catch(error => console.error('Error liking user:', error));
    };

    const toggleViewLikes = () => { //takes you to view likes page
        setViewLikes(!viewLikes);
        fetchAllUsers();
    };
    
    const backToPeople = () => { //takes you back to people page
        setViewLikes(false);
        fetchAllUsers();
    };

    useEffect(() => {
        if (!viewLikes) { //if not viewing likes, fetch all users
            fetchAllUsers();
        }
    }, [viewLikes]);
    
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" gutterBottom>{viewLikes ? 'Profiles of Users who Liked You' : 'People'}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {!viewLikes && ( // Conditionally render SearchPeople component
                        <SearchPeople 
                            allHobbies={allHobbies}
                            onSearch={(selectedHobbies) => handleSearch(selectedHobbies)}
                            onUndoSearch={undoSearch}
                        />
                    )}
                    <Button onClick={toggleViewLikes} variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
                        {viewLikes ? 'Back to People' : 'View Likes'}
                    </Button>
                    {!viewLikes && (
                        <Button onClick={backToPeople} variant="outlined" color="primary" sx={{ marginLeft: '10px' }}>
                            Back to People
                        </Button>
                    )}
                </Box>
                <Box sx={{ overflow: 'auto' }}>
                    {viewLikes ? (
                        <ViewLikes />
                    ) : ( 
                        <>
                            {users.map(user => (
                                <UserCard key={user.id} user={user} handleLike={handleLike} isSearching={isSearching} />
                            ))}
                        </>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

const UserCard = ({ user, handleLike, isSearching }) => {
    const [isLiked, setIsLiked] = useState(user.is_liked === 1);

    const handleLikeClick = () => {
        if (!isLiked) {
            handleLike(user.id, user.username);
            setIsLiked(true);
        }
    };

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
                    <Typography variant="body2" color="textSecondary" gutterBottom>Hobbies: {isSearching ? user.all_hobbies : user.hobbies}</Typography>
                    <Typography variant="body2" color="textSecondary">Public Social Media: {user.public_social_media}</Typography>
                    <Typography variant="body2" color="textSecondary">Mood: {user.mood}</Typography>
                    <Button onClick={handleLikeClick} variant="contained" color="primary" disabled={isLiked}>Like</Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default People;