
import Grid from '@mui/material/Grid';
import { Box,  Divider, List, ListItem, ListItemButton, ListItemText,  } from '@mui/material';
import {  Outlet, NavLink } from 'react-router-dom';
const fixedNavItems = [
    { name: 'Home', path: '/' },
    // { name: 'Surveys', path: '/surveys' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    // { name: 'Login', path: '/login' },
];
const NavItems = [
    { name: 'Post Survey', path: '/dashboard/postSurvey' },
    { name: 'My Survey', path: '/dashboard/mysurvey' },
    { name: 'Manage Users', path: '/dashboard/users' },
    { name: 'Manage Surveys', path: '/dashboard/managesurvey' },
    // { name: 'Contact', path: '/contact' },
    // { name: 'Login', path: '/login' },
];
const DashBoard = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3} sx={{ background: '#1d3557', minHeight: '100vh', p: 6 }}>
                <Box sx={{ mt: 10 }}>


                <List>
                        {NavItems.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center',}}>
                                    <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557',  }}>
                                        <ListItemText sx={{color:"white"}} primary={item.name} />
                                    </NavLink>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>







                    <Divider ></Divider>
                    {/* <ReactLink to={'/'}><Button fullWidth variant="contained" sx={{ mt: 2 }}>Text</Button></ReactLink> */}
                    <List>
                        {fixedNavItems.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557' }}>
                                        <ListItemText sx={{color:"white"}} primary={item.name} />
                                    </NavLink>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Grid>
            {/* Left side taking 9 spaces */}
            <Grid item xs={9}>
                <Box >
                    <Outlet></Outlet>
                </Box>
            </Grid>

            {/* Right side taking 3 spaces */}

        </Grid>
    );
};

export default DashBoard;
