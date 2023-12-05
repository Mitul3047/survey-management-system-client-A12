import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert2
import useAxiosPublic from '../Hooks/useAxiosPublic';

const ContactUs = () => {
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.post('/contact', formData);
      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Submitted!',
        text: 'Your message has been sent successfully.',
      });
      console.log('Form submitted successfully!');
      // You can also reset the form fields after submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again!',
      });
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <Container  sx={{pt:10, height: "100vh ", display: 'flex', flexDirection:'column',alignItems: 'center'}}>
      <Typography pt={5} variant="h3" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Have a question or feedback? Feel free to reach out to us by filling out the form below.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            You can also contact us directly at:
            <br />
            Email: contact@surveyly.com
            <br />
            Phone: +1 (555) 123-4567
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
