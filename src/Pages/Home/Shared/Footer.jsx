
import { Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: '#1d3557', color: '#fff', padding: '20px 0' }}
      >
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            © 2023 SurveyMaster. All rights reserved 
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" align="center">
            Created with love by MITUL.
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
