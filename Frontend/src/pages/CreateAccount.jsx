/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../Layout';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext';
import toast from 'react-hot-toast';

import bgGrid from '../assets/svg/background-checks.svg';
import createAccount from '../assets/createaccount.svg';

const CreateAccount = () => {
  const {login} = useAuth ();
  const navigate = useNavigate ();

  const register = async event => {
    event.preventDefault ();

    const formData = new FormData (event.target);
    const jsonData = Object.fromEntries (formData);
    console.log ('[CreateAccount] Sending registration request:', jsonData);

    const reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify (jsonData),
    };

    const req = await fetch (
      'https://houseplanter-backend.onrender.com/api/auth/local/register',
      reqOptions
    );

    const res = await req.json ();
    console.log ('[CreateAccount] Response received:', res);

    if (res.error) {
      toast.error (res.error.message);
      return;
    }

    if (res.jwt && res.user) {
      toast.success ('Registered successfully!');
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
                <Link
                  to="/login"
                  className="text-[#FA9768] hover:underline left-[470px] top-[461px] absolute text-4xl font-bold font-['Kreon']"
                >
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

                  <div className="left-[160px] top-[420px] absolute">
                    <button
                      className="w-[125px] h-[50px] px-4 py-2 bg-[#fa9768] rounded-[50px] shadow-[0px_1px_2px_0px_rgba(13,13,18,0.06)] 
                        justify-center items-center gap-2 inline-flex text-center text-white text-2xl font-semibold font-['Kreon'] 
                        leading-[37.20px] cursor-pointer hover:bg-[#acc48b]"
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

export default CreateAccount;
