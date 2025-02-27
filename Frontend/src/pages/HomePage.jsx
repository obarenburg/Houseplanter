/* eslint-disable no-unused-vars */
import React from "react";

import bgGrid from "../assets/svg/background-checks.svg";
import yellowSection from "../assets/svg/yellow-block.svg";
import greenSection from "../assets/svg/green-block.svg";
import orangeCircle from "../assets/svg/orange-blob.svg";
import StyledText from "../components/StyledText";
import { Link } from 'react-router-dom';
import Layout from "../Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div
          className="rounded-[9px] min-h-screen relative  mt-8 mb-8"
          style={{
            backgroundImage: `url(${bgGrid})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative px-8 py-16">
            <div className="absolute top-1/2 right-16 -translate-y-1/2 z-0">
              <img src={orangeCircle} className="h-64 w-64" />
            </div>

            <div className="max-w-2xl  z-10 ml-8">
              <div className="text-5xl text-left">
                <StyledText text="grow your dream garden" />
                <StyledText text="one seed at a time" />
              </div>

              <div className="items-center flex flex-col">
                  <Link to="/createUser" className="mt-6 mr-120 gap-2 px-4 py-3 font-['Kreon'] bg-[#fbc95d] text-white text-lg font-semibold rounded-[50px] hover:bg-[#fbc95d]/90">
                    Get Started
                  </Link>
              </div>
            </div>
          </div>

          <section className="py-12 space-y-8 px-8">
            <div
              className="relative w-11/12 p-6 mx-4 flex flex-col"
              style={{
                backgroundImage: `url(${yellowSection})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: " center",
                padding: "2rem",
              }}
            >
              <div className="flex justify-center mb-8 text-5xl relative">
                <StyledText text="planting seeds" />
              </div>

              <p className="text-center max-w-prose">
              <b>Houseplanter</b> is a relaxing browser game about planting seeds and collecting cool plants. Start with <b>Common Seeds</b> seeds and collect your way up to <b>Rare Seeds </b> 
               to find the most desired plants! Head over to the shop to purchase your first seeds today
              </p>
            </div>
            <div
              className="relative w-11/12 p-6 mx-4 flex flex-col"
              style={{
                backgroundImage: `url(${greenSection})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: " center",
                padding: "2rem",
              }}
            >
              <div className="flex justify-start mb-8 text-5xl">
                <StyledText text="collection" />
              </div>

              <p className="text-left  max-w-prose">
               <b>Houseplanter</b> is not just about collecting plants though! You also also look closer at your plants int the collection to check out some real world facts. These include
              care information for their real world counter parts, such as <b>Watering Times</b>, <b>Sun Light Requirements</b> and <b>Preferred Climate!</b>
              </p>
            </div>
            <div
              className="relative w-11/12 p-6 mx-4 flex flex-col"
              style={{
                backgroundImage: `url(${yellowSection})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: " center",
                padding: "2rem",
              }}
            >
              <div className="flex justify-start mb-8 text-5xl">
                <StyledText text="garden" />
              </div>

              <p className="text-left  max-w-prose">
                The <b>Garden</b> page is your relaxation space where you can watch your plants grow over time! Once the timer is up the <b>Mystery Plant</b> is ready to harvest. What will it be? Only one
                way to find out!
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
