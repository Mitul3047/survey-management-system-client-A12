import { useState } from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import useAuth from '../../Hooks/useAuth';

const UpdateSurvey = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [surveyData, setSurveyData] = useState({
        title: '',
        description: '',
        question1: '',
        email: user?.email,
        name: user?.displayName,
        photo : user?.photoURL,
        category: '',
        like: 0,
        dislike: 0,
        time: new Date()
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSurveyData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosSecure
            .post('/surveys', surveyData)
            .then((response) => {
                console.log(response);
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: `Survey is added successfully.`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.error('Error posting survey:', error);
            });
    };

    return (
        <Box>
            <SectionTitle heading={'Post a survey'} />
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={surveyData.title}
                    onChange={handleChange}
                    fullWidth
                    margin="dense" 
                />
                <TextField
                    label="Description"
                    name="description"
                    value={surveyData.description}
                    onChange={handleChange}
                    multiline
                    fullWidth
                    margin="dense" 
                />
                <TextField
                    label="Question 1 (Yes or No)"
                    name="question1"
                    value={surveyData.question1}
                    onChange={handleChange}
                    fullWidth
                    margin="dense" 
                />

                <FormControl fullWidth margin="dense"> 
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={surveyData.category}
                        onChange={handleChange}
                        margin="dense" 
                    >
                        <MenuItem value="Technology">Technology</MenuItem>
                        <MenuItem value="Health">Health and Wellness</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Food">Food and Dining</MenuItem>
                        <MenuItem value="Sports">Sports and Fitness</MenuItem>
                        {/* Add more categories */}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default UpdateSurvey;
