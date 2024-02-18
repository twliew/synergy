import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';

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
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`/api/profile/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setEditedProfileData(data.userProfile);
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error fetching profile data
            }
        };

        if (username) {
            fetchProfileData();
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
            // Handle success message or any other action
        } catch (error) {
            console.error('Error saving changes:', error.message);
            // Handle error saving changes
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            {editedProfileData && (
                <div>
                    <TextField
                        label="Full Name"
                        name="full_name"
                        value={editedProfileData.full_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={editedProfileData.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={editedProfileData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        value={editedProfileData.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="University Name"
                        name="university_name"
                        value={editedProfileData.university_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Program of Study"
                        name="program_of_study"
                        value={editedProfileData.program_of_study}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Age"
                        name="age"
                        value={editedProfileData.age}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        value={editedProfileData.bio}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Button onClick={handleSaveChanges} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Profile;
