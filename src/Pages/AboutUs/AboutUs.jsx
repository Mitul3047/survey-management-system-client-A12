
import { Container, Typography, Grid } from '@mui/material';

const AboutUs = () => {
  return (
    <Container sx={{pt:10, height: "100vh ", display: 'flex', flexDirection:'column',alignItems: 'center'}} >
      <Typography  mb={5} variant="h3" align="center" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1">
            At Surveyly, we're passionate about gathering insights and opinions that matter. We believe in the power of data to drive informed decisions, and our mission is to provide a seamless platform for collecting valuable feedback.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Our team comprises dedicated individuals from diverse backgrounds, all united by the goal of simplifying the survey process and making it accessible to everyone.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            What We Offer
          </Typography>
          <Typography variant="body1">
            Surveyly offers a range of customizable survey solutions tailored to various needs. Whether you're conducting market research, gathering customer feedback, or running employee satisfaction surveys, our intuitive platform empowers you to create, distribute, and analyze surveys effortlessly.
          </Typography>
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            We prioritize user experience, ensuring that our interface is user-friendly and equipped with powerful analytics tools to derive meaningful insights from the data collected.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUs;
