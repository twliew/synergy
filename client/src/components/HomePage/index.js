import * as React from 'react';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ViewLikes from '../People/ViewLikes';

const HomePage = () => {
    const navigate = useNavigate();
    const [showViewLikes, setShowViewLikes] = React.useState(false);

    const handleViewLikes = () => {
        setShowViewLikes(true); // Set showViewLikes to true when the "View Likes" button is clicked
    };

    const handleHideLikes = () => {
        setShowViewLikes(false); // Set showViewLikes to false when the "Hide Likes" button is clicked
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>Welcome to Synergy!</Typography>
            <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar dui non est maximus, eu ultricies mi sodales.
                Integer nec magna nec dui scelerisque finibus. Sed nec ullamcorper libero. Proin fermentum fermentum mauris,
                sed viverra ligula commodo sed. Duis sit amet urna eget leo fringilla luctus. Nulla facilisi. Donec at orci eu
                odio finibus tristique vel sed justo. Ut rhoncus lectus nisi, at aliquet justo aliquam nec. Nam at turpis dolor.
            </Typography>
            {/* "View Likes" button */}
            <Button onClick={handleViewLikes} variant="contained" color="primary">View Likes</Button>
            {/* "Hide Likes" button */}
            {showViewLikes && <Button onClick={handleHideLikes} variant="contained" color="secondary">Hide Likes</Button>}
            {/* Render the ViewLikes component only if showViewLikes is true */}
            {showViewLikes && <ViewLikes />}
        </div>
    );
}

export default HomePage;
