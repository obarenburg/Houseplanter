/* eslint-disable no-unused-vars */
import React from 'react';
import {Link} from 'react-router-dom';

// to do
// when user is logged in show garden,collection,shop,sign-out
// when user is logged out show sign-in,create account

export default function Navbar () {
  return (
    <nav className="bg-[#acceb0] text-white rounded-[9px] p-4">
      <div className="container mx-auto flex justify-between items-center">

        <Link to="/" className="font-['Kreon'] font-bold text-2xl text-white ">
          Houseplanter
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
