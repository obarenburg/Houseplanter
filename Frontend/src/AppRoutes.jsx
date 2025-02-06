// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// HOME
import HomePage from './pages/HomePage';

// PLANT
import Collection from './pages/CollectionPage';
import PlantInfo from './pages/PlantInfoPage';

// USER
//import UserPage from "./users/UserPage";

const router = createBrowserRouter ([
  // HOME
  {
    path: '/',
    element: <HomePage />,
    // errorElement: <ErrorPage />,
  },
  // plant
  {
    path: '/collection',
    element: <Collection />,
    //  errorElement: <ErrorPage />,
  },
  {
    path: '/collection/plant/:id',
    element: <PlantInfo />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/shop',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/garden',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/createUser',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
