import plantBag from '../../assets/PlantBag.svg';
import commonSeed from '../../assets/commonSeeds.svg';
import uncommonSeed from '../../assets/uncommonSeeds.svg';
import rareSeed from '../../assets/rareSeeds.svg';
import loadingGif from '../../assets/loadingGif.gif'
import { useAuth } from '../../AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ChooseSeed({ onSelectSeed }) {
    const [commonSeeds, setCommonSeeds] = useState(0);
    const [uncommonSeeds, setUncommonSeeds] = useState(0);
    const [rareSeeds, setRareSeeds] = useState(0);

    const [commonSeedDocId, setCommonSeedDocId] = useState(null);
    const [uncommonSeedDocId, setUncommonSeedDocId] = useState(null);
    const [rareSeedDocId, setRareSeedDocId] = useState(null);
    const [loading, setLoading] = useState(false);

    const [userDocId, setUserDocId] = useState(null);

    const { user, gameData, getUserGameData } = useAuth();

    const fetchUserData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://houseplanter-backend.onrender.com/api/user-game-datas?filters[user][id][$eq]=${user.user.id}&populate=inventory_items`, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`,
                }
            });

            const data = response.data.data[0];
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

        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateSeeds = async (seedType) => {
        if (loading) return;
        setLoading(true);
        let itemDocId;
        let newQuantity;
        let rarity;
        try {
            if ((seedType === "commonSeed") && ((commonSeeds - 1) >= 0)) {
                newQuantity = commonSeeds - 1;
                itemDocId = commonSeedDocId;
                rarity = "common";
            } else if ((seedType === "uncommonSeed") && ((uncommonSeeds - 1) >= 0)) {
                newQuantity = uncommonSeeds - 1;
                itemDocId = uncommonSeedDocId;
                rarity = "uncommon";
            } else if ((seedType === "rareSeed") && ((rareSeeds - 1) >= 0)) {
                newQuantity = rareSeeds - 1;
                itemDocId = rareSeedDocId;
                rarity = "rare";
            } else {
                return;
            }

            // Update inventory item
            if (itemDocId) {
                await axios.put(`https://houseplanter-backend.onrender.com/api/inventory-items/${itemDocId}`, {
                    data: { quantity: newQuantity }
                }, {
                    headers: { Authorization: `Bearer ${user.jwt}` }
                });
            }

            onSelectSeed({ type: seedType, rarity });
        } catch (error) {
            console.error("Error updating seed data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div
            className="absolute left-1/2 top-1/3 z-50 transform -translate-x-1/2 -translate-y-1/2 w-70 h-90 bg-cover bg-center"
            style={{ backgroundImage: `url(${plantBag})` }}
        >
            {loading && (
                <div className="fixed inset-0 p-5 flex items-center shadow-md justify-center z-50 bg-white/30 rounded-3xl transition-all duration-500 ease-in-out">
                    <img src={loadingGif} alt="Loading..." className='shadow-2xl rounded-2xl w-85' />
                </div>
            )}
            <div className='mt-[5em] m-6 flex flex-col'>
                <div onClick={!loading ? () => updateSeeds("commonSeed") : null} className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} p-1 mb-2 flex flex-row bg-[#acc48b] border border-[#8da36f] text-black cursor-pointer rounded-xl hover:bg-[#8da36f] hover:text-white`}>
                    <img className="p-1" src={commonSeed} alt="" />
                    <p className="p-1">Common Seeds</p>
                    <p className="p-1 text-nowrap">Count: {commonSeeds}</p>
                </div>
                <div onClick={!loading ? () => updateSeeds("uncommonSeed") : null} className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} p-1 mb-2 flex flex-row bg-[#acc48b] border border-[#8da36f] text-black cursor-pointer rounded-xl hover:bg-[#8da36f] hover:text-white`}>
                    <img className="p-1" src={uncommonSeed} alt="" />
                    <p className="p-1">Uncommon Seeds</p>
                    <p className="p-1 text-nowrap">Count: {uncommonSeeds}</p>
                </div>
                <div onClick={!loading ? () => updateSeeds("rareSeed") : null} className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} p-1 mb-2 flex flex-row bg-[#acc48b] border border-[#8da36f] text-black cursor-pointer rounded-xl hover:bg-[#8da36f] hover:text-white`}>
                    <img className="p-1" src={rareSeed} alt="" />
                    <p className="p-1 text-balance">Rare Seeds</p>
                    <p className="p-1 text-nowrap">Count: {rareSeeds}</p>
                </div>
            </div>
        </div>
    );
}

export default ChooseSeed;
