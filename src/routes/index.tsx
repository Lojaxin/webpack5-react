import React from 'react';
import AuthRoute from './auth';
import Home from 'Src/pages/home';

const routes = [
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            {
                path: '',
                element: <Home />,
            }
        ]
    }
];

export default routes;