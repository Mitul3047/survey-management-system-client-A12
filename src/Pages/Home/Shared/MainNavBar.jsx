import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, Avatar, Menu, MenuItem } from '@mui/material';
import ProUserModal from './ProUserModal';
import useAuth from '../../../Hooks/useAuth';
import { red } from '@mui/material/colors';

const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Surveys', path: '/surveys' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function MainNavbar(props) {
  const { user, logOut } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };


  const handleLogOut = () => {
    logOut()
        .then(() => { })
        .catch(error => console.log(error));
}

  const avatarMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleAvatarClose}
      onClick={handleAvatarClose}
    >
      <MenuItem sx={{ px: 4 }}>{user?.displayName}</MenuItem>
      <MenuItem sx={{ px: 4 }}>{user?.email}</MenuItem>
      <Divider />
      <MenuItem sx={{ px: 4 }}>
 
          <Button fullWidth variant="outlined" 
          component={Link}
          to='/dashboard'>
            Dashboard
          </Button>

      </MenuItem>
      <MenuItem sx={{ px: 4 }}>

          <Button fullWidth onClick={handleOpen} variant="outlined">
            Be A Pro User
          </Button>

      </MenuItem>
      <MenuItem  onClick={handleLogOut} sx={{ px: 4,}}>Logout</MenuItem>
    </Menu>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: '#1d3557' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
      SurveyMaster
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink to={item.path} style={{ textDecoration: 'none', color: 'white' }}>
                <ListItemText primary={item.name} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: '#1d3557', py: 1 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              SurveyMaster
            </Typography>
            {
            user && (
              <Avatar
              sx={{ bgcolor: red[500], cursor: 'pointer', ml: 2 }}  
                src={user?.photoURL} // Assuming user.photoURL holds the image URL
                onClick={handleAvatarClick}
              />
            )
            }
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button key={item.name} sx={{ color: '#fff' }}>
                  <NavLink
                    to={item.path}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.name}
                  </NavLink>
                </Button>
              ))}
              {!user && (
                <Button key="Login" sx={{ color: '#fff' }}>
                  <NavLink to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Login
                  </NavLink>
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
        {avatarMenu}
        <ProUserModal open={open} handleClose={handleClose} />
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

MainNavbar.propTypes = {
  window: PropTypes.func,
};

export default MainNavbar;
