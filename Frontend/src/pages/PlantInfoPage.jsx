/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';

export default function PlantInfo () {
  const {id} = useParams ();
  const [plant, setPlant] = useState (null);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  useEffect (
    () => {
      fetch (`http://98.237.188.3:1337/api/plants?filters[id]=${id}&populate=*`)
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
    [id]
  );

  if (loading) return <p className="text-center text-xl mt-12">Loading...</p>;
  if (error)
    return <p className="text-center text-xl mt-12 text-red-500">{error}</p>;

  const {
    name,
    scientificName,
    waterNeeds,
    lightNeeds,
    specialFeatures,
    description,
    uses,
    nativeHabitat,
    image,
  } = plant;

  const imageUrl = image && image.length > 0
    ? `http://98.237.188.3:1337${image[0].url}`
    : null;

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
        <div className="mt-12 mb-6 text-5xl">
          <StyledText text={name} className="text-center" />
          <h2 className="text-lg text-gray-600 italic text-center">
            {scientificName}
          </h2>
        </div>

        <div className="w-11/12 max-w-2xl bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-4">
            {imageUrl
              ? <img
                  src={imageUrl}
                  alt={name}
                  className="h-64 w-auto object-contain rounded-lg"
                />
              : <p className="text-gray-500">No Image Available</p>}
          </div>
          <p className="text-gray-700 mb-6 text-center">{description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg">Care Details:</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Water Needs: {waterNeeds}</li>
                <li>Light Needs: {lightNeeds}</li>
                <li>Special Features: {specialFeatures}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg">Additional Information:</h3>
              <p className="text-gray-700">Uses: {uses}</p>
              <p className="text-gray-700">Native Habitat: {nativeHabitat}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
