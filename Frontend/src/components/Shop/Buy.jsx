import React, { useEffect, useState } from 'react';
import buyButton from '../../assets/Buy.svg';
import { useAuth } from '../../AuthContext';
import commonSeed from '../../assets/commonSeeds.svg';
import uncommonSeed from '../../assets/uncommonSeeds.svg';
import rareSeed from '../../assets/rareSeeds.svg';

function Buy({ money, setMoney, commonSeeds, setCommonSeeds,
    uncommonSeeds, setUncommonSeeds,
    rareSeeds, setRareSeeds }) { {
    const { gameData } = useAuth();
    const commonSeedPrice = 25;
    const uncommonSeedPrice = 50;
    const rareSeedPrice = 100;

    const userPlants = Array.isArray(gameData?.user_plants) ? gameData.user_plants : [];

    console.log("gameData:", gameData);
    console.log("userPlants:", userPlants);

    const handleBuy = (type) => {
        if ((type == "common") && (money - commonSeedPrice >= 0)) {
            setMoney(money - commonSeedPrice);
            setCommonSeeds(commonSeeds + 1);
        } else if ((type == "uncommon") && (money - uncommonSeedPrice >= 0)) {
            setMoney(money - uncommonSeedPrice);
            setUncommonSeeds(uncommonSeeds + 1);

        } else if ((type == "rare") && (money - rareSeedPrice >= 0)) {
            setMoney(money - rareSeedPrice);
            setRareSeeds(rareSeeds + 1);
        }
        
        // updateDatabase(userID, type, cost);
    };

    const updateDatabase = async (userID, type, cost) => {
        
    };

    return (
        <div className='bg-[#ACC48B]'>
            <div className='flex flex-col items-center'>
                <h2 className='mt-[1em] p-[.5em] bg-red-400 rounded-md'>Shop</h2>
            </div>
            <div className='pb-[1em]'>
                <div className='bg-gray-200 flex flex-row p-0 m-[1em] text-black list-none rounded-t-md border-0'>
                    <div className='bg-gray-400 m-0'>
                        <img src={commonSeed} alt="" className='p-[.5em] w-30' />
                    </div>
                    <div className='flex flex-col justify-between gap-1 h-full w-full'>
                        <div className='flex justify-between'>
                            <p className='ml-2'>Common Seeds</p>
                            <p className='mr-2'>{commonSeedPrice + "$"}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='ml-2 mt-auto'>In Stock</p>
                            <div className='flex cursor-pointer justify-end mt-auto ml-auto w-30' onClick={() => handleBuy("common")}>
                                <img src={buyButton} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 flex flex-row p-0 m-[1em] text-black list-none rounded-t-md border-0'>
                    <div className='bg-gray-400 m-0'>
                        <img src={uncommonSeed} alt="" className='p-[.5em] w-30' />
                    </div>
                    <div className='flex flex-col justify-between gap-1 h-full w-full'>
                        <div className='flex justify-between'>
                            <p className='ml-2'>Uncommon Seeds</p>
                            <p className='mr-2'>{uncommonSeedPrice + "$"}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='ml-2 mt-auto'>In Stock</p>
                            <div className='flex cursor-pointer justify-end mt-auto ml-auto w-30' onClick={() => handleBuy("uncommon")}>
                                <img src={buyButton} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 flex flex-row p-0 m-[1em] text-black list-none rounded-t-md border-0'>
                    <div className='bg-gray-400 m-0'>
                        <img src={rareSeed} alt="" className='p-[.5em] w-30' />
                    </div>
                    <div className='flex flex-col justify-between gap-1 h-full w-full'>
                        <div className='flex justify-between'>
                            <p className='ml-2'>Rare Seeds</p>
                            <p className='mr-2'>{rareSeedPrice + "$"}</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='ml-2 mt-auto'>In Stock</p>
                            <div className='flex cursor-pointer justify-end mt-auto ml-auto w-30' onClick={() => handleBuy("rare")}>
                                <img src={buyButton} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    }

export default Buy