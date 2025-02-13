/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';

export default function Collection () {
  const [plants, setPlants] = useState ([]);
  const [loading, setLoading] = useState (true);

  useEffect (() => {
    fetch ('https://houseplanter-backend.onrender.com/api/plants?populate=*')
      .then (response => response.json ())
      .then (data => {
        setPlants (data.data);
        setLoading (false);
      })
      .catch (error => {
        console.error ('Error fetching plants:', error);
        setLoading (false);
      });
  }, []);

  if (loading) return <p className="text-center text-xl mt-12">Loading...</p>;

  return (
    <Layout>
      <div
        className="rounded-[9px] min-h-screen relative mt-8 mb-8 flex flex-col items-center"
        style={{
          backgroundImage: `url(${bgGrid})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mt-12 mb-8 text-5xl">
          <StyledText text="Your Collection" className="text-center" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {plants.map (plant => {
            // Extract the first image from the array
            const imageUrl = plant.image && plant.image.length > 0
              ? `http://98.237.188.3:1337${plant.image[0].url}`
              : null;

            return (
              <Link to={`/plants/${plant.id}`} key={plant.id}>
                <div className="border rounded-lg shadow-md p-4 text-center bg-white">
                  <div className="h-40 w-40 mx-auto mb-4 flex items-center justify-center">
                    {imageUrl
                      ? <img
                          src={imageUrl}
                          alt={plant.name}
                          className="h-full w-full object-contain"
                        />
                      : <p className="text-gray-500">No Image Available</p>}
                  </div>
                  <h2 className="font-bold text-gray-500 text-lg">
                    {plant.name}
                  </h2>
                  <p className="text-sm text-gray-500">{plant.rarity}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
