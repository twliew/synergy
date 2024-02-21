import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const SocialMedia = (props) => {
    return (
        <div>
            {!props.editSM ? (
                <div>
                    <Typography>{props.newSocialMedia.platform_name}</Typography>
                    <Typography>{props.newSocialMedia.sm_username}</Typography>
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
                    <FormControl>
                        <FormLabel id="visibility">Visibility</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="visibility"
                            name="visibility"
                            value={props.newSocialMedia.visibility}
                            onChange={props.handleNewVisibility}
                        >
                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                            <FormControlLabel value="matches-only" control={<Radio />} label="Matches Only" />
                        </RadioGroup>
                    </FormControl>

                    <Button onClick={() => props.handleSMSaveChanges()} variant="contained" color="primary">
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SocialMedia;