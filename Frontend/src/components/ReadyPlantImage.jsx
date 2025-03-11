/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';;

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
  const collectionImage = image.find (img => img.name.includes ('collection'));
  const imageUrl = collectionImage ? collectionImage.url : null;

  console.log(imageUrl)

  return (
    <div>
        {imageUrl
          ? <img
              src={imageUrl}
              alt={name}
              className="absolute w-full h-full bottom-0 object-cover"
            />
          : <p className="text-gray-500">No Image Available</p>}
    </div>
  );
};

export default readyPlant;
