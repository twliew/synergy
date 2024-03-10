import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const Search = () => {
    const [likedUsers, setLikedUsers] = useState([]);
    const [commonInterestUsers, setCommonInterestUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [hobbiesOptions, setHobbiesOptions] = useState([]);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        fetchLikedUsers();
        fetchHobbies();
    }, []);

    const fetchLikedUsers = () => {
        fetch(`/api/liked/${username}`)
            .then(response => response.json())
            .then(data => {
                setLikedUsers(data.likedUsers); 
                fetchCommonInterestUsers(data.likedUsers);
            })
            .catch(error => console.error('Error fetching liked users:', error));
    };

    const fetchHobbies = () => {
        fetch('/api/hobbies')
            .then(response => response.json())
            .then(data => {
                setHobbiesOptions(data.hobbies);
            })
            .catch(error => console.error('Error fetching hobbies:', error));
    };

    const fetchCommonInterestUsers = (likedUsers) => {
        fetch(`/api/common-interest/${username}`)
            .then(response => response.json())
            .then(data => {
                setCommonInterestUsers(data.commonInterestUsers);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching common interest users:', error));
    };

    const handleHobbiesChange = (event) => {
        setSelectedHobbies(event.target.value);
    };

    const fetchFilteredUsers = () => {
        if (selectedHobbies.length > 0) {
            fetch(`/api/common-interest/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedHobbies }),
            })
                .then(response => response.json())
                .then(data => {
                    setCommonInterestUsers(data.commonInterestUsers);
                })
                .catch(error => console.error('Error fetching filtered users:', error));
        }
    };
    

    if (loading) {
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" gutterBottom>Search Results</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="hobbies-label">Select Hobbies</InputLabel>
                            <Select
                                labelId="hobbies-label"
                                id="hobbies"
                                multiple
                                value={selectedHobbies}
                                onChange={handleHobbiesChange}
                                label="Select Hobbies"
                                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                            >
                                {hobbiesOptions.map((hobby) => (
                                    <MenuItem key={hobby.id} value={hobby.hobby_name}>
                                        {hobby.hobby_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={fetchFilteredUsers}
                            fullWidth
                        >
                            Filter for those who liked you
                        </Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    {commonInterestUsers.length === 0 ? (
                        <Typography variant="body1">No users found with similar interests who liked you.</Typography>
                    ) : (
                        commonInterestUsers.map(user => (
                            <Box key={user.id} mb={3}>
                                <Card sx={{ minWidth: 275 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">{user.full_name}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>University: {user.university_name}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>Program of Study: {user.program_of_study}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>Age: {user.age}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>Bio: {user.bio}</Typography>
                                        <Typography variant="body2" color="textSecondary" gutterBottom>Hobbies: {user.hobbies}</Typography>
                                        <Typography variant="body2" color="textSecondary">Public Social Media: {user.public_social_media}</Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Search;
