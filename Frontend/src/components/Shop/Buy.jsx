import React, { useEffect, useState, useRef } from 'react';
import buyButton from '../../assets/Buy.svg';
import { useAuth } from '../../AuthContext';
import commonSeed from '../../assets/commonSeeds.svg';
import uncommonSeed from '../../assets/uncommonSeeds.svg';
import rareSeed from '../../assets/rareSeeds.svg';
import loadingGif from '../../assets/loadingGif.gif'
import axios from 'axios';

function Buy({ money, setMoney, commonSeeds, setCommonSeeds,
    uncommonSeeds, setUncommonSeeds,
    rareSeeds, setRareSeeds }) {

    const { user, gameData, getUserGameData } = useAuth();
    const commonSeedPrice = 25;
    const uncommonSeedPrice = 50;
    const rareSeedPrice = 100;

    const [commonSeedDocId, setCommonSeedDocId] = useState(null);
    const [uncommonSeedDocId, setUncommonSeedDocId] = useState(null);
    const [rareSeedDocId, setRareSeedDocId] = useState(null);
    const [userDocId, setUserDocId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                `https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate=inventory_items`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    }
                }
            );

            const data = response.data.data[0];
            setMoney(data.money);
            setUserDocId(data.documentId);

            const inventoryItems = data.inventory_items || [];

            let commonSeed = inventoryItems.find(item => item.itemName === "CommonSeed");
            let uncommonSeed = inventoryItems.find(item => item.itemName === "UncommonSeed");
            let rareSeed = inventoryItems.find(item => item.itemName === "RareSeed");

            if (commonSeed) setCommonSeedDocId(commonSeed.documentId);
            if (uncommonSeed) setUncommonSeedDocId(uncommonSeed.documentId);
            if (rareSeed) setRareSeedDocId(rareSeed.documentId);

            setCommonSeeds(commonSeed ? commonSeed.quantity : 0);
            setUncommonSeeds(uncommonSeed ? uncommonSeed.quantity : 0);
            setRareSeeds(rareSeed ? rareSeed.quantity : 0);

            const createSeedIfMissing = async (seedType) => {
                if (loading) return;
                setLoading(true);
                const existingSeed = inventoryItems.find(item => item.itemName === seedType);
                if (!existingSeed) {
                    try {
                        const postResponse = await axios.post(
                            "https://houseplanter-backend.onrender.com/api/inventory-items",
                            {
                                data: {
                                    user: gameData.documentId,
                                    itemName: seedType,
                                    quantity: 0,
                                    type: seedType.toLowerCase().replace("seed", "")
                                }
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${user.jwt}`,
                                    "Content-Type": "application/json"
                                },
                            }
                        );

                        return postResponse.data.data.documentId;
                    } catch (postError) {
                        console.error(`Error creating ${seedType}:`, postError);
                        return null;
                    }
                }
                return existingSeed.documentId;
            };

            const commonId = await createSeedIfMissing("CommonSeed");
            const uncommonId = await createSeedIfMissing("UncommonSeed");
            const rareId = await createSeedIfMissing("RareSeed");

            if (!commonSeedDocId && commonId) setCommonSeedDocId(commonId);
            if (!uncommonSeedDocId && uncommonId) setUncommonSeedDocId(uncommonId);
            if (!rareSeedDocId && rareId) setRareSeedDocId(rareId);

            const updatedResponse = await axios.get(
                `https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate=inventory_items`,
                {
                    headers: {
                        Authorization: `Bearer ${user.jwt}`,
                    }
                }
            );

            const updatedData = updatedResponse.data.data[0];
            const updatedInventory = updatedData.inventory_items || [];

            setCommonSeeds(updatedInventory.find(item => item.itemName === "CommonSeed")?.quantity || 0);
            setUncommonSeeds(updatedInventory.find(item => item.itemName === "UncommonSeed")?.quantity || 0);
            setRareSeeds(updatedInventory.find(item => item.itemName === "RareSeed")?.quantity || 0);

        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };


    const hasFetchedData = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetchedData.current) return;
            hasFetchedData.current = true;

            await fetchUserData();
        };

        fetchData();
    }, []);

    const handleBuy = async (type) => {
        if (loading) return;
        setLoading(true);

        try {
            let newMoney = money;
            let newQuantity;
            let itemDocId;

            if (type === "common" && money >= commonSeedPrice) {
                newMoney -= commonSeedPrice;
                newQuantity = commonSeeds + 1;
                setCommonSeeds(newQuantity);
                itemDocId = commonSeedDocId;
            } else if (type === "uncommon" && money >= uncommonSeedPrice) {
                newMoney -= uncommonSeedPrice;
                newQuantity = uncommonSeeds + 1;
                setUncommonSeeds(newQuantity);
                itemDocId = uncommonSeedDocId;
            } else if (type === "rare" && money >= rareSeedPrice) {
                newMoney -= rareSeedPrice;
                newQuantity = rareSeeds + 1;
                setRareSeeds(newQuantity);
                itemDocId = rareSeedDocId;
            } else {
                setIsBuying(false);
                return;
            }

            setMoney(newMoney);

            // Update user money
            await axios.put(`https://houseplanter-backend.onrender.com/api/user-game-datas/${userDocId}`, {
                data: { money: newMoney }
            }, {
                headers: { Authorization: `Bearer ${user.jwt}` }
            });

            // Update inventory item
            if (itemDocId) {
                await axios.put(`https://houseplanter-backend.onrender.com/api/inventory-items/${itemDocId}`, {
                    data: { quantity: newQuantity }
                }, {
                    headers: { Authorization: `Bearer ${user.jwt}` }
                });
            }

        } catch (error) {
            console.error("Error purchasing seed:", error);
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
                {[{
                    type: "common",
                    label: "Common Seeds",
                    price: commonSeedPrice,
                    image: commonSeed
                }, {
                    type: "uncommon",
                    label: "Uncommon Seeds",
                    price: uncommonSeedPrice,
                    image: uncommonSeed
                }, {
                    type: "rare",
                    label: "Rare Seeds",
                    price: rareSeedPrice,
                    image: rareSeed
                }].map(({ type, label, price, image }) => (
                    <div key={type} className='bg-gray-200 flex flex-row p-0 m-[1em] text-black list-none rounded-t-md border-0'>
                        <div className='bg-gray-400 m-0'>
                            <img src={image} alt={label} className='p-[.5em] w-30' />
                        </div>
                        <div className='flex flex-col justify-between gap-1 h-full w-full'>
                            <div className='flex justify-between'>
                                <p className='ml-2 text-xl font-bold font-["Kreon"]'>{label}</p>
                                <p className='mr-2 text-xl font-bold font-["Kreon"]'>{price + "$"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='ml-2 text-xl font-bold font-["Kreon"] mt-auto'>In Stock</p>
                                <div className={`flex cursor-pointer justify-end mt-auto ml-auto w-30 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={!loading ? () => handleBuy(type) : null}>
                                    <img src={buyButton} alt="Buy" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Buy;