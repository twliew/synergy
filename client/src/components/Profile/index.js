import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import Interests from './Interests'; // Assuming Interests component is in a separate file

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
            // Handle success message or any other action
        } catch (error) {
            console.error('Error saving changes:', error.message);
            // Handle error saving changes
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
        } catch (error) {
            console.error('Error saving interests:', error.message);
            // Handle error saving interests
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
                <Interests
                    hobbies={hobbies}
                    selectedHobbies={selectedHobbies}
                    handleHobbyChange={handleHobbyChange}
                    handleSaveInterests={handleSaveInterests}
                    selectedInterests={selectedInterests}
                />
            )}
        </div>
    );
};

export default Profile;
