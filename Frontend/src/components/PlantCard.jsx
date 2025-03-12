/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

const renderStars = rarity => {
  let starCount;
  switch (rarity) {
    case 'common':
      starCount = 1;
      break;
    case 'uncommon':
      starCount = 2;
      break;
    case 'rare':
      starCount = 3;
      break;
    default:
      starCount = 0;
  }
  return [...Array (starCount)].map ((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className="text-yellow-400 text-sm"
    />
  ));
};

const CollectedPlantCard = ({plantName}) => {
  const [plant, setPlant] = useState (null);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);
  const navigate = useNavigate ();

  useEffect (
    () => {
      fetch (
        `https://houseplanter-backend.onrender.com/api/plants?filters[type]=${plantName}&populate=*`
      )
        .then (response => response.json ())
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

  const {name, scientificName, image, rarity} = plant;
  const collectionImage = image.find (img => img.name.includes ('collection') || img.name.includes ('final'));
  const imageUrl = collectionImage ? collectionImage.url : null;

  return (
    <div
      className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105 hover:shadow-2x cursor-pointer"
      onClick={() => navigate ('/collection')}
    >

      <h1
        className="text-center text-[#006877] text-7xl font-normal font-[Slackey]"
        style={{
          WebkitTextStroke: '1px #FFFFFF',
          textShadow: '-4px 4px 0 #FFFFFF',
        }}
      >
        you collected a
      </h1>

      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#f0f8e2] to-[#d6e0b9] rounded-2xl shadow-xl border border-[#c5d3a4] relative w-64 h-80">
        {imageUrl
          ? <img
              src={imageUrl}
              alt={name}
              className="h-[20rem] w-auto object-contain"
            />
          : <p className="text-gray-500">No Image Available</p>}

        <h2 className="text-2xl font-bold text-[#2b6b2b] capitalize font-[Slackey] tracking-wide drop-shadow-md -mt-10">
          {name}
        </h2>

        <h3 className="text-sm text-gray-500 italic drop-shadow-md -mt-2">
          {scientificName}
        </h3>

        <div className="absolute top-2 right-2 flex space-x-1 drop-shadow-md">
          {renderStars (rarity)}
        </div>
      </div>

      <h2
        className="drop-shadow-md mt-4 text-center text-[#006877] text-5xl font-normal font-['Slackey']"
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
