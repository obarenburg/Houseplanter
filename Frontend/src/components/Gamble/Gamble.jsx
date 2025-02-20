import { useState, useEffect } from 'react';
//import React from 'react';
import { useAuth } from '../../AuthContext';
import gambleBackground from '../../assets/img/window.png';
import emptyPot from '../../assets/img/empty_pot.png';
import windowMonstera from '../../assets/img/window_monstera.png';
import snakePlant from '../../assets/img/snake_plant.png';
import monsteraPlant from '../../assets/img/monstera.png';
import earnBackground from '../../assets/earnPlantBackground.svg';
import collectedSnakePlant from '../../assets/CollectedSnakePlant.svg';
import './Gamble.css'
import Timer from '../Timer/Timer';
import Layout from '../../Layout';
import axios from "axios";
//import tutorialBird from './tutorial';

let BASIC_SEED_TIME = 600;
const PLANT_ID = "f8tui9y5dtiexx6hhn2v48jp";
const COLLECTION_DISPLAY_TIME = 4000; // Seconds you want * 1000
const API_TOKEN = "94ca66a92ee238641c1b3ea83c833229e7573835775f2d63b8f897be81344933de76b5fc51aeb222b9b4e91971f1724699e17449d8e089b82b00b11457914f1704c5439bbf2a7c8c34d49849c02c2c292d9eec820651165d60fbd7a2e03ef14edd70151f2f0a9667506c47081855d91531fdf7949021066b352d7a6897c0ed91";
const API_URL = "https://houseplanter-backend.onrender.com/api/user-plants/";

const timeFormat = (input) => {
    const minutes = Math.floor(input/60);
    const seconds = input%60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const updatePlantedAt = async (plantId, newPlantedAt) => {
    try {
        const response = await axios.put(`${API_URL}${plantId}`, {
            data: {
                TimerStartTime: newPlantedAt,
            },
        }, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });
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
        return response.data.data.TimerStartTime;
    } catch (error) {
        console.error("Error fetching plantedAt:", error);
        throw error;
    }
};

function Gamble() {
    const { user } = useAuth();
    const [background, setBackground] = useState(gambleBackground);
    const [potState, setPotState] = useState(emptyPot);
    const [buttonText, setButtonText] = useState(" ");
    const [timerValue, setTimerValue] = useState(" ");
    const [isCounting, setIsCounting] = useState(false);
    const [startTime, setStartTime] = useState(0);

    const handleCollectPlant = async () => {
        setBackground(gambleBackground);
        setPotState(null);
        setButtonText("");
        setTimerValue("");
        updatePlantedAt(PLANT_ID, 0);

        setTimeout(() => {
            setBackground(gambleBackground);
            setPotState(emptyPot);
            setButtonText("Plant");
            setTimerValue("Plant");
        }, COLLECTION_DISPLAY_TIME);
    };

    const handleAction = async () => {
        if (buttonText === "Get") {
            handleCollectPlant();
        } else if (buttonText === "Plant" && !isCounting) {
            const currentTime = Date.now();
            await updatePlantedAt(PLANT_ID, currentTime);
            setStartTime(currentTime);
            setIsCounting(true);
            setTimerValue(timeFormat(BASIC_SEED_TIME));
        } 
        // THIS CODE BELLOW MAKES IT A CLICKER GAME
        // else {
        //     BASIC_SEED_TIME--;
        //     console.log("Hi");
        // }
    };

    useEffect(() => {
        const checkExistingTimer = async () => {
            const dbTime = await getPlantedAt(PLANT_ID);
            console.log(`DB time is: ${dbTime}`);
            if (dbTime == 0) {
                console.log(`After DB time is: ${dbTime}`);
                setPotState(emptyPot);
                setButtonText("Plant");
                setTimerValue("Plant");
                setIsCounting(false);
                setStartTime(0);
                return;
            }

            const currentTime = Date.now();
            const timeDifference = Math.floor((currentTime - dbTime) / 1000);
            const timeLeft = BASIC_SEED_TIME - timeDifference;

            if (timeLeft <= 0) {
                setPotState(windowMonstera);
                setButtonText("Get");
                setTimerValue("Get");
            } else {
                setStartTime(dbTime);
                setIsCounting(true);
                setTimerValue(timeFormat(timeLeft));
            }
        };

        checkExistingTimer();
    }, []);

    useEffect(() => {
        let interval;

        if (isCounting && startTime > 0) {
            interval = setInterval(() => {
                const currentTime = Date.now();
                const timeDifference = Math.floor((currentTime - startTime) / 1000);
                const timeLeft = BASIC_SEED_TIME - timeDifference;

                if (timeLeft <= 0) {
                    setIsCounting(false);
                    setPotState(windowMonstera);
                    setButtonText("Get");
                    setTimerValue("Get");
                    clearInterval(interval);
                } else {
                    setTimerValue(timeFormat(timeLeft));
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isCounting, startTime]);

    return (
        <Layout>
            <div>
                {user?.user ? (
                    <div className='bg-[#D6E0B9] flex justify-center'>
                        {/* <h1 className='text-black w-[40%] text-center bg-[#ACC48B] border-b border-l border-r border-[#87a65d] rounded-b-md !p-[.em] !text-3xl font-["Kreon"]'> 🌻 {user.user.username}'s Window 💐</h1> */}
                        <h1 className='text-black w-[40%] text-center !pt-[.25em] !text-3xl font-["Kreon"]'> 🌻 {user.user.username}'s Window 💐</h1>
                    </div>
                ) : (
                    <h1>Not logged in</h1>
                )}
            </div>
            <div className="relative w-full h-full">
                {buttonText && (
                    <Timer timeleft={timerValue} onClick={handleAction} />
                )}
                {!buttonText && (
                    <img 
                        src={collectedSnakePlant} 
                        className="absolute w-3/4 h-3/4 p-[5em] top-1/8 left-1/8 backdrop-blur-sm rounded-[2%] transition-all duration-700" 
                        alt="Collected Plant" 
                    />
                
                )}
                <img 
                    src={background}
                    alt="Game Background" 
                    className="w-[40vw] h-full object-cover" 
                />
                {potState && (
                    <img 
                        src={potState}
                        alt="Plant Pot" 
                        className="absolute w-full h-full bottom-0 object-cover" 
                    />
                )}
            </div>
        </Layout>
    );
}

export default Gamble;