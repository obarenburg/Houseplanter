/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import flower from '../../assets/Flower.svg';
import sellButton from '../../assets/Sell.svg';
import { useAuth } from '../../AuthContext';
import loadingGif from '../../assets/loadingGif.gif'
import axios from 'axios';

function Sell({ money, setMoney }) {
    const { user } = useAuth();

    const [userPlants, setUserPlants] = useState([]);
    const [userDocId, setUserDocId] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            console.log(user.user.id)
            const response = await axios.get(`https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate=user_plants`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                }
            });

            const data = response.data.data[0];
            // setMoney(data.money);
            setUserPlants(data.user_plants);
            setUserDocId(data.documentId)
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const getPriceByRarity = (rarity) => {
        switch (rarity) {
            case 'common':
                return 50;
            case 'uncommon':
                return 150;
            case 'rare':
                return 500;
            default:
                return 0;
        }
    };

    const handleSell = async (index, plant) => {
        if (loading) return;
        setLoading(true);
        try {
            const updatedPlants = userPlants.filter((_, i) => i !== index);
            const newMoney = money + getPriceByRarity(plant.rarity)

            setUserPlants(updatedPlants);
            setMoney(newMoney);

            // get plant doc id
            const plantDocId = plant.documentId;
            console.log(plantDocId)

            // delete using plant doc id
            await axios.delete(`https://houseplanter-backend.onrender.com/api/user-plants/${plantDocId}`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                }
            });

            // update user money
            await axios.put(`https://houseplanter-backend.onrender.com/api/user-game-datas/${userDocId}`, {
                data: {
                    money: newMoney
                }
            }, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                    "Content-Type": "application/json"
                }
            });

            // refresh State
            fetchUserData();
        } catch (error) {
            console.error("Error selling plant:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-[#ACC48B]'>
            {(loading) && (
                <div className="fixed inset-0 p-5 flex items-center shadow-md justify-center z-150 bg-white/30 rounded-3xl transition-all duration-500 ease-in-out">
                    <img src={loadingGif} alt="" className='shadow-2xl rounded-2xl w-85' />
                </div>
            )}
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
                                            <p className='!mr-2 text-xl font-bold font-["Kreon"]'>${getPriceByRarity(plant.rarity)}</p>
                                        </div>
                                        <div className='!flex !justify-between'>
                                            <p className='!ml-2 text-xl font-bold font-["Kreon"] !mt-auto'>{plant.rarity}</p>
                                            <div className='!flex !justify-end !mt-auto !ml-auto !w-30 cursor-pointer' onClick={() => handleSell(index, plant)}>
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