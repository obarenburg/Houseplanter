/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext ();

// add fetching user's game data from strapi after login
// stores game progress (plants, money, etc.) in state and localStorage
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState (null);

  useEffect (() => {
    const storedUser = JSON.parse (localStorage.getItem ('user'));
    if (storedUser) {
      console.log (
        '[AuthContext] Retrieved user from localStorage:',
        storedUser
      );
      setUser (storedUser);
    }
  }, []);

  // Login function
  const login = userData => {
    console.log ('[AuthContext] User logged in:', userData);
    setUser (userData);
    localStorage.setItem ('user', JSON.stringify (userData));
  };

  // Logout function
  const logout = () => {
    console.log ('[AuthContext] User logged out');
    setUser (null);
    localStorage.removeItem ('user');
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the auth context
export const useAuth = () => useContext (AuthContext);
