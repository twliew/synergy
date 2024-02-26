import React from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Interests = ({ hobbies, selectedHobbies, handleHobbyChange, handleSaveInterests }) => {
    return (
        <div>
            <FormControl fullWidth>
                <InputLabel id="select-multiple-label">Select Interests/Hobbies</InputLabel>
                <Select
                    labelId="select-multiple-label"
                    id="select-multiple"
                    multiple
                    value={selectedHobbies}
                    onChange={handleHobbyChange}
                    fullWidth
                >
                    {hobbies.map((hobby) => (
                        <MenuItem key={hobby.id} value={hobby.id}>
                            {hobby.hobby_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSaveInterests} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Save Interests
            </Button>
        </div>
    );
};

export default Interests;
