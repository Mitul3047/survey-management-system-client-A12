import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import SectionTitle from "../../Components/Utiles/SetTheme/SectionTitle/SectionTitle";

const UserPaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosPublic();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        axiosSecure.get('/payments')
            .then(response => {
                // Assuming response.data contains the payment information array
                setPayments(response.data);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
            });
    }, [axiosSecure]);

    const filteredPayments = payments.filter(item => item.email === user.email);

    return (
        <div>
            <SectionTitle heading={'My Payments'}></SectionTitle>
            <TableContainer component={Paper}>
                <Table aria-label="payment history table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayments.map((payment, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{payment.transactionId}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserPaymentHistory;
