// import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log('state in the location login page', location.state)

  const onSubmit = (data) => {
    console.log(data.email, data.password);
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'User Login Successful.',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
        navigate(from, { replace: true });
      })
  };

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
      <Typography variant="h4" sx={{ color: '#457b9d' }} gutterBottom>
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('email', { required: true })}
          id="outlined-basic"
          label="Email"
          name='email'
          type='email'
          variant="outlined"
          fullWidth
          error={errors.email ? true : false}
          helperText={errors.email ? 'Email is required' : ''}
        />
        <TextField
          {...register('password', { required: true })}
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          error={errors.password ? true : false}
          helperText={errors.password ? 'Password is required' : ''}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ background: '#1d3557', color: 'white' }}>
          Login
        </Button>
        <Divider sx={{ my: 2, width: '100%' }} />
        <Button variant="outlined" fullWidth>
          Login with Google
        </Button>
      </Box>
      <p><small>Do not have an account? <Link to="/signup">Register</Link></small></p>
    </Container>
  );
};

export default Login;
