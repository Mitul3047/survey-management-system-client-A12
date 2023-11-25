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

const drawerWidth = 240;
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Surveys', path: '/surveys' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' },
];

function MainNavbar(props) {
  const { user } = useAuth();
  console.log(user);
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

  const avatarMenu = (
    <Menu

      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleAvatarClose}
      onClick={handleAvatarClose}
    >
      <MenuItem sx={{ px: 4 }}>{user?.displayName
      }</MenuItem>
      <MenuItem sx={{ px: 4 }}>{user?.email}</MenuItem>
      <Divider />
      {/* <NavLink to={'/dashboard'}><MenuItem sx={{ px: 4, textDecoration: 'none' }}>Dashboard</MenuItem></NavLink> */}
      <MenuItem sx={{ px: 4 }}>
        <Link to={'/dashboard'}>
          <Button fullWidth  variant="outlined" >
            Dashboard
          </Button>
        </Link>
      </MenuItem>
      <MenuItem sx={{ px: 4 }}>
        <Link to="#">
          <Button fullWidth onClick={handleOpen} variant="outlined" >
            Be A Pro User
          </Button>
        </Link>
      </MenuItem>
      <MenuItem sx={{ px: 4 }}>Logout</MenuItem>
    </Menu>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', background: '#1d3557' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'white' }}>
        SURVEY
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
              SURVEY
            </Typography>
            {
              user &&

              <Avatar
                alt="User Avatar"
                src={user?.photoURL} // Assuming user.photoURL holds the image URL
                sx={{ cursor: 'pointer', ml: 2 }}
                onClick={handleAvatarClick}
              />

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
