import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
// import useAdmin from "../Hooks/useAdmin";
import useSurveyor from "../Hooks/useSurveyor";
import { Box, CircularProgress } from "@mui/material";




const SurveyourRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isSurveyor, isSurveyorLoading] = useSurveyor()
    // const [isAdmin, isAdminLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return  <Box sx={{ display: 'flex',alignItems:'center', justifyContent:'center', hight:'500' }}>
        <CircularProgress />
      </Box>
    }

    if (user && isSurveyor) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default SurveyourRoute;