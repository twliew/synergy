import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Search = ({ allHobbies, onSearch, onUndoSearch }) => {
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const handleHobbiesChange = (event) => {
        setSelectedHobbies(event.target.value);
    };

    const handleSearch = () => {
        onSearch(selectedHobbies);
    };

    const undoSearch = () => {
        onUndoSearch();
    };

    return (
        <div>
            <Typography>Select Hobbies:</Typography>
            <Select
                id="hobbies"
                multiple
                value={selectedHobbies}
                onChange={handleHobbiesChange}
                renderValue={(selected) => (
                    <div>
                        {selected.map((value) => (
                            <Box key={value}>{value}</Box>
                        ))}
                    </div>
                )}
            >
                {allHobbies.map(hobby => (
                    <MenuItem key={hobby.id} value={hobby.hobby_name}>
                        {hobby.hobby_name}
                    </MenuItem>
                ))}
            </Select>
            <Button onClick={handleSearch} variant="contained" color="primary">Search</Button>
            <Button onClick={undoSearch} variant="contained" color="secondary">Undo Search</Button>
        </div>
    );
}

export default Search;
