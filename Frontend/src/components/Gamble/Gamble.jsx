import { useState, useEffect } from 'react';
import gambleBackground from '../../assets/gambleBackground.svg';
import earnBackground from '../../assets/earnPlantBackground.svg';
import collectedSnakePlant from '../../assets/CollectedSnakePlant.svg';
import './Gamble.css'
import Timer from '../Timer/Timer';

const basic_seed_time = 10;
let startTime = 0;

const timeFormat = (input) => {
    const minutes = Math.floor(input/60);
    const seconds = input%60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function Gamble() {
    const [background, setBackground] = useState(gambleBackground);
    const [buttonState, setButtonState] = useState(1);
    const [showTimer, setShowTimer] = useState("Plant");
    const [isCounting, setIsCounting] = useState(false);
    
    const plantSeed = () => {
        // Need to send this to the server
        if (isCounting) {
            console.log("hi")
        } else if (buttonState == 3) {
            setBackground(earnBackground);
            setButtonState(4);
        } else {
            startTime = Date.now();
            console.log(startTime);
            setShowTimer(timeFormat(basic_seed_time));
            setIsCounting(true);
            console.log(isCounting);
        }
    }

    useEffect(() => {
        let interval;

        if (isCounting) {
            interval = setInterval(() => {
                const currentTime = Date.now();
                const timeDifference = Math.floor((currentTime - startTime) / 1000);
                const timeLeft = basic_seed_time - timeDifference;

                if (timeLeft <= 0) {
                    setButtonState(3);
                    setShowTimer("Get");
                    setIsCounting(false);
                    clearInterval(interval);
                } else {
                    setShowTimer(timeFormat(timeLeft));
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isCounting]);

    return (
        <div className="relative w-full h-full">
            {buttonState !== 4 && (
                <Timer timeleft={showTimer} onClick={plantSeed} />
            )}
            {buttonState == 4 && (
                <img src={collectedSnakePlant} className="absolute w-1/2 h-1/2 top-1/4 left-1/4" alt="" />
            )}
            <img 
                src={background}
                alt="Gamble Background" 
                className="w-full h-full object-cover" 
            />
        </div>
    );
}

export default Gamble;
