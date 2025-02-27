import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import gambleBackground from '../../assets/img/window.png';
import emptyPot from '../../assets/img/empty_pot.png';
import commonPot from '../../assets/img/common_pot.png';
import windowSnakePlant from '../../assets/img/window_snake_plant.png';
import collectedSnakePlant from '../../assets/CollectedSnakePlant.svg';
import './Gamble.css';
import Layout from '../../Layout';
import axios from "axios";
import Timer from '../Timer/Timer';
import CollectedPlantCard from "../PlantCard"

const timeFormat = (input) => {
    const minutes = Math.floor(input / 60);
    const seconds = input % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

function Gamble() {
    const { user, gameData, getUserGameData } = useAuth();

    const [plantStatus, setPlantStatus] = useState("idle"); // idle, growing, ready, collected
    const [startTime, setStartTime] = useState(0);
    const [growthTime, setGrowthTime] = useState(30);
    const [buttonText, setButtonText] = useState("Plant");
    const [timerValue, setTimerValue] = useState("Plant");
    const [collectedPlant, setCollectedPlant] = useState(null)


    // Fetch Seed Details 
    // idea user picks a seed (the rarity) 
    // then we get what kind of plants we can get from that rarity
    // then via selectRandomPlant we pick a random plant with that rarity
    const fetchSeedDetails = async (seedRarity) => {
        try {
            const response = await axios.get(`https://houseplanter-backend.onrender.com/api/seeds/?filters[rarity][$eq]=${seedRarity}&populate=plant_types`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                },
            });

            const seed = response.data.data[0];
            const plantTypes = seed?.plant_types || [];
            return Array.isArray(plantTypes) ? plantTypes : [plantTypes];
        } catch (error) {
            console.error("Error fetching seed details:", error.response?.data || error);
        }
    };

    // randomly Select a Plant & set growth time depending on plant selected
    const selectRandomPlant = (plantTypes) => {
        const randomIndex = Math.floor(Math.random() * plantTypes.length);
        const selectedPlant = plantTypes[randomIndex];
        setGrowthTime(Number(selectedPlant.growthTime));
        return selectedPlant;
    };

    // Handle Planting the Seed
    //  - Set the start time
    //  - Save to localStorage for persistence
    //  - Update UI for growing state
    const plantSeed = () => {
        const currentTime = Date.now();
        setStartTime(currentTime);
        localStorage.setItem('plantStartTime', currentTime); 
        setPlantStatus("growing");
        setButtonText(" ");
        setTimerValue(timeFormat(growthTime));
    };

    //  Handle Collecting the Plant
    //  - Fetch Seed Details
    //  - Randomly select a plant type
    //  - Post the collected plant to the backend
    const collectPlant = async () => {
        try {
            const plantTypes = await fetchSeedDetails("common"); // change to getting seed from users inv
            const selectedPlant = selectRandomPlant(plantTypes);

            console.log(selectedPlant.type)
            // console.log(selectedPlant.image[0]?.url)

            await axios.post('https://houseplanter-backend.onrender.com/api/user-plants', {
                data: {
                    type: selectedPlant.type,
                    rarity: selectedPlant.rarity,
                    growthStage: 1,
                    TimerStartTime: Date.now(),
                    harvestable: true,
                    user: gameData.id
                }
            }, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application/json"
                },
            });

            getUserGameData(user.user.id, user.jwt);
            
            setCollectedPlant({
                name: selectedPlant.type,
            });

            setPlantStatus("collected");
        } catch (error) {
            console.error("Error collecting plant:", error.response?.data || error);
            alert("Failed to collect plant. Check console for details.");
        }
    };

    // Timer Logic
    useEffect(() => {
        let interval;

        if (plantStatus === "growing" && startTime > 0) {
            interval = setInterval(() => {
                const timeDifference = Math.floor((Date.now() - startTime) / 1000);
                const remainingTime = growthTime - timeDifference;

                if (remainingTime <= 0) {
                    clearInterval(interval);
                    setPlantStatus("ready");
                    setButtonText(" ");
                    setTimerValue("Collect");
                    localStorage.removeItem('plantStartTime');
                } else {
                    setTimerValue(timeFormat(remainingTime));
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [plantStatus, growthTime, startTime]);

    //  Load Start Time from localStorage on Component Mount
    useEffect(() => {
        const savedStartTime = localStorage.getItem('plantStartTime');
        if (savedStartTime) {
            const startTimeFromStorage = Number(savedStartTime);
            const timeDifference = Math.floor((Date.now() - startTimeFromStorage) / 1000);
            const remainingTime = growthTime - timeDifference;

            if (remainingTime > 0) {
                setStartTime(startTimeFromStorage);
                setPlantStatus("growing");
                setTimerValue(timeFormat(remainingTime));
                setButtonText(" ");
            } else {
                setPlantStatus("ready");
                setButtonText(" ");
                setTimerValue("Collect");
                localStorage.removeItem('plantStartTime');
            }
        }
    }, []);

    const handleAction = () => {
        if (plantStatus === "idle") {
            plantSeed();
        } else if (plantStatus === "ready") {
            collectPlant();
        }
    };

    return (
            <Layout>
                


            <div>
                {user?.user ? (
                    <div className='bg-[#D6E0B9] flex justify-center'>
                        <h1 className='text-[#546c4c] w-[40%] text-center !pt-[.25em] !text-3xl font-["Kreon"]'>{user.user.username}&apos;s Window</h1>
                    </div>
                ) : (
                    <h1>Not logged in</h1>
                )}
            </div>

            <div className="relative w-full h-full">
                {buttonText && (
                    <Timer timeleft={timerValue} onClick={handleAction} />
                )}
                {!buttonText && plantStatus === "collected" && (
                    <img
                        src={collectedSnakePlant}
                        className="absolute w-3/4 h-3/4 p-[5em] top-1/8 left-1/8 backdrop-blur-sm rounded-[2%] transition-all duration-700"
                        alt="Collected Plant"
                    />
                )}

                {/* change images to be taken from strapi */}
                <img src={gambleBackground} className="h-full object-cover" />

                <img src={plantStatus === "idle" ? emptyPot : commonPot} className="absolute w-full h-full bottom-0 object-cover" />

                {plantStatus === "growing" && (
                    <img src={commonPot} className="absolute w-full h-full bottom-0 object-cover" />
                )}

                {plantStatus === "ready" && (
                    <img src={windowSnakePlant} className="absolute w-full h-full bottom-0 object-cover" />
                )}

                {plantStatus === "collected" && (
                    <CollectedPlantCard 
                    plantName={collectedPlant.name} 
                    
                 />
                    // <img
                    //     src={collectedSnakePlant}
                    //     className="absolute w-3/4 h-3/4 p-[5em] top-1/8 left-1/8 backdrop-blur-sm rounded-[2%] transition-all duration-700 z-[10]"
                    //     alt="Collected Plant"
                    //     onClick={() => {
                    //         setPlantStatus("idle");
                    //         setStartTime(0);
                    //         setButtonText(" ");
                    //         setTimerValue("Plant");
                    //     }}
                    // />
                )}
            </div>
        </Layout>
    );
}

export default Gamble;