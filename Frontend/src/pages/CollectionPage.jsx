/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';
import {useAuth} from '../AuthContext';
import './test.css';
import axios from 'axios';
import collectionBackground from '../assets/img/editcollection.png';

export default function Collection () {
  const {user} = useAuth ();
  const [userPlants, setUserPlants] = useState ([]);

  // Fetch user's plants with the linked Plant data
  const fetchUserData = async () => {
    try {
      const response = await axios.get (
        `https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate[user_plants][populate]=plant.image`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );

      const data = response.data.data[0];
      setUserPlants (data.user_plants);
    } catch (error) {
      console.error ('Error fetching user data:', error);
    }
  };

  useEffect (() => {
    fetchUserData ();
  }, []);

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

  return (
    <Layout>

      <div className="relative w-full h-full">
        <img
          src={collectionBackground}
          className="h-full object-cover"
          alt="Collection Background"
        />

        {userPlants.length > 0
          ? userPlants.slice(0, 14).map ((userPlant, index) => {
              const plant = userPlant.plant;
              const collectionImage = plant.image.find (img =>
                img.name.includes ('collection')
              );
              const imageUrl = collectionImage ? collectionImage.url : null;
              const position = plantPositions[index];

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
                    alt={plant.type}
                    className="h-80 w-auto"
                  />
                </Link>
              );
            })
          : <p className="text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              No plants collected yet.
            </p>}
      </div>

    </Layout>
  );
}
