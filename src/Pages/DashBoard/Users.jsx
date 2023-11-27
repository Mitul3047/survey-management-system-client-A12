import { Box, Button, Typography } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaTrashAlt, FaUsers, FaBookOpen } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const handleMakeSurveyor = user => {
        axiosSecure.patch(`/users/surveyor/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an Surveyor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

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
                    })
            }
        });
    }

    return (
        <Box >
            <SectionTitle heading={"Users List"} />
            <Box sx={{width: '95%', margin:'auto'}}>
            <Box sx={{display:"flex", gap: 2, justifyContent:"end",mb:2}}>
                <Typography><FaUsers /> User</Typography>
                <Typography><FaBookOpen /> Surveyor</Typography>
                <Typography><FaTrashAlt /> Delete</Typography></Box>
            <Box>
                {users.map((user) => (
                    <Box key={user._id} display="flex" alignItems="center" justifyContent="space-between" marginBottom={1}>
                        <h3>{user.name}</h3>
                        <Box>
                            {
                                user.admin === true ? <Button sx={{ mr: 2, p: 2 }} variant='outlined' disabled><FaUsers /></Button>
                                    :
                                    <Button variant="contained" sx={{ p: 2 }} color="primary" onClick={() => handleMakeAdmin(user)} ><FaUsers /></Button>
                            }
                            {
                                user.surveyor === true ? <Button sx={{ mr: 2, p: 2 }} variant='outlined' disabled><FaBookOpen /></Button>
                                    :
                                    <Button variant="contained" sx={{ ml: 2, mr: 2, p: 2 }} color="secondary" onClick={() => handleMakeSurveyor(user)} ><FaBookOpen /></Button>
                            }
                            <Button variant="contained" sx={{  p: 2 }} onClick={() => handleDeleteUser(user)}> <FaTrashAlt className="text-red-600"></FaTrashAlt></Button>

                        </Box>
                    </Box>
                ))}
            </Box>
            </Box>

        </Box>
    );
};

export default Users;
