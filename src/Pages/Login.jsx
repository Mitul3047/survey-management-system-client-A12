
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Login = () => {
  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: { xs: '80%', sm: '80%', md: '80%', lg: '50%' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: '0 auto',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
        onSubmit={handleLogin}
      >
        <TextField id="outlined-basic" label="Email" name='email' variant="outlined" fullWidth />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          name='password'
        />
        <Button type="submit" variant="contained" fullWidth sx={{ background: '#1d3557', color: 'white' }}>
          Login
        </Button>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Button variant="outlined" fullWidth>
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
