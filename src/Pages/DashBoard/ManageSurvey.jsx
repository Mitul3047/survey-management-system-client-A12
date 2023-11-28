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
import Menu from '@mui/material/Menu';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
// import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageSurvey = () => {

    // eslint-disable-next-line no-unused-vars
    const [surveys, loading, refetch] = useSurveys();
    const axiosSecure = useAxiosSecure();
    const [anchorEl, setAnchorEl] = useState(null);


    // eslint-disable-next-line no-unused-vars
    const handleClick = (event, survey) => {
        setAnchorEl(event.currentTarget);
        // setSelectedSurvey(survey);
    };

    const handleClose = () => {
        setAnchorEl(null);
        // setSelectedSurvey(null);
    };


    const handleDeleteUser = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/surveys/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleAccept = item => {
        axiosSecure.patch(`/surveys/survey/${item._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `Accepted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <Box>
            <SectionTitle heading={"manage surveys"}></SectionTitle>
            <Grid container sx={{ width: '100%', margin: "auto", mt: 6 }} spacing={2}>
                {surveys.map((item) => (
                    <Grid item key={item._id} xs={12} md={6} lg={4} >
                        <Box>
                            <Card sx={{ maxWidth: 345}}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={item?.photo}>

                                        </Avatar>
                                    }
                                    action={
                                        <>
                                        <Button variant="contained" sx={{ mr: 2, p: 2, backgroundColor: 'red' }} onClick={() => handleDeleteUser(item)}>
                                            <FaTrashAlt className="text-red-600" />
                                        </Button>
</>
                                    }
                                    title={item.name} // Replace with your survey title data
                                    subheader={item.date} // Replace with your survey date data
                                />
                                <CardContent sx={{height: 100 }}>
                                    <Typography variant="h6" >
                                        {item.title} {/* Replace with your survey description data */}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.question1} {/* Replace with your survey description data */}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>

                                    <IconButton >

                                        {/*   to={`details/${item._id}`}><Button>See Details</Button></Link> */}
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >

                                    </Menu>
                                    { item.status ==="Accept" ? <Typography sx={{color:'green'}}>Accept</Typography>:<Button variant="outlined" fullWidth sx={{m:2}} onClick={() => handleAccept(item)}>
                                           Accept
                                        </Button>
                                        }
                                </CardActions>

                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ManageSurvey;
