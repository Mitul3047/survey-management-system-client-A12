import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Avatar,
    Menu,
    MenuItem,
    Button,
    Radio,
    TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { Link, useParams } from 'react-router-dom';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import TimeAgo from '../../Components/TimeAgo';

const SurveyDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchSurveyDetails = async () => {
            try {
                const response = await axiosPublic.get(`/surveys/${id}`);
                setSurveyDetails(response.data);
            } catch (error) {
                console.error('Error fetching survey details:', error);
            }
        };

        if (id) {
            fetchSurveyDetails();
        }
    }, [axiosPublic, id]);

    const handleClick = (event, survey) => {
        setAnchorEl(event.currentTarget);
        setSelectedSurvey(survey);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedSurvey(null);
    };

    const handleReport = () => {
        console.log(`Report survey ID: ${selectedSurvey._id}`);
        handleClose();
    };

    const handleSubmission = () => {
        if (!selectedValue) {
            alert('Please select an option.'); // Alert if no radio button is selected
        } else {
            console.log('Selected value:', selectedValue);
            console.log('Comment:', comment);
            alert('Submitted!');
            // Perform submission logic here if needed
        }
    };

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <Box sx={{ mb: 10 }}>
            <SectionTitle heading={'Survey Details'} />
            {surveyDetails && (
                <Box>
                    <Card sx={{ width: '80%', margin: 'auto' }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={surveyDetails.photo}>
                                    {/* Replace with appropriate photo data from surveyDetails */}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings" onClick={(e) => handleClick(e, surveyDetails)}>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={surveyDetails.name}
                            subheader={<TimeAgo timestamp={surveyDetails.time} />}
                        />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {surveyDetails.description}
                            </Typography>
                            <Typography variant="h5" color="text.secondary" sx={{ my: 2 }}>
                                {surveyDetails.question1}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Radio
                                    checked={selectedValue === 'yes'}
                                    onChange={handleRadioChange}
                                    value="yes"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'Yes' }}
                                />
                                <Typography variant="body1">Yes</Typography>
                                <Radio
                                    checked={selectedValue === 'no'}
                                    onChange={handleRadioChange}
                                    value="no"
                                    name="radio-buttons"
                                    inputProps={{ 'aria-label': 'No' }}
                                />
                                <Typography variant="body1">No</Typography>
                            </Box>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={handleReport}>Report</MenuItem>
                            </Menu>
                            <TextField
                                id="outlined-multiline-static"
                                label="Comment..."
                                multiline
                                rows={2}
                                sx={{ width: '80%', gridColumn: 'span 8', mr: 2 }}
                                variant="outlined"
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            <Button variant="contained" onClick={handleSubmission}>
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            )}
        </Box>
    );
};

export default SurveyDetails;
