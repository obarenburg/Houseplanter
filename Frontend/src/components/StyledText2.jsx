/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const StyledText2 = ({text}) => {
  return (
    <div className="relative">
      <h2 className="absolute top-0 left-0 transform -translate-x-1 translate-y-1 text-[#ffffff]  font-bold font-['Mansalva']">
        {text}
      </h2>

      <h2
        className="relative text-white  font-bold font-['Mansalva']"
        style={{
          WebkitTextStroke: '2px #6C9251',
          textShadow: '-2px 2px 0 #6C9251',
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default StyledText2;
