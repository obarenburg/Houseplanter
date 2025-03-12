/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import {useAuth} from '../AuthContext';
import './test.css';
import axios from 'axios';
import collectionBackground from '../assets/img/editcollection.png';

export default function Collection() {
  const {user} = useAuth();
  const [userPlants, setUserPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Plant positions on the shelves
  const plantPositions = [
    {top: '3.7%', left: '-0.95%'}, // left shelf 1
    {top: '3.7%', left: '8.98%'}, // left shelf 2
    {top: '3.7%', left: '70.95%'}, // right shelf 1
    {top: '3.7%', left: '83%'}, // right shelf 2
    {top: '36.42%', left: '4.08%'}, // left stool
    {top: '36.42%', left: '75.87%'}, // right stool
    {top: '10.3%', left: '40%'}, // top shelf 1
    {top: '10.3%', left: '51.5%'}, // top shelf 2
    {top: '35.89%', left: '28.45%'}, // middle shelf 1
    {top: '35.89%', left: '40%'}, // middle shelf 2
    {top: '35.89%', left: '51.5%'}, // middle shelf 3
    {top: '59.78%', left: '28.45%'}, // bottom shelf 1
    {top: '59.78%', left: '40%'}, // bottom shelf 2
    {top: '59.78%', left: '51.5%'}, // bottom shelf 3
  ];

  // Fetch user's plants with the linked Plant data
  const fetchUserData = async () => {
    if (!user?.user?.id || !user?.jwt) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate[user_plants][populate]=plant.image`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      const data = response.data.data[0];
      if (data && data.user_plants) {
        setUserPlants(data.user_plants);
      } else {
        setUserPlants([]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load your plants. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  // Function to safely get the collection image URL
  const getCollectionImageUrl = (plant) => {
    // Check if plant and plant.image exist and is an array
    if (!plant || !plant.image || !Array.isArray(plant.image)) {
      return null;
    }
    
    // Find the collection image
    const collectionImage = plant.image.find(img => 
      img && img.name && img.name.includes('collection') || img.name.includes('final')
    );
    
    return collectionImage ? collectionImage.url : null;
  };

  // Render plants with error handling
  const renderPlants = () => {
    if (isLoading) {
      return (
        <p className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Loading your plants...
        </p>
      );
    }

    if (error) {
      return (
        <p className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {error}
        </p>
      );
    }

    if (!userPlants.length) {
      return (
        <p className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          No plants collected yet.
        </p>
      );
    }

    return userPlants.slice(0, 14).map((userPlant, index) => {
      // Skip rendering if position index exceeds available positions
      if (index >= plantPositions.length) return null;
      
      const plant = userPlant.plant;
      if (!plant) return null;
      
      const imageUrl = getCollectionImageUrl(plant);
      const position = plantPositions[index];

      // Skip if no image URL
      if (!imageUrl) return null;

      return (
        <Link
          to={`/plants/${plant.id}`}
          key={userPlant.id}
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
          }}
        >
          <img
            src={imageUrl}
            alt={plant.type || 'Plant'}
            className="h-80 w-auto"
          />
        </Link>
      );
    });
  };

  return (
    <Layout>
      <div className="relative w-full h-full">
        <img
          src={collectionBackground}
          className="h-full object-cover"
          alt="Collection Background"
        />
        {renderPlants()}
      </div>
    </Layout>
  );
}