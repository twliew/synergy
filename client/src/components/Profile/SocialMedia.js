import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

const SocialMedia = (props) => {
    return (
        <div>
            {!props.editSM ? (
                <div>
                    {/*loop to render each social media*/}
                    {props.socialMedia.map((sm) => {
                        return(
                            <>
                                <Typography>{sm.platform_name}: <Link href={sm.url}>{sm.sm_username}</Link>, {sm.visibility}</Typography>
                            </>
                        );
                    })}
                    <Button onClick={() => props.setEditSM(true)} variant="contained" color="primary">
                        Edit
                    </Button>
                </div>
            ):(
                <div>
                    <Stack>
                        {/*loop to render each social media so the user can edit it in textfields*/}
                        {props.socialMedia.map((sm, index) => {
                            return(
                                <div key={index}>
                                    <Typography>{index}</Typography>
                                    <TextField 
                                        label="Platform Name" 
                                        id="platform_name" 
                                        value={sm.platform_name} 
                                        onChange={() => props.handleFieldChangePlatform(index)}
                                    />
                                    <TextField 
                                        label="Username" 
                                        id="username" 
                                        value={sm.sm_username}
                                        onChange={() => props.handleFieldChange(index)}
                                    />
                                    <TextField 
                                        label="URL" 
                                        id="url" 
                                        value={sm.url}
                                        onChange={() => props.handleFieldChange(index)}/>
                                    <FormControl>
                                        <FormLabel id="visibility">Visibility</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="visibility"
                                            name="visibility"
                                            value={sm.visibility}
                                        >
                                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                                            <FormControlLabel value="friends-only" control={<Radio />} label="Friends Only" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                    );
                        })}
                    </Stack>
                    <Button onClick={() => props.handleSMSaveChanges} variant="contained" color="primary">
                        Save Changes
                    </Button>
                    <Button onClick={() => props.setAddSM(true)} variant="contained" color="primary">
                        Add
                    </Button>
                    
                    {/*adding a new social media (done, don't touch)*/}
                    {props.addSM ? (
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
                                    <FormControlLabel value="friends-only" control={<Radio />} label="Friends Only" />
                                </RadioGroup>
                            </FormControl>
    
                            <Button onClick={() => props.handleNewSMSaveChanges()} variant="contained" color="primary">
                                Save New Social Media
                            </Button>
                        </div>
                    ):(
                        <div>
                        </div> 
                    )}
                    
                </div>
            )}
        </div>
    )
}

export default SocialMedia;