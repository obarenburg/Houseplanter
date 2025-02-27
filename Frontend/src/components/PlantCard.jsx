/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledText2 from './StyledText2';


const CollectedPlantCard = ({ plantName }) => {
    const [plant, setPlant] = useState(null); // Store plant details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect (
        () => {
            fetch (`https://houseplanter-backend.onrender.com/api/plants?filters[type]=${plantName}&populate=*`)
            .then (response => response.json())
            .then (data => {
                if (!data.data || data.data.length === 0) {
                    setError ('Plant not found');
                  } else {
                    setPlant (data.data[0]);
                  }
                  setLoading (false);
                })
                .catch (error => {
                  console.error ('Error fetching plant:', error);
                  setError ('Failed to load plant data.');
                  setLoading (false);
                });
            },
            [plantName]
    );

 
    if (loading) return <p className="text-center text-xl mt-12">Loading...</p>;
    if (error)
    return <p className="text-center text-xl mt-12 text-red-500">{error}</p>;

  const {
    name,
    scientificName,
    image,
    rarity,
  } = plant;



  const imageUrl = image && image.length > 0
    ? `${image[0].url}`
    : null;

    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-[#D6E0B9] p-4">
            {/* Top Heading */}
            <h1 className="text-center text-[#006877] text-7xl font-normal  font-[Slackey]"
            style={{
                WebkitTextStroke: '1px #FFFFFF',
                textShadow: '-4px 4px 0 #FFFFFF',
              }}
            >
                you collected a
            </h1>

            {/* Card Container */}
            <div className="mt-4 bg-[#E6F2D9] p-4 rounded-2xl shadow-lg relative w-64 h-80 flex flex-col items-center justify-center">
                {/* Plant Image */}
                {imageUrl
                    ? <img
                        src={imageUrl}
                        alt={name}
                        className="h-64 w-auto object-contain rounded-lg"
                        />
                    : <p className="text-gray-500">No Image Available</p>}
                
                {/* Plant Name */}
                <h2 className="text-xl font-semibold text-gray-700 capitalize">
                    {name}
                </h2>

                {/* Scientific Name */}
                <h3 className="text-sm text-gray-500 italic">
                    {scientificName}
                </h3>

                {/* Rarity and Type */}
                <p className="text-sm text-gray-600">
                    Rarity: {rarity}
                </p>
            </div>

            {/* Bottom Text */}
            <h2 className="  drop-shadow-md mt-4 text-center text-[#006877] text-5xl font-normal font-['Slackey'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]"
            style={{
                WebkitTextStroke: '1px #FFFFFF',
                textShadow: '-4px 4px 0 #FFFFFF',
              }}
            >
                {name}!
            </h2>

            

            
        </div>
    );
};

export default CollectedPlantCard;
