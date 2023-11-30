import { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import TimeAgo from '../../Components/TimeAgo';
import useAuth from '../../Hooks/useAuth';
import useUser from '../../Hooks/useUser';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Votes from '../../Components/Votes';
import useVote from '../../Hooks/useVote';
import moment from 'moment';

const SurveyDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [surveyDetails, setSurveyDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [vots, setVots] = useState('');
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const [users, , refetch] = useUser();
    const [comments, setComments] = useState([]);
    const [votes] = useVote();
    const filterUser = users.filter((survey) => survey?.email === user?.email);
    const proUserTrue = filterUser[0]?.proUser;
   
    const newfilterUser = users.find((survey) => survey?.email === user?.email);
    const newproUserTrue = newfilterUser?.proUser;
    console.log('old',proUserTrue,'new',newproUserTrue);
    
    
    const filterVotedSurvey = votes.filter((vote) => vote.surveyId === id)
    const filtervotedemail = votes.filter((vote) => vote.email === user?.email)
    console.log("&&", filterVotedSurvey[0]?._id , id);
    console.log(filtervotedemail[0]?.email, user?.email);
    const votedID =filterVotedSurvey[0]?._id
    const votedEmail = filtervotedemail[0]?.email
    console.log("vs",votedID,votedEmail);
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

    console.log(selectedSurvey);

    const handleReport = (selectedSurvey) => {
        console.log(`Report survey ID: ${selectedSurvey._id}`);
        axiosSecure
            .patch(`/surveys/report/${selectedSurvey._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `Survey has been reported!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: `Failed to report survey.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error('Error reporting survey:', error);
                Swal.fire({
                    icon: "error",
                    title: `Failed to report survey.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        handleClose();
    };


    const handleSubmission = async () => {
        if (!selectedValue) {
          Swal.fire({
            icon: 'error',
            title: `Please Select Your Answer`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          try {
            const postData = {
              surveyId: id,
              surveyourMail: surveyDetails.email,
              name: user?.displayName,
              photo: user?.photoURL,
              email: user?.email,
              question: surveyDetails.question1,
              selectedValue: selectedValue,
              comment: vots,
              time: moment.utc(new Date()).format('YYYY-MM-DD HH:mm'),
            };
    
            const response = await axiosSecure.post('/vote', postData);
    
            console.log('Server response:', response.data);
    
            if (response.data.insertedId) {
              Swal.fire({
                icon: 'success',
                title: `Voted successfully.`,
                showConfirmButton: false,
                timer: 1500,
              });
              // Reload the page or refresh data here
              // location.reload()
              // refetch()
              setVots('');
            }
          } catch (error) {
            console.error('Error submitting data:', error);
          }
        }
      };



    const handleCommentProUser = () => {
        if (!newproUserTrue) {
            return Swal.fire({
                icon: 'warning',
                title: `Upgrade to pro to comment`,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleCommentChange = (event) => {
        setVots(event.target.value);
    };



    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axiosSecure.get('/vote'); // Assuming the endpoint is '/comments'
                setComments(response.data); // Assuming comments are within response.data
            } catch (error) {
                // Handle error, e.g., log it or show a message to the user
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [axiosSecure]);

    console.log(comments);


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
                            <Box sx={{ display: 'flex' }}>
                                <Typography>Be a pro user to Comment</Typography>
                                <Typography variant="body1" sx={{ color: 'red' }}>*</Typography>
                            </Box>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem onClick={() => handleReport(selectedSurvey)}>Report</MenuItem>
                                {/* onClick={() => handleMakeAdmin(user)}  */}
                            </Menu>

                            {newproUserTrue ? (
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Comment..."
                                    multiline
                                    rows={2}
                                    sx={{ width: '80%', gridColumn: 'span 8', mr: 2 }}
                                    variant="outlined"
                                    value={vots}
                                    onChange={handleCommentChange}
                                />
                            ) : (
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Comment..."
                                    multiline
                                    rows={2}
                                    sx={{ width: '80%', gridColumn: 'span 8', mr: 2 }}
                                    variant="outlined"
                                    value={vots}
                                    onChange={handleCommentProUser}

                                />
                            )}
                            <Button variant="contained" onClick={handleSubmission}>
                                Submit
                            </Button>
                        </CardActions>
                        <Votes id={id}></Votes>
                    </Card>

                </Box>
            )}

        </Box>
    );
};

export default SurveyDetails;
