import { Navigate, useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([
        { 
            path: '/', 
            element: (
                <Navigate to="/login"/>
            )
        },
        { 
            path: '/*', 
            element: (
                <Navigate to="/"/>
            )
        },
        LoginRoutes,
        MainRoutes
    ]);
}
