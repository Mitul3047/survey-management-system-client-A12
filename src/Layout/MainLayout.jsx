
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Home/Shared/NavBar';
import { Grid } from '@mui/material';

const MainLayout = () => {
    return (
        <Grid >
            <Navbar></Navbar>
            <Grid sx={{ pt: 8, background:'f1faee'}}>
                <Outlet></Outlet>
            </Grid>

        </Grid>
    );
};

export default MainLayout;