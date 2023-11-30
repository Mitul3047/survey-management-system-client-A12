import { useState } from 'react';
import { Box, Button, Grid } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
import { Link } from 'react-router-dom';
import TimeAgo from '../../Components/TimeAgo';

const Surveys = () => {
    const [surveys] = useSurveys();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const acceptedSurveys = surveys.filter(survey => survey.status === "Accept");
    const handleClick = (event, survey) => {
        setAnchorEl(event.currentTarget);
        setSelectedSurvey(survey);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedSurvey(null);
    };

    const handleReport = () => {
        // Logic to handle reporting the selected survey
        // You can perform an action here when the user selects "Report"
        console.log(`Report survey ID: ${selectedSurvey._id}`);
        handleClose();
    };

    return (
        <Box sx={{ mb: 10 }}>
            <SectionTitle heading={"surveys"}></SectionTitle>
            <Grid container sx={{ width: '70%', margin: "auto", mt: 6 }} spacing={2}>
                {acceptedSurveys.map((item) => (
                    <Grid item key={item._id} xs={12} md={6} lg={4}>
                        <Box>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={item?.photo}>

                                        </Avatar>
                                    }
                                    // action={
                                    //     <IconButton aria-label="settings" onClick={(e) => handleClick(e, item)}>
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    title={item.name} // Replace with your survey title data
                                    subheader={<TimeAgo timestamp={item?.time} />} // Replace with your survey date data
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ height: 150 }}>
                                        {item.description} {/* Replace with your survey description data */}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton> */}
                                    <IconButton aria-label="share">
                                        <Link to={`details/${item._id}`}><Button>See Details</Button></Link>
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        {/* <MenuItem onClick={handleReport}>Report</MenuItem> */}
                                    </Menu>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Surveys;
