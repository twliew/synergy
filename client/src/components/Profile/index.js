import * as React from 'react';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'; 
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8d75ba',
            light: '#8d75ba',
            background: '#eeeeee'
        },
    },
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.background,
    padding: theme.spacing(3),
    textAlign: 'center',
    marginTop: theme.spacing(3),
}));

const Profile = () => {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            {/*overhead bar*/}
            <AppBar position="static">
                <Container maxWidth="xl">
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/')}>
                                Home
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/Profile')}>
                                Profile
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/People')}>
                                People
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/Matches')}>
                                Matches
                            </Button>
                        </Box>
                </Container>
            </AppBar>

            {/*profile*/}
            <Stack direction="row" spacing={5}>
                <Item>
                    <Box component="form" noValidate autoComplete='off' sx={{'& > :not(style)': { m: 0, width: '50ch' }}}>
                        <Typography variant="h6" component="h6">Personal Information: visible on your profile</Typography>
                        <Stack direction="column" spacing={3}>
                            <TextField id="first-name" label="First Name" variant="outlined"/>
                            <TextField id="last-name" label="Last Name" variant="outlined"/>
                            <TextField id="year" label="Year" variant="outlined"/>
                            <TextField id="program" label="Program" variant="outlined"/>
                            <TextField id="gender" label="Gender" variant="outlined"/> {/*dropdown?*/}
                            <Button variant="contained"> Save Changes</Button>
                        </Stack>
                    </Box>
                </Item>
                <Item>
                    <Box component="form" noValidate autoComplete='off' sx={{'& > :not(style)': { m: 0, width: '50ch' }}}>
                        <Typography variant="h6" component="h6">Private Information: shared when matched</Typography>
                        <Stack direction="column" spacing={3}>
                            <TextField id="instagram" label="Instagram" variant="outlined"/>
                            <TextField id="facebook" label="Facebook" variant="outlined"/>
                            <TextField id="snapchat" label="Snapchat" variant="outlined"/>
                            <TextField id="phone-number" label="Phone Number" variant="outlined"/>
                            <TextField id="note" label="Note to your Match" variant="outlined" multiline inputProps={{maxlength: 200}}/>
                            <Button variant="contained"> Save Changes</Button>
                        </Stack>
                    </Box>
                </Item>
                <Item>
                    <Box component="form" noValidate autoComplete='off' sx={{'& > :not(style)': { m: 0, width: '50ch' }}}>
                        <Typography variant="h6" component="h6">Hobbies</Typography>
                    </Box>
                </Item>
            </Stack>

        </ThemeProvider>
  );
}

export default Profile;