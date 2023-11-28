import { Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import { useState, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/payments')
            .then(response => {
                setPayments(response.data); // Assuming the response.data contains the payment information
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
            });
    }, [axiosSecure]);

    return (
        <Box>
            <SectionTitle heading={'Payments'} />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Pro User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map(payment => (
                        <TableRow key={payment._id}>
                            <TableCell>{payment.email}</TableCell>
                            <TableCell>{payment.name}</TableCell>
                            <TableCell>{payment.transactionId}</TableCell>
                            <TableCell>{new Date(payment.date).toLocaleString()}</TableCell>
                            <TableCell>{payment.proUser ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Payments;
