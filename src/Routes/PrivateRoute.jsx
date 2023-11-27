import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { Box, CircularProgress } from "@mui/material";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return    <Box sx={{ display: 'flex',alignItems:'center', justifyContent:'center', hight:'500' }}>
        <CircularProgress />
      </Box>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;