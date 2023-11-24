
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '../Layout/MainLayout';
import Surveys from '../Pages/Surveys/Surveys';
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
        ]
    }
])

export default router;