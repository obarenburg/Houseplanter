/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';

export default function ShopPage () {
    const [test, setTest] = useState ([]);
    const [loading, setLoading] = useState (true);

    // const login
    
    //   useEffect (() => {
    //     fetch ('http://0.0.0.0:1337/api/testings')
    //       .then (response => response.json ())
    //       .then (data => {
    //         setTest (data.data);
    //         setLoading (false);
    //       })
    //       .catch (error => {
    //         console.error ('Error fetching plants:', error);
    //         setLoading (false);
    //       });
    //   }, []);
  
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
          <StyledText text="Test" className="text-center" />
        </div>

        <p className="text-left  max-w-prose bg-amber-50 text-black">
               <b>Houseplanter</b> is not just about collecting plants though! You also also look closer at your plants int the collection to check out some real world facts. These include
              care information for their real world counter parts, such as <b>Watering Times</b>, <b>Sun Light Requirements</b> and <b>Preferred Climate!</b>
        </p>
        
      </div>
    </Layout>
  );
}
