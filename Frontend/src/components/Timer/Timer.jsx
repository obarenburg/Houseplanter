import { useState } from "react";

function Timer({ timeleft, onClick }) {
    return (
    <div onClick={onClick}>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-[20vw] max-w-[30vw] h-[15vw] max-h-[18vh] bg-[#fac95d] rounded-xl flex items-center justify-center">
            <div className="w-[90%] h-[80%] bg-[#1e1e1e] rounded-xl flex items-center justify-center">
                <span
                className="text-white font-['Reddit Mono'] leading-none text-center"
                style={{ fontSize: '4vw', maxWidth: '10vw' }}
                >
                {timeleft}
                </span>
            </div>
            </div>
        </div>
      </div>
    );
  }
  

  
  export default Timer;
  