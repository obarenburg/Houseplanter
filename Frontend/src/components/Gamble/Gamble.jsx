import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

import gambleBackground from '../../assets/img/background.png';
import plantStage1 from '../../assets/img/stage_1.png';
import plantStage2 from '../../assets/img/stage_2.png';
import plantStage3 from '../../assets/img/stage_3.png';
import plantStage4 from '../../assets/img/stage_4.png';
import plantStage5 from '../../assets/img/stage_5.png';
import plantStage6 from '../../assets/img/stage_6.png';
import earnBackground from '../../assets/earnPlantBackground.svg';
import collectedSnakePlant from '../../assets/CollectedSnakePlant.svg';
import './Gamble.css'
import Timer from '../Timer/Timer';
import Layout from '../../Layout';
import axios from "axios";

const basic_seed_time = 20;
let startTime = 0;

const API_URL = "https://houseplanter-backend.onrender.com/api/timers"
const API_TOKEN = "62505b41c2eed43dec696c86bfa0cf7ca5997c4e1e5433ed58f3f1b535e93d26470d09bf579b2cae6661dd0f8a36276c42623c8a52f37433653f4ff04c452e96aefaee5c182117a241ebcae0cf86fd6fb2828ed7a9411d27ef08a76f1453dff693a40b785b362d6fec13867fc3f333f35820dd4802290792d4490636e057b942"

const timeFormat = (input) => {
    const minutes = Math.floor(input/60);
    const seconds = input%60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const postTempTimer = async (tempTimerValue) => {
    try {
        const response = await axios.post(
        API_URL, 
        {
            data: {
            TempTimer: tempTimerValue,
            },
        },
        {
            headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            },
        }
        );

        console.log("Successfully posted:", response.data);
    } catch (error) {
        console.error("Error posting data:", error);
    }
};
  

function Gamble() {
    const { user, logout } = useAuth();
    const [background, setBackground] = useState(gambleBackground);
    const [plantStage, setPlantStage] = useState(0);
    const [buttonState, setButtonState] = useState(1);
    const [showTimer, setShowTimer] = useState("Plant");
    const [isCounting, setIsCounting] = useState(false);
    
    const plantSeed = () => {
        // Need to send this to the server
        if (isCounting) {
            console.log("hi")
        } else if (buttonState == 3) {
            setBackground(earnBackground);
            setPlantStage(0);
            setButtonState(4);
        } else {
            startTime = Date.now();
            console.log(startTime);
            postTempTimer(startTime);
            setShowTimer(timeFormat(basic_seed_time));
            setIsCounting(true);
            console.log(isCounting);
        }
    }

    const [apiTimer, setApiTimer] = useState([]);
    useEffect(() => {
        axios.get(API_URL, {
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
          }
        })
        .then(response => {
            setApiTimer(response.data.data);
      
          response.data.data.forEach(item => {
            console.log("TempTimer:", item.TempTimer);
          });
        })
        .catch(error => console.error("Error fetching plants:", error));
      }, []);
      

    useEffect(() => {
        let interval;

        if (isCounting) {
            interval = setInterval(() => {
                const currentTime = Date.now();
                const timeDifference = Math.floor((currentTime - startTime) / 1000);
                const timeLeft = basic_seed_time - timeDifference;
                const stages = [plantStage1, plantStage2, plantStage3, plantStage4, plantStage5, plantStage6]
                const stageIndex = Math.floor((basic_seed_time / timeLeft) * 6);

                if (timeLeft <= 0) {
                    setButtonState(3);
                    setShowTimer("Get");
                    setIsCounting(false);
                    clearInterval(interval);
                } else {
                    setShowTimer(timeFormat(timeLeft));
                    setPlantStage(stages[Math.min(stageIndex, 6 - 1)]);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isCounting]);

    return (
        <>
            <Layout>
                <div>
                    {user.user ? (
                        <>
                        <h1 className='text-black'>Welcome, {user.user.username}!</h1>
                        </>
                    ) : (
                        <h1>Not logged in</h1>
                    )}
                </div>
                <div className="relative w-full h-full">
                    {apiTimer.map((apiTimer) => (
                    <p key={apiTimer.id} className="text-black text-lg font-bold">
                    TempTimer: {apiTimer.TempTimer}
                  </p>
                    ))}
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
                    {plantStage !== 0 && (
                        <img 
                        src={plantStage}
                        alt="" 
                        className="absolute w-full h-full bottom-0 object-cover" 
                    />
                    )}                   
                </div>
            </Layout>
        </>
    );
}

export default Gamble;
