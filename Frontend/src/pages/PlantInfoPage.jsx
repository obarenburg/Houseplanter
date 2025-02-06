/* eslint-disable no-unused-vars */
import React from 'react';

export default function PlantInfo () {
  // Placeholder plant data
  const plant = {
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    waterNeeds: 'Once every 2 weeks',
    lightNeeds: 'Indirect sunlight',
    specialFeatures: 'Air purifier',
    description: 'The snake plant is known for its ability to thrive in low light. It needs minimal watering and is perfect for beginners.',
    uses: 'Great for indoor air purification and low-maintenance decor.',
    nativeHabitat: 'Native to West Africa.',
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
      <h2 className="text-lg text-gray-600 italic mb-4">
        {plant.scientificName}
      </h2>
      <p className="text-gray-700 mb-6">{plant.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold">Care Details:</h3>
          <ul className="list-disc pl-6">
            <li>Water Needs: {plant.waterNeeds}</li>
            <li>Light Needs: {plant.lightNeeds}</li>
            <li>Special Features: {plant.specialFeatures}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Additional Information:</h3>
          <p>Uses: {plant.uses}</p>
          <p>Native Habitat: {plant.nativeHabitat}</p>
        </div>
      </div>
    </div>
  );
}
