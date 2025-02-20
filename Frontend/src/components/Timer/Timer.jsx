import { useState } from "react";

function Timer({ timeleft, onClick }) {
    return (
        <div onClick={onClick}>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[min(20vw,200px)] max-w-[30vw] h-[min(15vw,120px)] max-h-[18vh] bg-[#fac95d] rounded-xl flex items-center justify-center">
                    <div className="w-[90%] h-[80%] bg-[#1e1e1e] rounded-xl flex items-center justify-center">
                        <span
                            className="text-white font-['Reddit Mono'] leading-none text-center break-words overflow-hidden whitespace-nowrap"
                            style={{ fontSize: 'clamp(1.5rem, 4vw, 2em)' }}
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
