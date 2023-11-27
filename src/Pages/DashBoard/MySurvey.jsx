import { Box, Button, Grid } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";
import { FaAngleDoubleUp, FaTrashAlt } from "react-icons/fa";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MySurvey = () => {
    const { user } = useAuth();
    // eslint-disable-next-line no-unused-vars
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
            <SectionTitle heading={"my surveys"} />
            <Grid container sx={{ margin: "auto", mt: 6 }} spacing={2}>
                {userSurveys.map((item) => (
                    <Grid item key={item._id} xs={12} md={6} lg={4}>
                        <Box>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    action={
                                        
                                            <Button variant="contained" sx={{ mr: 2, p: 2, backgroundColor: 'red' }} onClick={() => handleDeleteUser(item)}>
                                                <FaTrashAlt className="text-red-600" />
                                            </Button>
                                    }
                                    title={item.title}
                                    subheader={item.date}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{ height: 50 }}>
                                        {item.question1}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                <Link to={`update/${item._id}`}>
                                    <Button variant="outlined" fullWidth><FaAngleDoubleUp></FaAngleDoubleUp></Button>
                                    </Link>
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
