import seedBagBackground from '../../assets/seedBagBackground.svg';
import React, { useEffect, useState } from 'react';
import seedBag from '../../assets/SeedBag.svg';
import commonSeed from '../../assets/commonSeeds.svg';
import uncommonSeed from '../../assets/uncommonSeeds.svg';
import rareSeed from '../../assets/rareSeeds.svg';
import { useAuth } from '../../AuthContext';
import Sell from './Sell';
import Buy from './Buy';
import buyTab from '../../assets/BuyTab.svg';
import sellTab from '../../assets/SellTab.svg';
import loadingGif from '../../assets/loadingGif.gif'
import axios from 'axios';

function SeedBag() {
    const [shopType, setShopType] = useState("Sell");
    const [money, setMoney] = useState(0);
    const [commonSeeds, setCommonSeeds] = useState(0);
    const [uncommonSeeds, setUncommonSeeds] = useState(0);
    const [rareSeeds, setRareSeeds] = useState(0);
    const [loading, setLoading] = useState(false);
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
            setMoney(data.money);

            const inventoryItems = data.inventory_items || [];

            let commonSeed = inventoryItems.find(item => item.itemName === "CommonSeed");
            let uncommonSeed = inventoryItems.find(item => item.itemName === "UncommonSeed");
            let rareSeed = inventoryItems.find(item => item.itemName === "RareSeed");

            setCommonSeeds(commonSeed ? commonSeed.quantity : 0);
            setUncommonSeeds(uncommonSeed ? uncommonSeed.quantity : 0);
            setRareSeeds(rareSeed ? rareSeed.quantity : 0);

        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='flex flex-col items-center'>
            {(loading) && (
                <div className="fixed inset-0 p-5 flex items-center shadow-md justify-center z-150 bg-white/30 rounded-3xl transition-all duration-500 ease-in-out">
                    <img src={loadingGif} alt="" className='shadow-2xl rounded-2xl w-85' />
                </div>
            )}
            <div className="bg-cover bg-center flex flex-row m-[1em] p-[2em]" style={{ backgroundImage: `url(${seedBagBackground})` }}>
                <div>
                    <img src={seedBag} alt="Seed Bag" className="p-4 w-100 h-80 flex-shrink-0" />
                </div>
                <div className='m-[1em]'>
                    <div>
                        <h2 className='text-orange-400 text-4xl font-semibold mb-[.25em]'>Seed Bag</h2>
                    </div>
                    <div className='flex flex-col items-center rounded-md bg-[#ACC48B]'>
                        <h2 className='text-white '>Current Collection</h2>
                        <div className='border-t-2 border-b-2 border-white ml-[2em] mr-[3em] mb-[1em]'>
                            <div className='flex flex-row'>
                                <div className="flex flex-row items-center justify-center">
                                    <img src={commonSeed} className="w-16 h-16 pr-2" alt="" />
                                    <div className="flex whitespace-nowrap mr-[4em] ml-[em] flex-col">
                                        <p>Common Seeds</p>
                                        <p>Count: {commonSeeds}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <img src={uncommonSeed} className="w-16 h-16 pr-2" alt="" />
                                    <div className="whitespace-nowrap flex flex-col">
                                        <p>Uncommon Seeds</p>
                                        <p>Count: {uncommonSeeds}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center justify-center">
                                    <img src={rareSeed} className="w-16 h-16 pr-2" alt="" />
                                    <div className="whitespace-nowrap flex flex-col">
                                        <p>Rare Seeds</p>
                                        <p>Count: {rareSeeds}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2 className='pb-[1em]'>Wallet: {money}$</h2>
                    </div>
                </div>
            </div>
            <div className='w-[80%]'>
                <div className='flex flex-row justify-between gap-8 relative'>
                    <div
                        onClick={() => setShopType("buy")}
                        className={`cursor-pointer text-black rounded-t-md transition-all duration-300 
                            ${shopType === "buy" ? "bg-[#ACC48B] z-20" : "bg-[#96AB79] translate-y-[.5em] z-10"}`}
                    >
                        <img src={buyTab} alt="Buy" className='cursor-pointer p-2 mx-14 h-12 object-contain' />
                    </div>
                    <div
                        onClick={() => setShopType("sell")}
                        className={`cursor-pointer text-black rounded-t-md transition-all duration-300 
                            ${shopType === "sell" ? "bg-[#ACC48B] z-20" : "bg-[#96AB79] translate-y-[.5em] z-10"}`}
                    >
                        <img src={sellTab} alt="Sell" className='cursor-pointer p-2 mx-14 h-12 object-contain' />
                    </div>
                </div>
                <div className='z-20 relative'>
                    {shopType === "buy" ?
                        <Buy money={money} setMoney={setMoney} commonSeeds={commonSeeds} setCommonSeeds={setCommonSeeds}
                            uncommonSeeds={uncommonSeeds} setUncommonSeeds={setUncommonSeeds}
                            rareSeeds={rareSeeds} setRareSeeds={setRareSeeds} />
                        :
                        <Sell money={money} setMoney={setMoney} />}
                </div>
            </div>

        </div>
    );
}

export default SeedBag;