import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';

const Search = ({ allHobbies, onSearch, onUndoSearch }) => {
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [filterLikedUsers, setFilterLikedUsers] = useState(false);

    const handleHobbiesChange = (event) => {
        setSelectedHobbies(event.target.value);
    };

    const handleSearch = () => {
        onSearch(selectedHobbies, filterLikedUsers);
    };

    const undoSearch = () => {
        onUndoSearch();
    };

    const handleLikedUserFilterChange = (event) => {
        setFilterLikedUsers(event.target.checked);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
            <Typography variant="h6" gutterBottom>Select Hobbies:</Typography>
            <Select
                id="hobbies"
                multiple
                value={selectedHobbies}
                onChange={handleHobbiesChange}
                style={{ minWidth: 200 }}
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
            <Box mt={2} display="flex" justifyContent="center">
                <FormControlLabel
                    control={<Checkbox checked={filterLikedUsers} onChange={handleLikedUserFilterChange} />}
                    label="Filter for who liked you"
                />
                <Button onClick={handleSearch} variant="contained" color="primary" style={{ marginLeft: 8 }}>Search</Button>
                <Button onClick={undoSearch} variant="contained" color="secondary">Undo Search</Button>
            </Box>
        </Box>
    );
}

export default Search;
