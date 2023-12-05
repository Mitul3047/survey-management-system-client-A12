import  { useEffect, useState } from 'react';
import { Box, Typography, Grid, CardHeader, Card, Avatar, CardContent, CardActions, IconButton, Button,  } from '@mui/material';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { red } from '@mui/material/colors';
import TimeAgo from './TimeAgo';
import { Link } from 'react-router-dom';
import SectionTitle from './Utiles/SetTheme/SectionTitle/SectionTitle';

const NewlyPosted = () => {
    const axiosPublic = useAxiosPublic();
    const [surveys, setSurveys] = useState([]);
    const acceptedSurveys = surveys.filter(survey => survey.status === "Accept");
    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                const response = await axiosPublic.get('/surveys');
                // Assuming the survey data is an array, update the state with the fetched data
                setSurveys(response.data);
            } catch (error) {
                // Handle error if the request fails
                console.error('Error fetching surveys:', error);
            }
        };

        fetchSurveys(); // Fetch surveys when the component mounts
    }, [axiosPublic]); // Ensure to include axiosPublic in the dependency array if it's used inside useEffect

    // Sort surveys based on creation time in descending order (most recent first)
    const sortedSurveys = acceptedSurveys
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 6);

    return (
        <Box sx={{width: '70%', margin:'auto'}}>
            <SectionTitle heading={'Latest Survey'}></SectionTitle>
            <Grid container spacing={2}>
                {sortedSurveys.length > 0 ? (
                    sortedSurveys.map((item) => (
                        <Grid key={item._id} item xs={12} sm={6} md={4} >
                            <Box>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={item?.photo}>

                                        </Avatar>
                                    }
                                   
                                    title={item.name} // Replace with your survey title data
                                    subheader={<TimeAgo timestamp={item?.time} />} // Replace with your survey date data
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ height: 150 }}>
                                        {item.description} {/* Replace with your survey description data */}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="share">
                                        <Link to={`surveys/details/${item._id}`}><Button>See Details</Button></Link>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Box>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography>No surveys available</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default NewlyPosted;
