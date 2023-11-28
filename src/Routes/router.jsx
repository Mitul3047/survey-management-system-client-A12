
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layout/MainLayout';
import Surveys from '../Pages/Surveys/Surveys';
// import { Login } from '@mui/icons-material';
// import Register from '../Pages/SignUp';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import DashBoard from '../Layout/DashBoard';
import PostSurvey from '../Pages/DashBoard/PostSurvey';
import Users from '../Pages/DashBoard/Users';
import MySurvey from '../Pages/DashBoard/mysurvey';
import SurveyDetails from '../Pages/Surveys/SurveyDetails';
import ManageSurvey from '../Pages/DashBoard/ManageSurvey';
import UpdateSurvey from '../Pages/DashBoard/UpdateSurvey';
import Payment from '../Pages/Payment';
import PrivateRoute from './PrivateRoute';
import Payments from '../Pages/DashBoard/Payments';
import AllVotes from '../Pages/DashBoard/AllVotes';
// import Survey from '../Pages/Surveys/Surveysjsx';
// import Surveys from '../Pages/Surveys/Surveys.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/surveys",
                element: <Surveys></Surveys>
            },
            {
                path: "/surveys/details/:id",
                element: <PrivateRoute><SurveyDetails></SurveyDetails></PrivateRoute>,
                
            },
            {
                path: "/payment",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>,
                
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            // user
            {
                path:'/dashboard/postSurvey',
                element:<PostSurvey></PostSurvey>
            },
            {
                path:'/dashboard/mysurvey',
                element:<MySurvey></MySurvey>
            },
            {
                path: '/dashboard/mysurvey/update/:id',
                element: <UpdateSurvey></UpdateSurvey>
            },
            // ADMIN
            {
                path:'/dashboard/managesurvey',
                element:<ManageSurvey></ManageSurvey>
            },
            {
                path:'/dashboard/users',
                element:<Users></Users>
            },
            {
                path:'/dashboard/payments',
                element:<Payments></Payments>
            },
            {
                path:'/dashboard/allvotes',
                element:<AllVotes></AllVotes>
            },
           
        ]
    }
])

export default router;