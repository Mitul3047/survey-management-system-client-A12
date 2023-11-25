// import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
// import SocialLogin from "../../components/SocialLogin";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const navigate = useNavigate();
    const { createUser, updateUserProfile,logOut } = useAuth();
    const onSubmit = data => {
        console.log(data); // Handle form submission logic here
        // reset(); // Reset form after submission
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    // create user entry in the database
                    const userInfo = {
                        name: data.name,
                        email: data.email
                    }
                    axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                console.log('user added to the database')
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                logOut()
                                .then(() => { })
                                .catch(error => console.log(error));
                                // navigate('/login');
                            }
                        })


                })
                .catch(error => console.log(error))
        })
    };

    return (
        <Container      maxWidth="lg"
        sx={{
          width: { xs: '80%', sm: '80%', md: '80%', lg: '50%' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin: '0 auto',
        }}>
            <Typography variant="h4" gutterBottom>
                Sign up now!
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
                    {...register("name", { required: true })}
                    label="Name"
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name ? 'Name is required' : ''}
                />
                <TextField
                    {...register("photoURL", { required: true })}
                    label="Photo URL"
                    fullWidth
                    error={errors.photoURL ? true : false}
                    helperText={errors.photoURL ? 'Photo URL is required' : ''}
                />
                <TextField
                    {...register("email", { required: true })}
                    label="Email"
                    type="email"
                    fullWidth
                    error={errors.email ? true : false}
                    helperText={errors.email ? 'Email is required' : ''}
                />
                <TextField
                    {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    })}
                    label="Password"
                    type="password"
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={
                        errors.password?.type === 'required' ? 'Password is required' :
                        errors.password?.type === 'minLength' ? 'Password must be 6 characters' :
                        errors.password?.type === 'maxLength' ? 'Password must be less than 20 characters' :
                        errors.password?.type === 'pattern' ? 'Password must have one Uppercase one lower case, one number and one special character.' :
                        ''
                    }
                />
                <Button type="submit" variant="contained" fullWidth sx={{ background: '#1d3557', color: 'white' }}>
                    Sign Up
                </Button>
            </Box>
            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>
            {/* <SocialLogin /> */}
        </Container>
    );
};

export default SignUp;
