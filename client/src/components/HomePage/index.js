import React, { useState, useEffect} from 'react';
import { Button, Typography, Container, Divider } from '@mui/material';
import ViewLikes from '../People/ViewLikes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const HomePage = () => {
    const [showViewLikes, setShowViewLikes] = useState(false);
    const [showDetailedInfo, setShowDetailedInfo] = useState(false);
    const [numberOfLikes, setNumnerOfLikes] = useState(0);

    const theme = createTheme({
        palette: {
          primary: {
            main: '#7487cc',
            light: '#e0c8d2',
            background: '#eeeeee'
          },
          secondary: {
            main: '#c5ceed',
          },
        },
      });

    const handleViewLikes = () => {
        setShowViewLikes(true);
    };

    const handleHideLikes = () => {
        setShowViewLikes(false);
    };

    const handleShowDetailedInfo = () => {
        setShowDetailedInfo(true);
    };
    
    const handleShowLess = () => {
        setShowDetailedInfo(false);
    };

    const fetchNumberOfLikes = () => {
        const username = localStorage.getItem('username');
        fetch(`/api/viewNumberLikes/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //parse the nested JSON string
                const nestedData = JSON.parse(data.express);
                const likeCount = nestedData.likeCount;
                setNumnerOfLikes(likeCount);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    useEffect(() => {
        fetchNumberOfLikes();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <ThemeProvider theme={theme}>
                <Container style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Typography Typography variant="h1" align="center" sx={{ fontWeight: 'bold', color: '#54555c' }}>Welcome to Synergy!</Typography>
                
                {/* Summary of what Synergy is */}
                <Typography variant="body1" gutterBottom>
                    Synergy aims to provide a platform where university students can connect with each other, build meaningful relationships, and support one another through their academic journey. By facilitating interactions between students with similar interests, hobbies, and academic pursuits, Synergy fosters a sense of community and belonging on campus. Whether it's finding study partners, joining clubs and organizations, or simply making new friends, Synergy is here to make the university experience more enjoyable and fulfilling for all students.
                </Typography>
                
                {/* Render the "What does it do?" button */}
                {!showDetailedInfo && (
                    <Button onClick={handleShowDetailedInfo} variant="contained" color="primary" style={{ margin: '10px' }}>
                        What does it do?
                    </Button>
                )}

                {/* Render detailed information about Synergy only when showDetailedInfo is true */}
                {showDetailedInfo && (
                    <div>
                        <Typography variant="body1">
                            <h3>Overhead Bar</h3>
                            <p>Use overhead tabs to navigate to various pages within the system.</p>
                            <h3>Logout</h3>
                            <p>Logout of your account by selecting Logout in the top right corner of the system.</p>
                            <h3>Profile</h3>
                            <p>Edit your profile information in by making changes in textfields and selecting Save Changes. The email and password are unchangeable.</p>
                            <ul>
                                <li>Add, edit, and delete social media</li>
                                <li>Add social media information such as platform (e.g. Instagram), username, URL, and visibility (what other users can view these)</li>
                                <li>Add hobbies and interests</li>
                                <li>Add a hobby from existing hobbies within the database in the dropdown. If you don't find a hobby, add a new hobby in the below textfield and select Add Hobby. Save Interests to maintain all changes.</li>
                            </ul>
                            <h3>People</h3>
                            <p>Discover other users registered in the system.</p>
                            <ul>
                                <li>Scroll through and view other users' profile information</li>
                                <li>Filter based on one certain hobby or multiple hobbies or interests</li>
                                <li>Like another user using a Like button for each user</li>
                                <li>The View Likes button brings you to a list of other Synergy users that have liked you, you can access this button below or on the People page</li>
                                <li>Return to the main People page by clicking on the Back to People button</li>
                            </ul>
                            <h3>Matches</h3>
                            <p>View your Matches!</p>
                            <ul>
                                <li>Matches are a list of users who you have liked, and have liked you back.</li>
                                <li>Change your mind? You're free to remove your like from a profile.</li>
                                <li>You can view all profile information and connect with them outside of Synergy!</li>
                            </ul>
                        </Typography>
                        <Button onClick={handleShowLess} variant="contained" color="secondary" style={{ margin: '10px' }}>
                            Show Less
                        </Button>
                    </div>
                )}
                <Divider component="li" />
                {/* "View Likes" button */}
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Quick View</Typography>
                <Typography>Preview Users Who Like You</Typography>
                <Button onClick={handleViewLikes} variant="contained" style={{ margin: '10px' }}>
                    View Likes: {numberOfLikes}
                </Button>
                
                {/* "Hide Likes" button */}
                {showViewLikes && (
                    <Button onClick={handleHideLikes} variant="contained" color="secondary" style={{ margin: '10px'}}>
                        Hide Likes
                    </Button>
                )}
                
                {/* Render the ViewLikes component only if showViewLikes is true */}
                {showViewLikes && <ViewLikes />}
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default HomePage;
