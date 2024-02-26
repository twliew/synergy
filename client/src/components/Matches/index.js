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

const Matches = () => {

    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            {/*overhead bar*/}
      <Typography>matches</Typography>
    </ThemeProvider>
  );
}

export default Matches;