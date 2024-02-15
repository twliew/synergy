import * as React from 'react';

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider} from '@mui/material/styles'
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    palette: {
        mode: 'light',
    },
});


const Profile = () => {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            {/*overhead bar*/}
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                Home
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/')}>
                                Profile
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/People')}>
                                People
                            </Button>
                            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={()=>navigate('/Matches')}>
                                Matches
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>


      <Typography>hello</Typography>
    </ThemeProvider>
  );
}




export default Profile;