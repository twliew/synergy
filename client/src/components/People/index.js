import * as React from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

const People = () => {
    const [users, setUsers] = React.useState([]);
    const [selectedHobbies, setSelectedHobbies] = React.useState([]);
    const [hobbies, setHobbies] = React.useState([]);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    // Function to fetch all users excluding the signed-in user
    const fetchAllUsers = () => {
        fetch(`/api/profile/exclude/${username}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data.profiles); 
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    React.useEffect(() => {
        fetchAllUsers();
    }, []);

    // Function to handle search based on selected hobbies
    const handleSearch = () => {
        fetch(`/api/profile/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hobbies: selectedHobbies }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                setUsers(data.profiles); 
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => console.error('Error searching users:', error));
    };

    React.useEffect(() => {
        // Fetch all hobbies to populate dropdown
        fetch(`/api/hobbies`)
            .then(response => response.json())
            .then(data => {
                setHobbies(data.hobbies);
            })
            .catch(error => console.error('Error fetching hobbies:', error));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" gutterBottom>People</Typography>
                <Box sx={{ overflow: 'auto' }}>
                    <Box mb={3}>
                        <label htmlFor="hobbies">Select Hobbies:</label>
                        <select
                            id="hobbies"
                            multiple
                            value={selectedHobbies}
                            onChange={event => setSelectedHobbies(Array.from(event.target.selectedOptions, option => option.value))}
                        >
                            {hobbies.map(hobby => (
                                <option key={hobby.id} value={hobby.id}>{hobby.hobby_name}</option>
                            ))}
                        </select>
                    </Box>
                    <button onClick={handleSearch}>Search</button>
                    {users.map(user => (
                        <Box key={user.id} mb={3}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{user.full_name}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>University: {user.university_name}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Program of Study: {user.program_of_study}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Age: {user.age}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Bio: {user.bio}</Typography>
                                    <Typography variant="body2" color="textSecondary" gutterBottom>Hobbies: {user.hobbies}</Typography>
                                    <Typography variant="body2" color="textSecondary">Public Social Media: {user.public_social_media}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default People;
