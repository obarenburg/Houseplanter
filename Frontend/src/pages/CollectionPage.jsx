// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../Layout';
// import StyledText from '../components/StyledText';
// import { useAuth } from '../AuthContext';
// import axios from 'axios';
// import './test.css';

// const API_URL = "https://houseplanter-backend.onrender.com/api";
// const PLANTS_URL = `${API_URL}/plants?populate=*`;

// export default function Collection() {
//   const [plantImages, setPlantImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { gameData } = useAuth();

//   // Get user plants from gameData
//   const userPlants = Array.isArray(gameData?.user_plants) ? gameData.user_plants : [];

//   // Fetch all plants to get images
//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const response = await axios.get(PLANTS_URL);
//         const fetchedPlants = response.data.data.map(plant => ({
//           id: plant.id,
//           name: plant.name,
//           type: plant.type,
//           imageUrl: plant.image[0]?.url ?? null
//         }));
//         setPlantImages(fetchedPlants);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         setLoading(false);
//       }
//     };

//     fetchPlants();
//   }, []);

//   // Match images with userPlants
//   const getPlantImage = (type) => {
//     const matchedPlant = plantImages.find(plant => plant.type?.toLowerCase() === type.toLowerCase());
//     return matchedPlant?.imageUrl 
//       ? matchedPlant.imageUrl
//       : "/images/placeholder.png";  // Path to placeholder image
//   };

//   // Get the corresponding plant ID for linking
//   const getPlantId = (type) => {
//     const matchedPlant = plantImages.find(plant => plant.type?.toLowerCase() === type.toLowerCase());
//     return matchedPlant?.id;
//   };

//   return (
//     <Layout>
//       <div className="relative w-full min-h-screen bg-[#D6E0B9] overflow-hidden">
//         <h2 className="text-center text-3xl mt-8 font-bold text-[#546c4c]">Your Collection</h2>

//         <div className="relative w-[80%] mx-auto text-center mt-8">
//           <h3 className="text-2xl font-bold mb-4">Collected Plants</h3>

//           {loading ? (
//             <p className="text-xl text-[#546c4c]">Loading...</p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {userPlants.length > 0 ? (
//                 userPlants.map((plant) => {
//                   const imageUrl = getPlantImage(plant.type);
//                   const plantId = getPlantId(plant.type);

//                   return (
//                     <Link to={`/plants/${plantId}`} key={plant.id}>
//                       <div className="border rounded-lg shadow-md p-4 text-center bg-white hover:shadow-lg transition-shadow duration-300">
//                         <div className="h-40 w-40 mx-auto mb-4 flex items-center justify-center">
//                           {imageUrl
//                             ? <img
//                                 src={imageUrl}
//                                 alt={plant.type}
//                                 className="h-full w-full object-contain"
//                               />
//                             : <p className="text-gray-500">No Image Available</p>}
//                         </div>
//                         <h2 className="font-bold text-gray-500 text-lg">
//                           {plant.type}
//                         </h2>
//                       </div>
//                     </Link>
//                   );
//                 })
//               ) : (
//                 <p className="text-xl text-[#546c4c]">No plants collected yet.</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// /* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../Layout';
import bgGrid from '../assets/svg/background-checks.svg';
import StyledText from '../components/StyledText';
import { useAuth } from '../AuthContext';
import './test.css';



// //  to do
// // make plants moveable
// // add an edit button to edit how plants look
// // the edit buttons opens the users inv (prob at the bottom of the screen)
// // user can then edit how their collection looks
// // when edit button is not open users collection is static
// // when static user can click on plant & go to information about their plant
/* eslint-disable no-unused-vars */




// import EditorView from './EditorView';
import axios from 'axios';

const API_URL = "https://houseplanter-backend.onrender.com/api";
const PLANTS_URL = `${API_URL}/plants?populate=*`;

export default function Collection() {
  const { gameData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [plantImages, setPlantImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user plants from gameData
  const userPlants = Array.isArray(gameData?.user_plants) ? gameData.user_plants : [];

  // Fetch all plants to get images
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(PLANTS_URL);
        
        const fetchedPlants = response.data.data.map(plant => ({
          type: plant,
          imageUrl: plant.image[0].url

          
        }));

        
        
        setPlantImages(fetchedPlants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // // Match images with userPlants
  // const getPlantImage = (type) => {
  //   const matchedPlant = plantImages.find(plant => plant.type.toLowerCase() === type.toLowerCase());
  //   return matchedPlant?.imageUrl 
  //     ? matchedPlant.imageUrl
  //     : "/images/placeholder.png";  // Path to placeholder image
  // };

  // Toggle between edit and static view
  // const toggleEdit = () => {
  //   setIsEditing(!isEditing);
  // };

  return (
    <Layout>
      <div className="relative w-full min-h-screen bg-[#D6E0B9] overflow-hidden">
        <h2 className="text-center text-3xl mt-8 font-bold text-[#546c4c]">Your Collection</h2>

        {/* <button 
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded m-4"
          onClick={toggleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button> */}

        <div className="relative w-[80%] mx-auto text-center">
          {loading ? (
            <p className="text-xl text-[#546c4c]">Loading...</p>
           ) :
          //  isEditing ? (
          //   <EditorView userPlants={userPlants} />
          // ) 
          (
            <div className="grid grid-cols-3 gap-6">
              {userPlants.length > 0 ? (
                userPlants.map((plant) => (
                  <img
                    key={plant.id}
                   // src={getPlantImage(plant.type)}  // Get the matched image
                    alt={plant.type}
                    className="w-[100px] h-[100px] mx-auto transition-transform duration-500 hover:scale-105"
                  />
                ))
              ) : (
                <p className="text-xl text-[#546c4c]">No plants collected yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
