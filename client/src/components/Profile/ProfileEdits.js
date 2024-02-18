/*import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const ProfileEdits = ({ profileData, onSaveProfile }) => {
    const [editedProfileData, setEditedProfileData] = useState(profileData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProfileData({
            ...editedProfileData,
            [name]: value
        });
    };

    const handleSaveProfile = () => {
        onSaveProfile(editedProfileData);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
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
                <Button onClick={handleSaveProfile} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                    Save Profile
                </Button>
            </div>
        </div>
    );
};

export default ProfileEdits;
*/