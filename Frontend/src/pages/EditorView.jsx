// import React from 'react';
// import { useAuth } from '../AuthContext';

// export default function EditorView({ userPlants }) {
//   return (
//     <div className="relative w-full h-full">
//       {/* Translucent Pot Slots */}
//       <div className="absolute w-full h-full pointer-events-none">
//         <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[20%] left-[40%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[20%] left-[70%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[50%] left-[10%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[50%] left-[40%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[50%] left-[70%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[80%] left-[20%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//         <div className="absolute top-[80%] left-[60%] w-[100px] h-[100px] bg-gray-300 bg-opacity-30 rounded-full" />
//       </div>

//       {/* Editable Plants */}
//       {userPlants.map((plant, index) => (
//         <img
//           key={plant.id}
//           src={`/images/${plant.type}.png`}  // Adjust the path as necessary
//           alt={plant.type}
//           className={`absolute w-[100px] h-[100px] transition-all duration-500 cursor-move plant-${index + 1}`}
//           style={{
//             top: `${20 + index * 10}%`,
//             left: `${10 + (index % 3) * 30}%`
//           }}
//         />
//       ))}
//     </div>
//   );
// }
