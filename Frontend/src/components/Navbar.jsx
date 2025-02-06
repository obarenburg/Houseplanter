/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/houseplanter_logo.png';
import LogoHover from '../assets/img/houseplanter_logo_hover.png'

// to do
// when user is logged in show garden,collection,shop,sign-out
// when user is logged out show sign-in,create account

export default function Navbar() {
  return (
    <nav className="bg-[#acceb0] text-white rounded-[9px] p-2 pr-4">
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
          {/* <img
            src={LogoHover}
            className="ransition-opacity duration-200 opacity-0 hover:opacity-100"
          /> */}
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/garden"
              className="font-['Kreon'] text-2xl text-white font-bold"
            >
              Garden
            </Link>
          </li>
          <li>
            <Link
              to="/collection"
              className="font-['Kreon'] text-2xl text-white font-bold"
            >
              Collection
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="font-['Kreon'] text-2xl text-white font-bold"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="font-['Kreon'] text-2xl text-white font-bold"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
