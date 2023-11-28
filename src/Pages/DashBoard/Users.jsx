import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers, FaBookOpen, FaChild, FaEnvelope, FaDollarSign } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleMakeSurveyor = user => {
        axiosSecure.patch(`/users/surveyor/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is a Surveyor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeleteUser = user => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <Box>
            <SectionTitle heading={"Manager user"} />
            <Box sx={{ width: '95%', margin: 'auto' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><FaChild /> User</TableCell>
                                <TableCell><FaEnvelope/> Email</TableCell>
                                <TableCell align="center"><FaUsers /> Admin</TableCell>
                                <TableCell align="center"><FaBookOpen /> Surveyor</TableCell>
                                <TableCell align="center"><FaDollarSign /> Pro User</TableCell>
                                <TableCell align="center"><FaTrashAlt /> Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell align="center">
                                        {user.admin ? (
                                            <Button  variant='outlined' disabled><FaUsers /></Button>
                                        ) : (
                                            <Button variant="contained"  color="primary" onClick={() => handleMakeAdmin(user)} ><FaUsers /></Button>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.surveyor ? (
                                            <Button  variant='outlined' disabled><FaBookOpen /></Button>
                                        ) : (
                                            <Button variant="contained"  color="secondary" onClick={() => handleMakeSurveyor(user)} ><FaBookOpen /></Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {user.proUser && <Button  variant='outlined' disabled><FaDollarSign></FaDollarSign></Button>}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained"  onClick={() => handleDeleteUser(user)}><FaTrashAlt className="text-red-600" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Users;
