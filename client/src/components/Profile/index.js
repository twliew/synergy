import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`/api/profile/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setProfileData(data.userProfile);
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error fetching profile data
            }
        };

        if (username) {
            fetchProfileData();
        }
    }, [username]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            {profileData && (
                <div>
                    <p>Username: {profileData.username}</p>
                    <p>Email: {profileData.email}</p>
                    {/* Render other profile information here */}
                </div>
            )}
        </div>
    );
};

export default Profile;
