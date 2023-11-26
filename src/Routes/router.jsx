
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
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <DashBoard></DashBoard>,
        children: [
            {
                path:'/dashboard/postSurvey',
                element:<PostSurvey></PostSurvey>
            },
            {
                path:'/dashboard/users',
                element:<Users></Users>
            },
        ]
    }
])

export default router;