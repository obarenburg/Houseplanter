/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react';
import Nav from './components/Navbar';
import Footer from './components/Footer';
import { useAuth } from './AuthContext';

const Layout = ({children}) => {
  const { user } = useAuth();
  const MemoizedNav = useMemo(() => <Nav />, [user]);

  return (
    <div className="w-full min-h-screen flex-col justify-center items-center">
      <div className="m-auto max-w-full">
      {MemoizedNav}
        <main className="container m-auto max-w-full mt-[-4.5rem] pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
