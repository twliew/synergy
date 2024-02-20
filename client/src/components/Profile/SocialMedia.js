import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';


const SocialMedia = (props) => {
    return (
        <div>

            {!props.editSM ? (
                <div>
                    <Typography>{props.newSocialMedia.platform_name}</Typography>
                    <Typography>{props.newSocialMedia.username}</Typography>
                    <Typography>{props.newSocialMedia.url}</Typography>
                    <Button onClick={() => props.setEditSM(true)} variant="contained" color="primary">
                        Edit
                    </Button>
                </div>
            ):(
                <div>
                    <TextField label="Platform Name" id="platform_name" onChange={props.handleNewPlatformName}/>
                    <TextField label="Username" id="username" onChange={props.handleNewUsername}/>
                    <TextField label="URL" id="url" onChange={props.handleNewURL}/>

                    <Button onClick={() => props.handleSMSaveChanges()} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SocialMedia;