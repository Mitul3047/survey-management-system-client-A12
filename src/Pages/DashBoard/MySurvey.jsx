import { Box, Button, Grid } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";
import { FaTrashAlt } from "react-icons/fa";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MySurvey = () => {
    const { user } = useAuth();
    const [surveys, loading, refetch] = useSurveys();
    const axiosSecure = useAxiosSecure();
    const userSurveys = surveys.filter(survey => survey?.email === user?.email);

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

    return (
        <Box>
            <SectionTitle heading={"surveys"} />
            <Grid container sx={{ width: '70%', margin: "auto", mt: 6 }} spacing={2}>
                {userSurveys.map((item) => (
                    <Grid item key={item._id} xs={12} md={6} lg={4}>
                        <Box>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={item.title}
                                    subheader={item.date}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item.image}
                                    alt={item.alt}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <Button variant="contained" sx={{ mr: 2, p: 2 }} onClick={() => handleDeleteUser(item)}>
                                        <FaTrashAlt className="text-red-600" />
                                    </Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MySurvey;
