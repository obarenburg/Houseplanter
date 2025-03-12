/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';
import bgBook from '../assets/img/infobackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDroplet} from '@fortawesome/free-solid-svg-icons';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faTemperatureQuarter} from '@fortawesome/free-solid-svg-icons';


export default function PlantInfo () {
  const {id} = useParams ();
  const [plant, setPlant] = useState (null);
  const [loading, setLoading] = useState (true);
  const [error, setError] = useState (null);

  useEffect (
    () => {
      fetch (`https://houseplanter-backend.onrender.com/api/plants?filters[id]=${id}&populate=*`)
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
    ? `${image[0].url}`
    : null;

  return (
    <Layout>      
        <div
          className="rounded-[9px] relative mt-8 mb-8 flex flex-col items-center scale-100 overflow-hidden h-[70vh]"
          style={{
            backgroundPosition: 'center',
            backgroundColor: "#D6E0B9",
          }}
        >
          {/* Scaled container */}
          <div className="relative w-[100%] h-auto flex flex-col items-center scale-100 align-middle bottom-[5%]">
            {/* Background Image */}
            <img className="w-[100%] h-auto" src={bgBook} />

            {/* split content between book's two pages */}
            <div className="absolute grid grid-cols-2 gap-[10%] mx-[15%] mt-[11%]">
              {/* page 1: name and image */}
              <div className="relative h-[90%] align-middle">
                <div className="mt-[4%] text-[300%] text-[#316e54] font-['Fredoka'] font-semibold text-center">
                  {name}
                </div>
                <div className="text-lg text-[#6C9251] text-[120%] mb-[5%] italic text-center font-['DM Sans'] font-semibold">
                  {scientificName}
                </div>
                {imageUrl
                    ? <img
                        src={imageUrl}
                        alt={name}
                        className="w-[80%] h-auto ml-[10%] rounded-[20px] bg-[#efe0c4]"
                      />
                    : <p className="text-gray-500 text-center">No Image Available</p>}
              </div>

              {/* page 2: description and requirements */}
              <div className="relative h-[90%] align-middle">
                <div className="mt-[4%] mb-[2%] text-[200%] text-[#316e54] font-['Fredoka'] font-semibold text-center">
                    Description
                </div>
                <p className="text-center justify-center text-[#6c9251] text-[120%] font-['DM Sans'] font-semibold p-[5%]">{description}</p>
                <div className="mt-[4%] mb-[2%] text-[200%] text-[#316e54] font-['Fredoka'] font-semibold text-center">
                    Care Details
                </div>
                <ul className="text-center justify-center text-[#6c9251] text-[120%]/[200%] font-['DM Sans'] font-semibold p-[5%]">
                  <li><FontAwesomeIcon icon={faDroplet}/> Water: {waterNeeds}</li>
                  <li><FontAwesomeIcon icon={faSun}/> Light: {lightNeeds}</li>
                  <li><FontAwesomeIcon icon={faTemperatureQuarter}/> Climate: {specialFeatures}</li>
                </ul>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
