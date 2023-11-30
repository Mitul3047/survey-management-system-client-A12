
import Grid from '@mui/material/Grid';
import { Box, Divider, List, ListItem, ListItemButton, ListItemText, } from '@mui/material';
import { Outlet, NavLink } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useSurveyor from '../Hooks/useSurveyor';
const fixedNavItems = [
    { name: 'Home', path: '/' },

];
const userNavItems = [
    { name: 'payments', path: '/dashboard/mypayments' },

];
const SurveyorNavItems = [
    { name: 'Post Survey', path: '/dashboard/postSurvey' },
    { name: 'My Survey', path: '/dashboard/mysurvey' },
    { name: 'My Survey Vote', path: '/dashboard/mysurvey/vote' },
];
const AdminNavItems = [
    { name: 'Manage Users', path: '/dashboard/users' },
    { name: 'Manage Surveys', path: '/dashboard/managesurvey' },
    { name: 'Payments', path: '/dashboard/payments' },
    { name: 'All Votes', path: '/dashboard/allvotes' },
];



const DashBoard = () => {

    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    const [isSurveyor]= useSurveyor()
    // const isSurveyor = true;
    return (
        <Grid container spacing={2}>
            <Grid item xs={2} sx={{ background: '#1d3557', minHeight: '100vh' }}>
                <Box sx={{ mt: 10 }}>


                    {
                        isSurveyor &&
                        <>
                            <List>
                                {SurveyorNavItems.map((item) => (
                                    <ListItem key={item.name} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center', }}>
                                            <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557', }}>
                                                <ListItemText sx={{ color: "white" }} primary={item.name} />
                                            </NavLink>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider></Divider>
                        </>
                    }

                    {
                        isAdmin &&
                        <>
                            <List>
                                {AdminNavItems.map((item) => (
                                    <ListItem key={item.name} disablePadding>
                                        <ListItemButton sx={{ textAlign: 'center' }}>
                                            <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557' }}>
                                                <ListItemText sx={{ color: "white" }} primary={item.name} />
                                            </NavLink>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>


                            <Divider ></Divider>
                        </>
                    }
{
    !isAdmin && !isSurveyor &&
    <List>
    {userNavItems.map((item) => (
        <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
                <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557' }}>
                    <ListItemText sx={{ color: "white" }} primary={item.name} />
                </NavLink>
            </ListItemButton>
        </ListItem>
    ))}
</List>
}

                    {/* <ReactLink to={'/'}><Button fullWidth variant="contained" sx={{ mt: 2 }}>Text</Button></ReactLink> */}
                    <List>
                        {fixedNavItems.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <NavLink to={item.path} style={{ textDecoration: 'none', color: '#1d3557' }}>
                                        <ListItemText sx={{ color: "white" }} primary={item.name} />
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
