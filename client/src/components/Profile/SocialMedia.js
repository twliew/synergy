import { Typography, Button} from '@mui/material';
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
                <Button onClick={() => handleSMSaveChanges} variant="contained" color="primary">
                    Save Changes
                </Button>
            )}
        </div>
    )
}

export default SocialMedia;