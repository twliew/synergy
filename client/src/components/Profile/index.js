import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid, Snackbar } from '@mui/material';
import Interests from './Interests'; // Assuming Interests component is in a separate file
import SocialMedia from './SocialMedia';

const Profile = () => {
    const [editedProfileData, setEditedProfileData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
        university_name: '',
        program_of_study: '',
        age: '',
        bio: ''
    });
    const [hobbies, setHobbies] = useState([]);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]); // State to store selected interests
    const [editInterests, setEditInterests] = useState(false); // State to toggle editing interests
    const [newHobbyName, setNewHobbyName] = useState(''); // State to store new hobby name
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const username = localStorage.getItem('username');
    const [socialMedia, setSocialMedia] = useState([]); // State to store social media
    const [newSocialMedia, setNewSocialMedia] = useState({
        platform_name: '',
        sm_username: '',
        url:'',
        visibility:''
    });
    const [editSM, setEditSM] = React.useState(false);
    const serverURL = "";


    const handleSMSaveChanges = async () => {
        setEditSM(false);
        callApiAddSM(username);
    }

    const handleNewPlatformName = async (event) => {
        newSocialMedia.platform_name=event.target.value
    }

    const handleNewUsername = async (event) => {
        newSocialMedia.sm_username=event.target.value
    }

    const handleNewURL = async (event) => {
        newSocialMedia.url=event.target.value
    }

    const handleNewVisibility = (event) => {
        setNewSocialMedia(prevState => ({
            ...prevState, // maintain the existing state
            visibility: event.target.value // update the visibility property
        }));
    };

    

    const callApiAddSM = async (username) => {
        const url = serverURL+`/api/profile/${username}/add_social_media`;
    
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newSocialMedia)
        });
    
        const body = await response.json();
    
        if (response.status !== 200) {
            throw new Error(body.message);
        }
    
        return body;
    };

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
        
                setEditedProfileData(profileData.userProfile);
                setSelectedInterests(interestsData.selectedInterests);
                // Pre-select interests for editing
                setSelectedHobbies(interestsData.selectedInterests.map(interest => interest.id));
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error fetching profile data
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
                // Handle error fetching hobbies
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
            // Exclude the 'created_at' property from the editedProfileData object
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
            // Handle error saving changes
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
            
            // Update selectedInterests state immediately after saving
            setSelectedInterests(hobbies.filter(hobby => selectedHobbies.includes(hobby.id)));
            
            // If no interests are selected, set selectedInterests to an empty array
            if (selectedHobbies.length === 0) {
                setSelectedInterests([]);
            }
            
            // Handle success message or any other action
            setEditInterests(false); // Exit edit interests mode after saving
            setSnackbarMessage('Interests saved successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error saving interests:', error.message);
            // Handle error saving interests
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
    
            // Fetch updated list of hobbies after adding the new hobby
            const updatedHobbiesResponse = await fetch('/api/hobbies');
            const updatedHobbiesData = await updatedHobbiesResponse.json();
            setHobbies(updatedHobbiesData.hobbies);
    
            // Update selectedHobbies with the newly created hobby ID
            const newHobby = updatedHobbiesData.hobbies.find(hobby => hobby.hobby_name === newHobbyName);
            if (newHobby) {
                setSelectedHobbies(prevHobbies => [...prevHobbies, newHobby.id]);
            }
    
            // Clear the new hobby input field
            setNewHobbyName('');
            setSnackbarMessage('Hobby added successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error adding hobby:', error.message);
            // Handle error adding hobby
            setSnackbarMessage('Error adding hobby');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Full Name"
                            name="full_name"
                            value={editedProfileData.full_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            name="username"
                            value={editedProfileData.username}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={editedProfileData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            value={editedProfileData.password}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="University Name"
                            name="university_name"
                            value={editedProfileData.university_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Program of Study"
                            name="program_of_study"
                            value={editedProfileData.program_of_study}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Age"
                            name="age"
                            value={editedProfileData.age}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Bio"
                            name="bio"
                            value={editedProfileData.bio}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={handleSaveChanges} variant="contained" color="primary">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Paper>
                <Typography variant="h5" gutterBottom>
                    Social Media
                </Typography>
               
                <SocialMedia
                    socialMedia={socialMedia}
                    editSM={editSM}
                    setEditSM={setEditSM}
                    newSocialMedia={newSocialMedia}
                    handleSMSaveChanges={handleSMSaveChanges}
                    handleNewPlatformName={handleNewPlatformName}
                    handleNewUsername={handleNewUsername}
                    handleNewURL={handleNewURL}
                    handleNewVisibility={handleNewVisibility}
                />
            </Paper>

            <Paper>
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
                            label="New Hobby Name"
                            value={newHobbyName}
                            onChange={handleNewHobbyChange}
                            fullWidth
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
            </Paper>
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
