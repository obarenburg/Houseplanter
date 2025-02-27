import React, { useEffect, useState } from 'react';
import flower from '../../assets/Flower.svg';
import sellButton from '../../assets/Sell.svg';
import { useAuth } from '../../AuthContext';

function Sell({ money, setMoney }) {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const { gameData } = useAuth();
    const [userPlants, setUserPlants] = useState(Array.isArray(gameData?.user_plants) ? gameData.user_plants : []);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userID = storedUser?.user?.id || storedUser?.id;
    const jwtToken = storedUser?.jwt;

    const handleSell = (index) => {
        console.log("User ID is:", userID);
        setUserPlants(prevPlants => prevPlants.filter((_, i) => i !== index));
        setMoney(money + 100);
        updateDatabase(userID, 100);
    };
    
    const updateDatabase = async (documentId, value) => {
        
    };

    return (
        <div className='bg-[#ACC48B]'>
                    <div className='py-[.5em] mb-[1em]'>
                        {userPlants.length > 0 ? (
                            userPlants.map((plant, index) => {
                                console.log(`Plant ${index}:`, plant);
                                if (plant.type != null) {
                                    return (
                                        <div className='!bg-gray-200 !flex !flex-row !p-0 !m-[1em] text-black list-none !rounded-t-md !border-0'>
                                            <div className='bg-gray-400 !m-0'>
                                                <img src={flower} alt="" className='p-[.5em] !w-30' />
                                            </div>
                                            <div className='!flex !flex-col !justify-between !gap-1 !h-full !w-full'>
                                                <div className='!flex !justify-between'>
                                                    <p className='!ml-2 text-xl font-bold font-["Kreon"]'>{plant.type}</p>
                                                    <p className='!mr-2 text-xl font-bold font-["Kreon"]'>100$</p>
                                                </div>
                                                <div className='!flex !justify-between'>
                                                    <p className='!ml-2 text-xl font-bold font-["Kreon"] !mt-auto'>{plant.rarity}</p>
                                                    <div className='!flex !justify-end !mt-auto !ml-auto !w-30 cursor-pointer' onClick={() => handleSell(index)}>
                                                        <img src={sellButton} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        ) : (
                            <p>No plants collected yet.</p>
                        )}
                    </div>
                </div>
    )
}

export default Sell