
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Grid
        container
        sx={{
            backgroundImage: `url('https://images.unsplash.com/photo-1634117622592-114e3024ff27?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // Add your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh', // Set your desired height
            color: '#1d3557', // Adjust text color for better visibility
            textAlign: 'center',
        }}
    >
        <Grid item xs={12}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Typography gutterBottom variant="h2" component="div" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Welcome to SurveyMaster
                </Typography>
                <Typography gutterBottom variant="p" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Empowering Insights Through Your Feedback
                </Typography>
    
                <Link to={'/surveys'}>
                    <Button variant="contained" color="primary">
                        Explore Surveys
                    </Button>
                </Link>
            </Box>
        </Grid>
    </Grid>
    
    );
};

export default Banner;
