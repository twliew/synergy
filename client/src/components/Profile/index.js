import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid } from '@mui/material';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        university_name: '',
        program_of_study: '',
        age: '',
        bio: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const username = localStorage.getItem('username');
                if (!username) {
                    throw new Error('Username not found in localStorage');
                }
                const response = await fetch(`/api/profile/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch profile data');
                }
                setProfileData(data.userProfile);
            } catch (error) {
                console.error('Error fetching profile data:', error.message);
                // Handle error fetching profile data
            }
        };
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.id]: e.target.value
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`/api/profile/${profileData.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });
            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            // Handle success message or any other action
        } catch (error) {
            console.error('Error saving changes:', error.message);
            // Handle error saving changes
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        value={profileData.username}
                        fullWidth
                        disabled
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={profileData.email}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        value={profileData.password}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="full_name"
                        label="Full Name"
                        variant="outlined"
                        value={profileData.full_name}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="university_name"
                        label="University Name"
                        variant="outlined"
                        value={profileData.university_name}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="program_of_study"
                        label="Program of Study"
                        variant="outlined"
                        value={profileData.program_of_study}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="age"
                        label="Age"
                        variant="outlined"
                        value={profileData.age}
                        fullWidth
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="bio"
                        label="Bio"
                        variant="outlined"
                        value={profileData.bio}
                        fullWidth
                        multiline
                        rows={4}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSaveChanges}
            >
                Save Changes
            </Button>
        </div>
    );
};

export default Profile;
