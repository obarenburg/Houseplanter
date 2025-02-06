/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const StyledText = ({text}) => {
  return (
    <div className="relative">
      <h2 className="absolute top-0 left-0 transform -translate-x-1 translate-y-1 text-[#faa57b]  font-bold font-['Kreon']">
        {text}
      </h2>

      <h2
        className="relative text-white  font-bold font-['Kreon']"
        style={{
          WebkitTextStroke: '2px #faa57b',
          textShadow: '-2px 2px 0 #faa57b',
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default StyledText;
