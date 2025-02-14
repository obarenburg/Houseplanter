/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom';
import { useState } from 'react';

import bgGrid from "../assets/svg/background-checks.svg";
import createAccount from "../assets/createaccount.svg";

const CreateAccount = () => {
    const [message, setMessage] = useState(null);
    
    const register = async (event) => {
        event.preventDefault();
        setMessage(null);
        
        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData);
    
        const reqOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jsonData)
        };
    
        const req = await fetch('https://houseplanter-backend.onrender.com/api/auth/local/register', reqOptions);
        const res = await req.json();
    
        if (res.error) {
          setMessage(res.error.message);
          return;
        }
    
        if (res.jwt && res.user) {
          setMessage('Successfull registration.');
        }
      };

  return (
    <div>
        <Layout>
            <div className="rounded-[9px] min-h-screen relative mt-8 mb-8 flex flex-col items-center"
                style={{
                    backgroundImage: `url(${bgGrid})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div
                    className='min-w-[80%] h mt-20 m-10'
                    style={{
                        backgroundImage: `url(${createAccount})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                <div>
                    <div className="w-[710.06px] h-[702.19px] relative">
                        <div className="left-[284px] top-[461px] absolute text-white text-4xl font-bold font-['Kreon']">
                        already have <br /> an account? sign-in
                        </div>
                        <div className="left-[286px] top-[461px] absolute text-[#fa9768] text-4xl font-bold font-['Kreon']">
                        already have <br /> an account?
                        </div>
                        <Link to="/login" className="text-[#FA9768] hover:underline left-[470px] top-[461px] absolute text-4xl font-bold font-['Kreon']">
                        <br /> sign-in
                        </Link>

                        
                        <form onSubmit={register}>

                        <div className="w-[412px] left-[160px] top-[150px] absolute">
                            <label className="text-white text-[28px] font-bold font-['Kreon']">
                                Enter email
                            </label>
                            <input
                                type="text" 
                                id="email" 
                                name="email" 
                                placeholder="email"
                                className="w-[412px] h-[27px] bg-white rounded-xl text-[#ccd4c5] text-2xl font-bold font-['Kreon'] px-3"
                            />
                        </div>

                        <div className="w-[412px] left-[161px] top-[245px] absolute">
                            <label className="text-white text-[28px] font-bold font-['Kreon']">
                                Create a username
                            </label>
                            <input
                                type="text" 
                                id="username" 
                                name="username" 
                                placeholder="username"
                                className="w-[412px] h-[27px] bg-white rounded-xl text-[#ccd4c5] text-2xl font-bold font-['Kreon'] px-3"
                            />
                        </div>
                        

                        <div className="w-[412px] left-[163px] top-[330px] absolute">
                            <label className="text-white text-[28px] font-bold font-['Kreon']">
                            Create a password
                            </label>
                            <input
                                type="password" 
                                id="password"
                                name="password" 
                                placeholder="password"
                                className="w-[412px] h-[27px] bg-white rounded-xl text-[#ccd4c5] text-2xl font-bold font-['Kreon'] px-3"
                            />
                        </div>

                        <button type="submit">Submit</button>

                        <div>{ message }</div>

                        </form>

                    </div>
                </div>

                </div>
                {/* <img src={createAccount} alt=""/> */}
            </div>
        </Layout>
    </div>
  )
}

export default CreateAccount