import React from 'react';
import AuthRoute from './auth';
import Home from 'Src/pages/home';
import Other from 'Src/pages/other';
import Login from 'Src/pages/login';

const routes = [
    {
        path: '/',
        element: <AuthRoute />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'other',
                element: <Other />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
];

export default routes;