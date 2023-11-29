
import { Outlet } from 'react-router-dom';
// import Navbar from '../Pages/Home/Shared/NavBar';
import { Grid } from '@mui/material';
import MainNavBar from '../Pages/Home/Shared/MainNavBar';
import Footer from '../Pages/Home/Shared/Footer';

const MainLayout = () => {
    return (
        <Grid >
            {/* <Navbar></Navbar> */}
            <MainNavBar></MainNavBar>
            <Grid sx={{ pt: 8, background: 'f1faee' }}>
                <Outlet></Outlet>
            </Grid>
            <Footer></Footer>
        </Grid>
    );
};

export default MainLayout;