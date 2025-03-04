import React  from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/img/houseplanter_logo.png';
import LogoHover from '../assets/img/houseplanter_logo_hover.png'
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log('[Navbar] Rendering - User:', user);

  return (
    <nav className="bg-[#acc48b] text-white rounded-[9px] p-2 pr-4">
      <div className="container mx-auto max-w-1/3 justify-center items-center w-screen">

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
      </div>
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex space-x-6">
        {user ? (
            <>
              <li><Link to="/garden" className="font-['Fredoka'] text-2xl text-white font-semibold">Window</Link></li>
              <li><Link to="/collection" className="font-['Fredoka'] text-2xl text-white font-semibold">Collection</Link></li>
              <li><Link to="/shop" className="font-['Fredoka'] text-2xl text-white font-semibold">Shop</Link></li>
              <li><button onClick={() => { console.log('[Navbar] User logged out'); logout(); }} className="cursor-pointer hover:text-[#89926D] font-['Fredoka'] text-2xl text-white font-semibold">Sign-Out</button></li>
            </>
          ) : (
            <>
              <li><Link to="/createUser" className="font-['Fredoka'] text-2xl text-white font-semibold">Sign-Up</Link></li>
              <li><Link to="/login" className="font-['Fredoka'] text-2xl text-white font-semibold">Sign-In</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default React.memo(Navbar);