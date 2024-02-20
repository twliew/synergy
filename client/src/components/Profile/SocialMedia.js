import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';


const SocialMedia = ({ socialMedia, setEditSocialMedia, addSM, setAddSM, handleSMSaveChanges }) => {
    return (
        <div>

            {!addSM ? (
                <div>
                    <Typography>h</Typography>
                    <Button onClick={() => setAddSM(true)} variant="contained" color="primary">
                        Add
                    </Button>
                </div>
            ):(
                <div>
                    <TextField label="Platform Name" id="platform_name"/>
                    <TextField label="Username" id="username"/>
                    <TextField label="URL" id="url"/>

                    <Button onClick={() => handleSMSaveChanges()} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SocialMedia;