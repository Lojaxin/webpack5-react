import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'Src/components';
import routes from './routes';
// import imgSrc from '../public/img.jpg';
import './index.scss';

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <div>
            <Layout>
                {/* <img width={200} src={imgSrc} alt="" /> */}
                <RouterProvider router={router} />
            </Layout>
        </div>
    );
};
const root = createRoot(document.querySelector('#root'));
root.render(<App />);