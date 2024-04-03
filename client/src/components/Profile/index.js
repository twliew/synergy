import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Interests from './Interests';
import SocialMedia from './SocialMedia';
import Firebase from '../Firebase';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Profile = () => {
    const [editedProfileData, setEditedProfileData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
        university_name: '',
        program_of_study: '',
        age: '',
        bio: '',
        availability: '',
        mood: '',
        uni_visible: '',
        program_visible: '',
        age_visible: ''
    });
    const [hobbies, setHobbies] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]); 
    const [editInterests, setEditInterests] = useState(false); 
    const [newHobbyName, setNewHobbyName] = useState(''); 
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const profileResponse = await fetch(`/api/profile/${username}`);
                const interestsResponse = await fetch(`/api/profile/${username}/interests`);
        
                if (!profileResponse.ok || !interestsResponse.ok) {
                    throw new Error('Failed to fetch profile data');
                }
        
                const profileData = await profileResponse.json();
                const interestsData = await interestsResponse.json();
                console.log(profileData)
        
                setEditedProfileData(profileData.userProfile);
                setSelectedInterests(interestsData.selectedInterests);
                setSelectedHobbies(interestsData.selectedInterests.map(interest => interest.id));
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
    
        const fetchHobbies = async () => {
            try {
                const response = await fetch('/api/hobbies');
                if (!response.ok) {
                    throw new Error('Failed to fetch hobbies');
                }
                const data = await response.json();
                setHobbies(data.hobbies);
            } catch (error) {
                console.error('Error:', error.message);
            }
        };
    
        if (username) {
            fetchProfileData();
            fetchHobbies();
        }
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfileData({
            ...editedProfileData,
            [name]: value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const { created_at, ...requestData } = editedProfileData;

            const response = await fetch(`/api/profile/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            setSnackbarMessage('Changes saved successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving changes:', error.message);
            setSnackbarMessage('Error saving changes');
            setSnackbarOpen(true);
        }
    };

    const handleHobbyChange = (e) => {
        setSelectedHobbies(e.target.value);
    };

    const handleSaveInterests = async () => {
        try {
            const response = await fetch(`/api/profile/${username}/hobbies`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ interests: selectedHobbies })
            });
            if (!response.ok) {
                throw new Error('Failed to save interests');
            }
            
            setSelectedInterests(hobbies.filter(hobby => selectedHobbies.includes(hobby.id)));
            
            if (selectedHobbies.length === 0) {
                setSelectedInterests([]);
            }
            
            setEditInterests(false);
            setSnackbarMessage('Interests saved successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving interests:', error.message);
            setSnackbarMessage('Error saving interests');
            setSnackbarOpen(true);
        }
    };

    const handleNewHobbyChange = (e) => {
        setNewHobbyName(e.target.value);
    };

    const handleAddHobby = async () => {
        try {
            const response = await fetch('/api/hobbies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ hobbyName: newHobbyName })
            });
            if (!response.ok) {
                throw new Error('Failed to add hobby');
            }
    
            const updatedHobbiesResponse = await fetch('/api/hobbies');
            const updatedHobbiesData = await updatedHobbiesResponse.json();
            setHobbies(updatedHobbiesData.hobbies);
    
            const newHobby = updatedHobbiesData.hobbies.find(hobby => hobby.hobby_name === newHobbyName);
            if (newHobby) {
                setSelectedHobbies(prevHobbies => [...prevHobbies, newHobby.id]);
            }
    
            setNewHobbyName('');
            setSnackbarMessage('Hobby added successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding hobby:', error.message);
            setSnackbarMessage('Error adding hobby');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleUniVisible = () => {
        setEditedProfileData(prevState => ({
            ...prevState,
            uni_visible: !prevState.uni_visible
        }));
    };

    const handleProgramVisible = () => {
        setEditedProfileData(prevState => ({
            ...prevState,
            program_visible: !prevState.program_visible
        }));
    };

    const handleAgeVisible = () => {
        setEditedProfileData(prevState => ({
            ...prevState,
            age_visible: !prevState.age_visible
        }));
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Grid container spacing={2}>
                <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
                <TextField
                    label="Full Name" name="full_name" value={editedProfileData.full_name} onChange={handleChange} fullWidth
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Username" name="username" value={editedProfileData.username} onChange={handleChange} fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email (Can not be changed)" name="email" value={editedProfileData.email} disabled fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password (Can not be changed)" name="password" type="text" value={editedProfileData.password} disabled fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Univerity Name" name="university_name" value={editedProfileData.university_name} onChange={handleChange} fullWidth
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={editedProfileData.uni_visible}/>} label="Make University Name Public" onChange={handleUniVisible}/>
                    </FormGroup>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Program of Study" name="program_of_study" value={editedProfileData.program_of_study} onChange={handleChange} fullWidth
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={editedProfileData.program_visible}/>} label="Make Program Public" onChange={handleProgramVisible}/>
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Age" name="age" value={editedProfileData.age} onChange={handleChange} fullWidth
                    />
                    <FormGroup>
                        <FormControlLabel control={<Switch checked={editedProfileData.age_visible}/>} label="Make Age Public" onChange={handleAgeVisible}/>
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Bio" name="bio" value={editedProfileData.bio} onChange={handleChange} fullWidth
                    />
                </Grid>
            </Grid>
                    {/*change profile avail*/}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="availability-label">Availability</InputLabel>
                            <Select
                                labelId="availability-label"
                                id="availability"
                                name="availability"
                                value={editedProfileData.availability}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Available</MenuItem>
                                <MenuItem value={0}>Unavailable</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="mood-label">Current Mood</InputLabel>
                            <Select
                                labelId="mood-label"
                                id="mood"
                                name="mood"
                                value={editedProfileData.mood}
                                onChange={handleChange}
                            >
                                <MenuItem value={'Happy'}>Happy</MenuItem>
                                <MenuItem value={'Sad'}>Sad</MenuItem>
                                <MenuItem value={'Excited'}>Excited</MenuItem>
                                <MenuItem value={'Bored'}>Bored</MenuItem>
                                <MenuItem value={'Lonely'}>Lonely</MenuItem>
                                <MenuItem value={'Neutral'}>Neutral</MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                    </Typography>
                    <SocialMedia />
                </Grid>
            </Paper>
            <Typography variant="h5" gutterBottom>
                Interests/Hobbies
            </Typography>
            {!editInterests ? (
                <div>
                    <ul>
                    {selectedInterests && selectedInterests.length > 0 ? (
                        <ul>
                            {selectedInterests.map((interest) => (
                                <li key={interest.id}>{interest.hobby_name}</li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="body1">No interests selected</Typography>
                    )}
                    </ul>
                    <Button onClick={() => setEditInterests(true)} variant="contained" color="primary">
                        Edit Interests
                    </Button>
                </div>
            ) : (
                <div>
                    <Interests
                        hobbies={hobbies}
                        selectedHobbies={selectedHobbies}
                        handleHobbyChange={handleHobbyChange}
                        handleSaveInterests={handleSaveInterests}
                        selectedInterests={selectedInterests}
                    />
                    <div>
                        <TextField
                            label="New Hobby Name" value={newHobbyName} onChange={handleNewHobbyChange} fullWidth
                        />
                        <Button onClick={handleAddHobby} variant="contained" color="primary">
                            Add Hobby
                        </Button>
                        <Button onClick={() => setEditInterests(false)} variant="contained" color="secondary">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
};

export default Profile;