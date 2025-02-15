/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../Layout';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';
import toast from 'react-hot-toast';

import bgGrid from '../assets/svg/background-checks.svg';
import logIn from '../assets/sign-in.svg';

const LogIn = () => {
  const {login} = useAuth ();
  const navigate = useNavigate ();

  const handleLogin = async event => {
    event.preventDefault ();

    const formData = new FormData (event.target);
    const jsonData = Object.fromEntries (formData);
    console.log ('[LogIn] Sending login request with:', jsonData);

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (jsonData),
    };

    const req = await fetch (
      'https://houseplanter-backend.onrender.com/api/auth/local',
      reqOptions
    );

    const res = await req.json ();
    console.log ('[LogIn] Response received:', res);

    if (res.error) {
      toast.error ('Invalid username or password');
      return;
    }

    if (res.jwt && res.user) {
      toast.success ('Login registered!');
      login (res);
      navigate ('/');
    }
  };

  return (
    <div>
      <Layout>
        <div
          className="rounded-[9px] min-h-screen relative mt-8 mb-8 flex flex-col items-center"
          style={{
            backgroundImage: `url(${bgGrid})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="mt-20 m-10"
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
                <Link
                  to="/createUser"
                  className="text-[#FA9768] hover:underline left-[425px] top-[439px] absolute text-4xl font-bold font-['Kreon']"
                >
                  <br /> sign-up!
                </Link>

                <form onSubmit={handleLogin}>
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

                  <div className="left-[160px] top-[390px] absolute">
                    <button
                      className="w-[125px] h-[50px] px-4 py-2 bg-[#fa9768] rounded-[50px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] 
                        justify-center items-center gap-2 inline-flex text-center text-white text-2xl font-semibold font-['Kreon'] 
                        leading-[37.20px]"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default LogIn;
