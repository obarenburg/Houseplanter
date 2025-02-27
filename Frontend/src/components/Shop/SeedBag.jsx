import seedBagBackground from '../../assets/seedBagBackground.svg';
import React, { useEffect, useState } from 'react';
import seedBag from '../../assets/SeedBag.svg';
import commonSeed from '../../assets/commonSeeds.svg';
import uncommonSeed from '../../assets/uncommonSeeds.svg';
import rareSeed from '../../assets/rareSeeds.svg';
import { useAuth } from '../../AuthContext';
import Sell from './Sell';
import Buy from './Buy';

function SeedBag() {
    const [shopType, setShopType] = useState("Sell");
    const [money, setMoney] = useState(0);
    const [commonSeeds, setCommonSeeds] = useState(0);
    const [uncommonSeeds, setUncommonSeeds] = useState(0);
    const [rareSeeds, setRareSeeds] = useState(0);

    const fetchUserMoney = async () => {

    };

    return (
        <div className='flex flex-col items-center'>
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
            <div>
                <div className='flex flex-row gap-20 justify-between'>
                    <div className={`cursor-pointer text-black pl-[4em] pr-[4em] rounded-t-md ${shopType === "buy" ? "bg-[#8a9e6f]" : "bg-[#ACC48B]"}`}>
                        <button
                            className='cursor-pointer bg-white mt-[.5em] p-[.25em] rounded-md'
                            onClick={() => setShopType("buy")}
                        >
                            Buy
                        </button>
                    </div>
                    <div className={`cursor-pointer text-black pl-[4em] pr-[4em] rounded-t-md ${shopType === "buy" ? "bg-[#ACC48B]" : "bg-[#8a9e6f]"}`}>
                        <button
                            className='cursor-pointer bg-white mt-[.5em] p-[.25em] rounded-md'
                            onClick={() => setShopType("sell")}
                        >
                            Sell
                        </button>
                    </div>

                </div>
                {shopType === "buy" ? 
                <Buy money={money} setMoney={setMoney} commonSeeds={commonSeeds} setCommonSeeds={setCommonSeeds}
                uncommonSeeds={uncommonSeeds} setUncommonSeeds={setUncommonSeeds}
                rareSeeds={rareSeeds} setRareSeeds={setRareSeeds} />
                    : 
                <Sell money={money} setMoney={setMoney} />}
            </div>

        </div>
    );
}

export default SeedBag;
