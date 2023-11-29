
import { Box, Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
// import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { GiConfirmed } from "react-icons/gi";
import { IoIosWarning } from "react-icons/io";
import { MdCancel } from "react-icons/md";
const ManageSurvey = () => {

    // eslint-disable-next-line no-unused-vars
    const [surveys, loading, refetch] = useSurveys();
    const axiosSecure = useAxiosSecure();
   




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
    const handleDeclined = (item) => {
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
                axiosSecure.patch(`/surveys/survey/decline/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title:"Declined!",
                                text: "Your file has been Declined.",
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
        <Box sx={{width: '100%', my: 10}}>
            <SectionTitle heading={"manage surveys"}></SectionTitle>
            <TableContainer component={Paper}  >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Date<br/>YYYY-MM-DD HH:MM</TableCell>
                            <TableCell>Accept</TableCell>
                            <TableCell>Decline</TableCell>
                            <TableCell>Report Status</TableCell>
                            <TableCell>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {surveys.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.question1}</TableCell>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>
                                    {
                                        item.status === "Accept" ? <>
                                        <Box color={"green"} textAlign={'center'}><GiConfirmed/></Box>
                                        </> : 
                                        <Button variant="contained"sx={{ backgroundColor: 'green' }} onClick={() => handleAccept(item)}>
                                        <GiConfirmed />
                                        </Button>
                                    }
                                    
                                </TableCell>
                                <TableCell>
                                    {item.status === "Declined" ? <Box sx={{color:'red' }} textAlign={'center'}><MdCancel /></Box> : <Button onClick={() => handleDeclined(item)} >
                                    <MdCancel />
                                    </Button>}
                                </TableCell>
                                <TableCell>{item.Report === true && <Typography sx={{color: 'red'}}><IoIosWarning /></Typography>}</TableCell>
                                <TableCell>
                                    <Button variant="contained"  sx={{ backgroundColor: 'orange' }} onClick={() => handleDeleteUser(item)}>
                                        <FaTrashAlt></FaTrashAlt>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ManageSurvey;
