import { Typography, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.background,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: theme.spacing(1),
  }));

const SocialMedia = (props) => {
    return (
        <div>
            {!props.editSM ? (
                <div>
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
                    {props.socialMedia.map((sm) => {
                        return(
                            <>
                                <TextField label="Platform Name" id="platform_name" value={sm.platform_name}/>
                                <TextField label="Username" id="username" value={sm.sm_username}/>
                                <TextField label="URL" id="url" value={sm.url}/>
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
                                        <FormControlLabel value="matches-only" control={<Radio />} label="Matches Only" />
                                    </RadioGroup>
                                </FormControl>
                            </>
                );
                })}
                    <Button  variant="contained" color="primary">
                        Save Changes
                    </Button>
                    <Button onClick={() => props.setAddSM(true)} variant="contained" color="primary">
                        Add
                    </Button>
                        
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
                                    <FormControlLabel value="matches-only" control={<Radio />} label="Matches Only" />
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