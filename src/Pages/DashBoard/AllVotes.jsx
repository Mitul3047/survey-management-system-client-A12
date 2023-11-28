import { Box, Table, TableHead, TableBody, TableRow, TableCell, } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AllVotes = () => {
    const [surveyData, setSurveyData] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/vote')
            .then(response => {
                setSurveyData(response.data); // Assuming the response.data contains the survey data
            })
            .catch(error => {
                console.error('Error fetching survey data:', error);
            });
    }, [axiosSecure]);

    return (
        <Box>
            <SectionTitle heading={'Survey Data'} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Question</TableCell>
                        <TableCell>Selected Value</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {surveyData.map(data => (
                        <TableRow key={data._id}>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.email}</TableCell>
                            <TableCell>{data.question}</TableCell>
                            <TableCell>{data.selectedValue}</TableCell>
                            <TableCell>{data.comment}</TableCell>
                            <TableCell>{new Date(data.time).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default AllVotes;
