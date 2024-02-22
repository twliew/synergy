import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SocialMedia = () => {
    const [username, setUsername] = useState('');
    const [socialMedia, setSocialMedia] = useState([]);
    const [newSocialMedia, setNewSocialMedia] = useState({
        platform_name: '',
        sm_username: '',
        url: '',
        visibility: 'public'
    });
    const [editIndex, setEditIndex] = useState(null); // State to track the index of the social media being edited
    const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode
    const [isAdding, setIsAdding] = useState(false); // State to track if in add mode

    useEffect(() => {
        // Retrieve the username from local storage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            // Handle case when no username is found in local storage
        }
    }, []);

    const fetchSocialMedia = async () => {
        try {
            const response = await fetch(`/api/profile/${username}/social-media`);
            if (!response.ok) {
                throw new Error('Failed to fetch social media information');
            }
            const data = await response.json();
            setSocialMedia(data.socialMedia);
        } catch (error) {
            console.error('Error fetching social media:', error.message);
            // Handle error fetching social media
        }
    };

    useEffect(() => {
        if (username) {
            fetchSocialMedia();
        }
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSocialMedia((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddSocialMedia = async () => {
        try {
            const response = await fetch(`/api/profile/${username}/social-media`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSocialMedia)
            });
            if (!response.ok) {
                throw new Error('Failed to add social media');
            }
            // Refresh social media information after adding
            setNewSocialMedia({ platform_name: '', sm_username: '', url: '', visibility: 'public' });
            fetchSocialMedia();
            setIsAdding(false); // Exit add mode
        } catch (error) {
            console.error('Error adding social media:', error.message);
            // Handle error adding social media
        }
    };

    const handleEdit = (index) => {
        // Set the edit index and toggle edit mode
        setEditIndex(index);
        setIsEditing(true);
        const editedSocialMedia = socialMedia[index];
        setNewSocialMedia({
            platform_name: editedSocialMedia.platform_name,
            sm_username: editedSocialMedia.sm_username,
            url: editedSocialMedia.url,
            visibility: editedSocialMedia.visibility
        });
    };

    const handleCancelEdit = () => {
        setEditIndex(null); // Reset edit index
        setIsEditing(false); // Reset edit mode
    };

    const handleCancelAdd = () => {
        setIsAdding(false); // Exit add mode
    };

    const handleSaveChanges = async () => {
        try {
            const editedSocialMedia = socialMedia[editIndex];
            const updatedSocialMedia = {
                ...newSocialMedia,
                entryNumber: editIndex + 1 // Adding entryNumber to the updated social media object
            };
    
            // Update social media information for the user
            const response = await fetch(`/api/profile/${username}/social-media/${editIndex + 1}`, { // Pass entryNumber in the URL
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSocialMedia) // Include entryNumber in the request body
            });
    
            if (!response.ok) {
                throw new Error('Failed to save social media changes');
            }
            
            // Reset edit index and fetch social media again to reflect changes
            setEditIndex(null);
            setIsEditing(false); // Reset editing state
            fetchSocialMedia();
        } catch (error) {
            console.error('Error saving social media changes:', error.message);
            // Handle error saving social media changes
        }
    };

    const handleDelete = async (index) => {
        try {
            const response = await fetch(`/api/profile/${username}/social-media/${index + 1}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete social media');
            }
            fetchSocialMedia(); // Refresh social media information after deletion
        } catch (error) {
            console.error('Error deleting social media:', error.message);
            // Handle error deleting social media
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Social Media
            </Typography>
            {socialMedia.map((account, index) => (
                <div key={index}>
                    {isEditing && editIndex === index ? ( // Render editable fields if currently editing this social media
                        <div>
                            <TextField
                                label="Platform"
                                name="platform_name"
                                value={newSocialMedia.platform_name}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="Username"
                                name="sm_username"
                                value={newSocialMedia.sm_username}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                label="URL"
                                name="url"
                                value={newSocialMedia.url}
                                onChange={handleChange}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="visibility-label">Visibility</InputLabel>
                                <Select
                                    labelId="visibility-label"
                                    id="visibility"
                                    name="visibility"
                                    value={newSocialMedia.visibility}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="public">Public</MenuItem>
                                    <MenuItem value="friends-only">Friends Only</MenuItem>
                                    <MenuItem value="private">Private</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Entry Number"
                                name="entryNumber"
                                value={index + 1}
                                disabled
                                fullWidth
                            />
                            <Button onClick={handleSaveChanges} variant="contained" color="primary">
                                Save Changes
                            </Button>
                            <Button onClick={handleCancelEdit} variant="contained" color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(index)} variant="contained" color="error">
                                Delete
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Typography variant="body1">
                                Entry #{index + 1}: {account.platform_name}: {account.sm_username} - {account.url}
                            </Typography>
                            <Button onClick={() => handleEdit(index)} variant="contained" color="primary">
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(index)} variant="contained" color="error">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            ))}
            {!isEditing && !isAdding && (
                <Button onClick={() => setIsAdding(true)} variant="contained" color="primary">
                    Add Social Media
                </Button>
            )}
            {isAdding && (
                <div>
                    <TextField
                        label="Platform"
                        name="platform_name"
                        value={newSocialMedia.platform_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Username"
                        name="sm_username"
                        value={newSocialMedia.sm_username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="URL"
                        name="url"
                        value={newSocialMedia.url}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="visibility-label">Visibility</InputLabel>
                        <Select
                            labelId="visibility-label"
                            id="visibility"
                            name="visibility"
                            value={newSocialMedia.visibility}
                            onChange={handleChange}
                        >
                            <MenuItem value="public">Public</MenuItem>
                            <MenuItem value="friends-only">Friends Only</MenuItem>
                            <MenuItem value="private">Private</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleAddSocialMedia} variant="contained" color="primary">
                        Add Social Media
                    </Button>
                    <Button onClick={handleCancelAdd} variant="contained" color="secondary">
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SocialMedia;
