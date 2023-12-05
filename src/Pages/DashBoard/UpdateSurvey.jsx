
import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../Hooks/useAuth';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import SectionTitle from '../../Components/Utiles/SetTheme/SectionTitle/SectionTitle';
import { useState } from 'react';
import Swal from 'sweetalert2';

const UpdateSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();
//   const { user } = useAuth(); // Assuming useAuth provides user details

  // Assuming useLoaderData provides initial survey data
  const {  title: initialTitle, description: initialDescription, question1: initialQuestion1, category: initialCategory } = useLoaderData();

  // State to manage form data
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [question1, setQuestion1] = useState(initialQuestion1);
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState(initialCategory);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a PATCH request to update the survey using axiosSecure
      await axiosSecure.patch(`/surveys/${id}`, {
        title,
        description,
        question1,
        category,
        // Any other fields you want to update
      });
      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: 'Your message has been sent successfully.',
      });
      navigate('/dashboard/mysurvey')

      // Optionally, you can add logic here to handle success or redirect the user
      // For example: history.push('/survey-updated');
    } catch (error) {
      // Handle error, e.g., show an error message
      console.error('Error updating survey:', error);
    }
  };

  return (
    <>
    <SectionTitle heading={'Upadte your Post'}></SectionTitle>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Question 1"
            variant="outlined"
            fullWidth
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Survey
          </Button>
        </Grid>
      </Grid>
    </form>
    </>
  );
};

export default UpdateSurvey;
