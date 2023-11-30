
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
// import AllVotes from '../Pages/DashBoard/AllVotes';
import SurveyourVote from '../Pages/surveyourVote';
import AboutUs from '../Pages/AboutUs/AboutUs';
import ContactUs from '../Pages/ContactUs';
import UserPaymentHistory from '../Pages/DashBoard/UserPaymentHistory';
import AdminRoute from './AdminRoute';
import SurveyourRoute from './SurveyorRoute';
import Error from '../Pages/Error';
// import Survey from '../Pages/Surveys/Surveysjsx';
// import Surveys from '../Pages/Surveys/Surveys.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        errorElement:<Error></Error>,
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
            {
                path: "/about",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contact",
                element: <ContactUs></ContactUs>
            },

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path:'/dashboard/mypayments',
                element:<UserPaymentHistory></UserPaymentHistory>
            },
            // surveyour
            {
                path:'/dashboard/postSurvey',
                element:<PostSurvey></PostSurvey>
            },
            {
                path:'/dashboard/mysurvey',
                element:<SurveyourRoute><MySurvey></MySurvey></SurveyourRoute>,
            },
            {
                path:'/dashboard/mysurvey/vote',
                element:<SurveyourRoute><SurveyourVote></SurveyourVote></SurveyourRoute>,
            },
            {
                path: '/dashboard/mysurvey/update/:id',
                element: <SurveyourRoute><UpdateSurvey></UpdateSurvey></SurveyourRoute>,
                loader: ({params}) => fetch(`https://survey-api-three.vercel.app/surveys/${params.id}`)
            },
            
            // ADMIN
            {
                path:'/dashboard/managesurvey',
                element:<AdminRoute><ManageSurvey></ManageSurvey></AdminRoute>
            },
            {
                path:'/dashboard/users',
                element:<AdminRoute><Users></Users></AdminRoute>
            },
            {
                path:'/dashboard/payments',
                element:<AdminRoute><Payments></Payments></AdminRoute>
            },
            {
                path:'/dashboard/allvotes',
                element: <AdminRoute><Payments></Payments></AdminRoute>
            },
           
        ]
    }
])

export default router;