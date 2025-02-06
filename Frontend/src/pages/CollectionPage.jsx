/* eslint-disable no-unused-vars */
import React from 'react';

export default function Collection () {
  // Placeholder plant data
  const plants = [
    {id: 1, name: 'Snake Plant', rarity: 'Rare', image: 'snake-plant.jpg'},
    {id: 2, name: 'Spider Plant', rarity: 'Common', image: 'spider-plant.jpg'},
    {id: 3, name: 'Fiddle Leaf Fig', rarity: 'Epic', image: 'fiddle-leaf.jpg'},
    {id: 4, name: 'Monstera', rarity: 'Rare', image: 'monstera.jpg'},
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Collection</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {plants.map (plant => (
          <div
            key={plant.id}
            className="border rounded-lg shadow-md p-4 text-center"
          >
            <div className="h-32 w-full bg-gray-200 rounded-md mb-4">
              {/* Replace with <img> when real images are added */}
              <span className="block text-sm text-gray-500 pt-12">
                Image Placeholder
              </span>
            </div>
            <h2 className="font-bold">{plant.name}</h2>
            <p className="text-sm text-gray-500">{plant.rarity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
