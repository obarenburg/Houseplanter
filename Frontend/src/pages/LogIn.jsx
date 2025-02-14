/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../Layout'
import { Link } from 'react-router-dom';
import { useState } from 'react';

import bgGrid from "../assets/svg/background-checks.svg";
import logIn from "../assets/sign-in.svg";

const LogIn = () => {
    const [message, setMessage] = useState(null);

  const login = async (event) => {
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

    const req = await fetch('https://houseplanter-backend.onrender.com/api/auth/local', reqOptions);
    const res = await req.json();

    if (res.error) {
      setMessage(res.error.message);
      return;
    }

    if (res.jwt && res.user) {
      setMessage('Login successfull.');
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
                        className='mt-20 m-10'
                        style={{
                            backgroundImage: `url(${logIn})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                    <div>
                        <div className="w-[710.06px] h-[702.19px] relative">
                            <div className="left-[284px] top-[440px] absolute text-white text-4xl font-bold font-['Kreon']">
                            dont have an <br /> account? sign-up!
                            </div>
                            <div className="left-[286px] top-[440px] absolute text-[#fa9768] text-4xl font-bold font-['Kreon']">
                            dont have an <br /> account?
                            </div>
                            <Link to="/createUser" className="text-[#FA9768] hover:underline left-[425px] top-[439px] absolute text-4xl font-bold font-['Kreon']">
                            <br /> sign-up!
                            </Link>
    
                            <form onSubmit={login}>
                            <div className="w-[412px] left-[160px] top-[190px] absolute">
                                <label className="text-white text-[28px] font-bold font-['Kreon']">
                                    Enter username
                                </label>
                                <input
                                    type="text" 
                                    id="identifier" 
                                    name="identifier"
                                    placeholder="username"
                                    className="w-[412px] h-[27px] bg-white rounded-xl text-[#ccd4c5] text-2xl font-bold font-['Kreon'] px-3"
                                />
                            </div>
    
                            <div className="w-[412px] left-[161px] top-[290px] absolute">
                                <label className="text-white text-[28px] font-bold font-['Kreon']">
                                    Enter password
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

export default LogIn