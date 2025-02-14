// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// HOME
import HomePage from './pages/HomePage';

// PLANT
import Collection from './pages/CollectionPage';
import PlantInfo from './pages/PlantInfoPage';
import Gamble from './components/Gamble/Gamble';
import LogIn from './pages/LogIn';
import CreateAccount from './pages/CreateAccount';
import ShopPage from './pages/ShopPage';

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
    path: '/plants/:id',
    element: <PlantInfo />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/shop',
    element: <ShopPage />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/garden',
    element: <Gamble />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LogIn />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/logout',
    element: <Collection />,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/createUser',
    element: <CreateAccount />,
    // errorElement: <ErrorPage />,
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
