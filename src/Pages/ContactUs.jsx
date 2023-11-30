import React from 'react';
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., send email, store data, etc.)
    // You can implement your own logic using form data
  };

  return (
    <Container sx={{height: '78vh'}}>
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
                <TextField fullWidth label="Your Name" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email Address" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
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
