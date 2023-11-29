import  { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const SurveyourVote = () => {
    const { user } = useAuth();
    const axiosSucre = useAxiosSecure();
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        axiosSucre.get('/vote')
            .then(response => {
                setVotes(response.data); // Assuming the response.data is an array of votes
            })
            .catch(error => {
                console.error('Error fetching votes:', error);
            });
    }, [axiosSucre]);

    const mySurveyVote = votes.filter(response => response.surveyourMail === user.email);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surveyor Mail</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Selected Value</TableCell>
                            <TableCell>Comment</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>Time <br></br>YYYY-MM-DD HH:MM </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mySurveyVote.map(vote => (
                            <TableRow key={vote._id} >
                                <TableCell>{vote.name}</TableCell>
                                <TableCell>{vote.surveyourMail}</TableCell>
                                <TableCell>{vote.question}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{vote.selectedValue}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{vote.comment ? vote.comment: 'N/A'}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{vote.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default SurveyourVote;
