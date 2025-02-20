import { useState } from "react";

function Timer({ timeleft, onClick }) {
    return (
        <div onClick={onClick}>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-[min(20vw,200px)] max-w-[30vw] h-[min(15vw,120px)] max-h-[18vh] bg-[#acc48b] rounded-xl flex items-center justify-center">
                    <div className="cursor-pointer hover:bg-stone-900 w-[90%] h-[80%] bg-stone-800 rounded-xl flex items-center justify-center">
                        <span
                            className="text-stone-200 font-['Reddit Mono'] leading-none text-center break-words overflow-hidden whitespace-nowrap font-['Kreon']"
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
