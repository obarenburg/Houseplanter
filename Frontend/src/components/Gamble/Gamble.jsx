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

const API_URL = "https://houseplanter-backend.onrender.com/api/user-plants/";
const API_TOKEN = "94ca66a92ee238641c1b3ea83c833229e7573835775f2d63b8f897be81344933de76b5fc51aeb222b9b4e91971f1724699e17449d8e089b82b00b11457914f1704c5439bbf2a7c8c34d49849c02c2c292d9eec820651165d60fbd7a2e03ef14edd70151f2f0a9667506c47081855d91531fdf7949021066b352d7a6897c0ed91"

const timeFormat = (input) => {
    const minutes = Math.floor(input/60);
    const seconds = input%60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const updatePlantedAt = async (plantId, newPlantedAt) => {
    try {
      const response = await axios.put(`${API_URL}${plantId}`, {
        data: {
          plantedAt: newPlantedAt,
        },
      }, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      console.log("Update successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating plantedAt:", error);
      throw error;
    }
  };

const getPlantedAt = async (plantId) => {
try {
    const response = await axios.get(`${API_URL}${plantId}`, {
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    },
    });
    console.log("Fetch successful:", response.data);
    return response.data.plantedAt; // Assuming plantedAt is part of the returned data
} catch (error) {
    console.error("Error fetching plantedAt:", error);
    throw error;
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
            let db_time = getPlantedAt(); // with the plant ID
            if (db_time == 0) { // with the plant ID
                startTime = Date.now();
                console.log(startTime);
                updatePlantedAt(plantId, startTime); // with the plant ID
            } else {
                startTime = db_time;
                console.log(startTime);
                console.log("Got from the DB");
            }
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
