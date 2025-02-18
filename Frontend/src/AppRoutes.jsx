/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

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

// add error page!

const ProtectedRoute = ({children}) => {
  const {user} = useAuth ();
  console.log ('[ProtectedRoute] Checking access for user:', user);
  return user ? children : <Navigate to="/login" />;
};

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
    element: <ProtectedRoute> <Collection /> </ProtectedRoute>,
    //  errorElement: <ErrorPage />,
  },
  {
    path: '/plants/:id',
    element: <ProtectedRoute>  <PlantInfo /> </ProtectedRoute>,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/shop',
    element: <ProtectedRoute>  <ShopPage /> </ProtectedRoute>,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/garden',
    element: <ProtectedRoute>  <Gamble /> </ProtectedRoute>,
    // errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LogIn />,
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
