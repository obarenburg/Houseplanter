/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const StyledText2 = ({text}) => {
  return (
    <div className="relative">
      <h2 className="absolute top-0 left-0 transform -translate-x-1 translate-y-1 text-[#006877] font-bold font-['Slackey']">
        {text}
      </h2>

      <h2
        className="relative text-white  font-bold font-['Slackey']"
        style={{
          WebkitTextStroke: '2px #006877',
          textShadow: '-2px 2px 0 #006877',
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default StyledText2;