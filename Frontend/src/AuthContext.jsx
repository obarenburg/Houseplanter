/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';

const AuthContext = createContext ();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState (null);
  const [gameData, setGameData] = useState (null);

  useEffect (() => {
    const storedUser = JSON.parse (localStorage.getItem ('user'));
    if (storedUser) {
      console.log (
        '[AuthContext] Retrieved user from localStorage:',
        storedUser
      );
      setUser (storedUser);
      getUserGameData(storedUser.user.id, storedUser.jwt);
    }
  }, []);

  // Fetch User's Game Data
  const getUserGameData = async (userId, jwt) => {
    try {
      const response = await axios.get(`https://houseplanter-backend.onrender.com/api/users/${userId}?populate[user_game_data][populate]=user_plants&populate[user_game_data][populate]=inventory_items`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("[getUserGameData] Response:", response.data);

      const gameData = response.data.user_game_data;
      if (gameData) {
        setGameData(gameData);
      } else {
        console.log("No game data found for user. Creating default game data...");
        createDefaultGameData(userId, jwt);
      }
    } catch (error) {
      console.error("[getUserGameData] Error Response:", error.response);
      alert("Failed to load game data. Check console for details.");
    }
  };

  // Create Default Game Data for New Users
  const createDefaultGameData = async (userId, jwt) => {
    try {
      const response = await axios.post('https://houseplanter-backend.onrender.com/api/user-game-datas', {
        data: {
          user: userId,
          money: 100,
          user_plants: [], 
          inventory_items: []
        }
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("[createDefaultGameData] Response:", response.data);
      alert("Default game data created for user!");

      getUserGameData(userId, jwt);
    } catch (error) {
      console.error("[createDefaultGameData] Error Response:", error.response);
      alert("Failed to create default game data. Check console for details.");
    }
  };

  // Login function
  const login = userData => {
    console.log ('[AuthContext] User logged in:', userData);
    setUser (userData);
    localStorage.setItem ('user', JSON.stringify (userData));

    getUserGameData(userData.user.id, userData.jwt);
  };

  // Logout function
  const logout = () => {
    console.log ('[AuthContext] User logged out');
    setUser (null);
    setGameData (null);
    localStorage.removeItem ('user');
  };

  return (
    <AuthContext.Provider value={{user, gameData, getUserGameData, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the auth context
export const useAuth = () => useContext (AuthContext);
