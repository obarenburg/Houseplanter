/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Nav from './components/Navbar';
import Footer from './components/Footer';

const Layout = ({children}) => {
  return (
    <div className="w-full min-h-screen flex-col justify-center items-center">
      <div className="m-auto max-w-full">
        <Nav />
        <main className="container m-auto max-w-full mt-[-4.5rem] pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
