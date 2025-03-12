/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import gambleBackground from '../../assets/img/window.png';
import emptyPot from '../../assets/img/empty_pot.png';
import './Gamble.css';
import Layout from '../../Layout';
import axios from "axios";
import Timer from '../Timer/Timer';
import CollectedPlantCard from "../PlantCard";
import ChooseSeed from './ChooseSeed';

// Helper functions
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const API_BASE_URL = 'https://houseplanter-backend.onrender.com/api';

function Gamble() {
    const { user, gameData, getUserGameData } = useAuth();

    // plant state
    const [plantStatus, setPlantStatus] = useState("idle");
    const [growthTime, setGrowthTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [timerValue, setTimerValue] = useState("Plant");
    const [buttonText, setButtonText] = useState("Plant");

    // plant data
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [collectedPlant, setCollectedPlant] = useState(null);
    
    // visual elements
    const [potImage, setPotImage] = useState(emptyPot);
    const [growthStages, setGrowthStages] = useState([]);
    const [currentGrowthStage, setCurrentGrowthStage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);

    // Calls Seeds API to get plants of that seed + that seed's pot image
    const fetchSeedDetails = async (seedRarity) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/seeds/?filters[rarity][$eq]=${seedRarity}&populate=*`, {
                headers: { Authorization: `Bearer ${user.jwt}` },
            });

            const seed = response.data.data[0];
            const plantTypes = seed?.plant_types || [];
            const potImage = seed?.pot?.url || emptyPot;

            return { 
                plantTypes: Array.isArray(plantTypes) ? plantTypes : [plantTypes],
                potImage
            };
        } catch (error) {
            console.error("Error fetching seed details:", error.response?.data || error);
            return { plantTypes: [], potImage: emptyPot };
        }
    };

    // Calls Plant API to get all plant details of selected plant
    const fetchPlantDetails = async (plantType) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/plants/?filters[type][$eq]=${plantType}&populate=growthStage&populate=image`,
                { headers: { Authorization: `Bearer ${user.jwt}` } }
            );
            
            return response.data.data[0];
        } catch (error) {
            console.error("Error fetching plant details:", error);
            return null;
        }
    };

    // Selects a random plant based on seed
    const selectRandomPlant = async (plantTypes, potImage) => {
        if (!plantTypes.length) return null;
        
        const randomIndex = Math.floor(Math.random() * plantTypes.length);
        const selectedPlant = plantTypes[randomIndex];
        
        if (!selectedPlant) return null;
        
        const plantData = await fetchPlantDetails(selectedPlant.type);
        if (!plantData) return selectedPlant;
        
        const windowImage = plantData.image.find(img => img.name.includes("window"));
        const growthImages = plantData.growthStage?.map(stage => stage.url) || [];
        
        const allStages = [potImage, ...growthImages, windowImage?.url || ""];
        const finalImageUrl = windowImage?.url || "";
        const growthTimeValue = Number(plantData.growthTime);
        
        setGrowthStages(allStages);
        setCurrentGrowthStage(potImage);
        setFinalImage(finalImageUrl);
        setGrowthTime(growthTimeValue);
        
        return {
            ...selectedPlant,
            image: windowImage ? windowImage.url : "",
            growthTime: growthTimeValue,
            growthStages: allStages,
            finalImage: finalImageUrl
        };
    };

    const savePlantToLocalStorage = (plant, currentTime) => {
        localStorage.setItem('plantStartTime', currentTime.toString());
        localStorage.setItem('growthTime', plant.growthTime.toString());
        localStorage.setItem('plantStatus', 'growing');
        localStorage.setItem('currentGrowthStage', potImage);
        localStorage.setItem('growthStages', JSON.stringify(plant.growthStages));
        localStorage.setItem('finalImage', plant.finalImage);
        localStorage.setItem('plantType', plant.type);
        localStorage.setItem('plantRarity', plant.rarity);
        localStorage.setItem('plantId', plant.id);
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('plantStartTime');
        localStorage.removeItem('growthTime');
        localStorage.removeItem('plantStatus');
        localStorage.removeItem('currentGrowthStage');
        localStorage.removeItem('growthStages');
        localStorage.removeItem('finalImage');
        localStorage.removeItem('plantType');
        localStorage.removeItem('plantRarity');
        localStorage.removeItem('plantId');
    };

    // User actions
    const chooseSeed = () => {
        setPlantStatus("choosing");
    };

    const plantSeed = async (seed) => {
        const { plantTypes, potImage } = await fetchSeedDetails(seed.rarity);
        setPotImage(potImage);
    
        const plant = await selectRandomPlant(plantTypes, potImage);
        if (!plant) return;
        
        setSelectedPlant(plant);
        
        const currentTime = Date.now();
        setStartTime(currentTime);
        setPlantStatus("growing");
        
        savePlantToLocalStorage(plant, currentTime);
    };

    const collectPlant = async () => {
        // Try to get plant data either from state or localStorage
        const plantType = selectedPlant?.type || localStorage.getItem('plantType');
        const plantRarity = selectedPlant?.rarity || localStorage.getItem('plantRarity');
        const plantId = selectedPlant?.id || localStorage.getItem('plantId');
        
        if (!plantType || !plantRarity || !user?.jwt || !gameData?.id) {
            alert("Missing plant data for collection. Please refresh and try again.");
            return;
        }
        
        try {
            await axios.post(`${API_BASE_URL}/user-plants`, {
                data: {
                    type: plantType,
                    rarity: plantRarity,
                    growthStage: 1,
                    TimerStartTime: Date.now(),
                    harvestable: true,
                    user: gameData.id,
                    plant: plantId
                }
            }, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application/json"
                },
            });

            getUserGameData(user.user.id, user.jwt);
            setCollectedPlant({ name: plantType });
            setPlantStatus("collected");
            clearLocalStorage();
        } catch (error) {
            console.error("Error collecting plant:", error.response?.data || error);
            alert("Failed to collect plant. Please try again.");
        }
    };

    const handleAction = () => {
        if (plantStatus === "idle") {
            chooseSeed();
        } else if (plantStatus === "ready") {
            collectPlant();
        }
    };

    // Update the growth stage based on elapsed time
    const updateGrowthStage = (elapsedTime) => {
        if (growthStages.length <= 1) return;
        
        const progress = elapsedTime / growthTime;
        const stageIndex = Math.min(
            Math.floor(progress * (growthStages.length - 1)),
            growthStages.length - 2 // Never reach the final stage until ready
        );
        
        const newStage = growthStages[stageIndex];
        if (newStage) {
            setCurrentGrowthStage(newStage);
            localStorage.setItem('currentGrowthStage', newStage);
        }
    };

    // Timer effect to update plant growth
    useEffect(() => {
        if (plantStatus !== "growing" || startTime <= 0) return;
        
        const interval = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            const remainingTime = growthTime - elapsedTime;
            
            if (remainingTime <= 0) {
                // Plant is ready
                clearInterval(interval);
                setPlantStatus("ready");
                setButtonText(" ");
                setTimerValue("Collect");
                
                // Show final image when ready
                if (finalImage) {
                    setCurrentGrowthStage(finalImage);
                    localStorage.setItem('currentGrowthStage', finalImage);
                }
                
                localStorage.setItem('plantStatus', 'ready');
            } else {
                // Plant is still growing
                setTimerValue(formatTime(remainingTime));
                updateGrowthStage(elapsedTime);
            }
        }, 1000);
        
        return () => clearInterval(interval);
    }, [plantStatus, growthTime, startTime, growthStages, finalImage]);

    // Load saved state on mount
    useEffect(() => {
        const restorePlantState = () => {
            const savedStatus = localStorage.getItem('plantStatus');
            
            if (!savedStatus || savedStatus === 'idle') {
                setPlantStatus("idle");
                return;
            }
            
            // Restore growth stages and images
            const savedStagesStr = localStorage.getItem('growthStages');
            if (savedStagesStr) {
                try {
                    const stages = JSON.parse(savedStagesStr);
                    setGrowthStages(stages);
                } catch (e) {
                    console.error("Error parsing growth stages:", e);
                }
            }
            
            const savedFinalImage = localStorage.getItem('finalImage');
            if (savedFinalImage) {
                setFinalImage(savedFinalImage);
            }
            
            const savedCurrentStage = localStorage.getItem('currentGrowthStage');
            if (savedCurrentStage) {
                setCurrentGrowthStage(savedCurrentStage);
            }
            
            const savedGrowthTime = localStorage.getItem('growthTime');
            if (savedGrowthTime) {
                setGrowthTime(Number(savedGrowthTime));
            }
            
            // Handle different states
            if (savedStatus === "choosing") {
                setPlantStatus("choosing");
                return;
            }
            
            const savedStartTime = localStorage.getItem('plantStartTime');
            if (savedStatus === "growing" && savedStartTime && savedGrowthTime) {
                const startTimeValue = Number(savedStartTime);
                const growthTimeValue = Number(savedGrowthTime);
                
                setStartTime(startTimeValue);
                
                // Check if plant should already be ready
                const elapsedTime = Math.floor((Date.now() - startTimeValue) / 1000);
                const remainingTime = growthTimeValue - elapsedTime;
                
                if (remainingTime <= 0) {
                    // Plant should be ready
                    setPlantStatus("ready");
                    setButtonText(" ");
                    setTimerValue("Collect");
                    
                    if (savedFinalImage) {
                        setCurrentGrowthStage(savedFinalImage);
                    }
                    
                    localStorage.setItem('plantStatus', 'ready');
                } else {
                    // Plant still growing
                    setPlantStatus("growing");
                    setButtonText(" ");
                    setTimerValue(formatTime(remainingTime));
                    updateGrowthStage(elapsedTime);
                }
            } else if (savedStatus === "ready") {
                setPlantStatus("ready");
                setButtonText(" ");
                setTimerValue("Collect");
                
                if (savedFinalImage) {
                    setCurrentGrowthStage(savedFinalImage);
                }
            } else {
                // Unknown state - reset
                clearLocalStorage();
                setPlantStatus("idle");
                setButtonText("Plant");
                setTimerValue("Plant");
            }
        };
        
        restorePlantState();
    }, []);

    // Render plant based on its status
    const renderPlant = () => {
        switch (plantStatus) {
            case "idle":
                return <img src={emptyPot} className="absolute w-full h-full bottom-0 object-cover" alt="Empty pot" />;
                
            case "choosing":
                return <ChooseSeed onSelectSeed={plantSeed} />;
                
            case "growing":
            case "ready":
                return currentGrowthStage ? (
                    <img 
                        src={currentGrowthStage} 
                        className="absolute bottom-0 w-full object-cover" 
                        alt={`Plant at ${plantStatus === "ready" ? "ready" : "growing"} stage`}
                        onError={(e) => {
                            console.error('Image failed to load:', e.target.src);
                            const savedStage = localStorage.getItem('currentGrowthStage');
                            if (savedStage && savedStage !== e.target.src) {
                                e.target.src = savedStage;
                            }
                        }}
                    />
                ) : null;
                
            case "collected":
                return (
                    <div className="absolute inset-0 flex items-center justify-center z-50 -mt-60">
                        <CollectedPlantCard plantName={collectedPlant.name} />
                    </div>
                );
                
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div>
                {user?.user ? (
                    <div className='bg-[#D6E0B9] flex justify-center'>
                        <h1 className='text-[#546c4c] w-[40%] text-center !pt-[.25em] !text-3xl font-["Kreon"]'>
                            {user.user.username}&apos;s Window
                        </h1>
                    </div>
                ) : (
                    <h1>Not logged in</h1>
                )}
            </div>

            <div className="relative w-full h-full">
                {buttonText && <Timer timeleft={timerValue} onClick={handleAction} />}
                <img src={gambleBackground} className="h-full object-cover" alt="Window background" />
                {renderPlant()}
            </div>
        </Layout>
    );
}

export default Gamble;