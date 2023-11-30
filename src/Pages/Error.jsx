import { Grid, Typography } from '@mui/material';

import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Grid>
            Error 
            <Link to={'/'}><Typography>Go to Home</Typography></Link>
        </Grid>
    );
};

export default Error;