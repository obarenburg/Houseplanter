/* eslint-disable no-unused-vars */
import React from "react";

/* original home page assets */
import bgGrid from "../assets/svg/background-checks.svg";
/* import yellowSection from "../assets/svg/yellow-block.svg"; */
/* import greenSection from "../assets/svg/green-block.svg"; */
/* import orangeCircle from "../assets/svg/orange-blob.svg"; */
/* import StyledText from "../components/StyledText"; */

import homeContainerLeft from "../assets/svg/home_container_left.svg";
import homeContainerRight from "../assets/svg/home_container_right.svg";
import homeLeaf from "../assets/svg/home_leaf.svg";
import homeWideContainer from "../assets/svg/home_wide_container.svg";
import orangeFlower from "../assets/svg/orange_flower.svg";
import orangeFlowerSmall from "../assets/svg/orange_flower_small.svg";
import pinkFlower from "../assets/svg/pink_flower.svg";
import StyledText2 from "../components/StyledText2";
import { Link } from 'react-router-dom';
import Layout from "../Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div
          className="rounded-[9px] relative mt-8 mb-8 flex flex-col items-center scale-100 overflow-hidden min-h-[70vh] max-h-[80vh]"
          style={{
            backgroundColor: "#C4DEB4",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Scaled container */}
          <div className="relative w-[100%] h-auto flex flex-col items-center scale-100">
            {/* Main Image */}
            <img className="w-[70%] h-auto p-10" src={homeWideContainer} />

            {/* Leaf Image */}
            <img
              className="absolute top-[5%] left-[8%] w-[40%] h-auto"
              src={homeLeaf}
            />

            {/* Button */}
            <div className="absolute w-[15%] h-[18%] bg-[#fdee96] rounded-3xl flex items-center justify-center top-[40%] left-[20%] hover:bg-yellow-100">
              <Link
                to="/createUser"
                className="text-[#316e54] text-[200%] font-['Fredoka'] font-semibold"
                style={{
                  color: "#316e54" 
                }}
              >
                START
              </Link>
            </div>
            {/* Orange Flowers */}
            <img
              className="absolute top-[35%] right-[10%] w-[25%] h-auto"
              src={orangeFlower}
            />
            <img
              className="absolute top-[75%] right-[35%] w-[15%] h-auto"
              src={orangeFlowerSmall}
            />

            {/*Info Leaves */}
            <img
              className="absolute top-[120%] left-[26%] w-[27%] h-auto"
              src={homeContainerLeft}
            />
            <div className="absolute top-[137%] left-[30%] w-[19.5%] text-[150%]/[125%] h-auto text-yellow-50 font-['Fredoka'] font-semibold text-center">
                Plant seeds at your <Link to="/garden" className="font-['Fredoka'] px-[4%] bg-[#6C9251] rounded-3xl top-[40%] left-[20%] hover:bg-yellow-100">Window</Link> and they'll grow into a random plant over time
            </div>

            <img
              className="absolute top-[160%] right-[20%] w-[27%] h-auto"
              src={homeContainerRight}
            />
            <div className="absolute top-[174%] right-[23%] w-[19.5%] text-[150%]/[125%] h-auto text-yellow-50 font-['Fredoka'] font-semibold text-center">
                Learn about the plants you grow in your <Link to="/collection" className="font-['Fredoka'] px-[4%] bg-[#6C9251] rounded-3xl top-[40%] left-[20%] hover:bg-yellow-100">Collection</Link>, and customize your shelf displays
            </div>

            <img
              className="absolute top-[200%] left-[26%] w-[27%] h-auto"
              src={homeContainerLeft}
            />
            <div className="absolute top-[220%] left-[30%] w-[18%] text-[150%]/[125%] h-auto text-yellow-50 font-['Fredoka'] font-semibold text-center">
                Buy different types of seeds in the <Link to="/shop" className="font-['Fredoka'] px-[4%] bg-[#6C9251] rounded-3xl top-[40%] left-[20%] hover:bg-yellow-100">Shop</Link> for different results
            </div>
            {/* Pink Flower */}
            <img
              className="absolute top-[150%] left-[10%] w-[25%] h-auto"
              src={pinkFlower}
            />
          </div>
        </div>

      </Layout>
    </>
  );
}
