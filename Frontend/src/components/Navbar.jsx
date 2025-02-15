/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/houseplanter_logo.png';
import LogoHover from '../assets/img/houseplanter_logo_hover.png'
import { useAuth } from '../AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  console.log('[Navbar] Rendering - User:', user);

  return (
    <nav className="bg-[#acc48b] text-white rounded-[9px] p-2 pr-4">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="h-20 w-70 object-contain">
          <div className="relative">
          <img
            src={Logo}
            className="transition-opacity duration-200 hover:opacity-0"
          />
            <img
            src={LogoHover}
            className="absolute transition-opacity duration-200 bottom-0 opacity-0 hover:opacity-100"
          />
          </div>
        </Link>

        <ul className="flex space-x-6">
        {user ? (
            <>
              <li><Link to="/garden" className="font-['Kreon'] text-2xl text-white font-bold">Garden</Link></li>
              <li><Link to="/collection" className="font-['Kreon'] text-2xl text-white font-bold">Collection</Link></li>
              <li><Link to="/shop" className="font-['Kreon'] text-2xl text-white font-bold">Shop</Link></li>
              <li><button onClick={() => { console.log('[Navbar] User logged out'); logout(); }} className="font-['Kreon'] text-2xl text-white font-bold">Sign-Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/createUser" className="font-['Kreon'] text-2xl text-white font-bold">Sign-Up</Link></li>
              <li><Link to="/login" className="font-['Kreon'] text-2xl text-white font-bold">Sign-In</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
