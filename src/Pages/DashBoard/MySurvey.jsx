import { Box, Button,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useSurveys from "../../Hooks/useSurveys";
import { FaAngleDoubleUp, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";

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


            <Box sx={{width: '100%', my: 10}}>

            <TableContainer component={Paper}  >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell sx={{textAlign:'center'}}>Date<br/>YYYY-MM-DD HH:MM</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Report Status</TableCell>
                            <TableCell>Admin Message</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userSurveys.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.question1}</TableCell>
                                <TableCell>{item.time}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{item.Report ? <Box color={'red'}><IoIosWarning/></Box> : 'N/A'}</TableCell>
                                <TableCell>{
                                    item.message ?
                                    <small>{item.message}</small> : 'N/A'}</TableCell>
                                <TableCell>
                                <Link to={`update/${item._id}`}>
                                        <Button variant="outlined" fullWidth><FaAngleDoubleUp></FaAngleDoubleUp></Button>
                                    </Link>
                                </TableCell>
                                <TableCell onClick={() => handleDeleteUser(item)}><Button sx={{color: 'orange'}}><FaTrashAlt></FaTrashAlt></Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </Box>
    );
};

export default MySurvey;
