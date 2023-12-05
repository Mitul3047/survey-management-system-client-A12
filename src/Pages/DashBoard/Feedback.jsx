import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';

const Feedback = () => {
    const axiosPublic = useAxiosPublic();
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        axiosPublic.get('/contact')
            .then(response => {
                // Assuming response.data is an array of feedback objects
                setFeedbackData(response.data);
            })
            .catch(error => {
                console.error('Error fetching feedback data:', error);
            });
    }, [axiosPublic]);

    return (
        <Box>
            <SectionTitle heading={'User FeedBack from Contact Us'}></SectionTitle>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {feedbackData.map((feedback, index) => (
                        <TableRow key={feedback._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{feedback.name}</TableCell>
                            <TableCell>{feedback.email}</TableCell>
                            <TableCell>{feedback.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
};

export default Feedback;
