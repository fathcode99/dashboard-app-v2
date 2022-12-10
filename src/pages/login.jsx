import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// const url = "http://localhost:2000";

const Login = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalLogin, setIsModalLogin] = useState(false);

  useEffect(() => {
    const tokenId = localStorage.getItem("token");
    if (tokenId) {
      navigate('/');
    }
  }, [navigate]);

  let refUsername = useRef();
  let refPassword = useRef();

  const onLogin = () => {
    let password = refPassword.current.value
    let email = refUsername.current.value;
    let data = { 
        email: email,
        password : password
    };
    
    axios
      .post(`https://admin.menujudigital.com/api/login`, data)
      .then((res) => {
        dispatch({
          type: "GET_DATA_ADMIN",
          payload: res.data,
        }); 
        localStorage.setItem("token", res.data.token);
        navigate("/"); 
      });
    
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center relative">
      <div className="w-3/4 md:w-1/3 grid grid-cols-1 bg-slate-100 rounded-md py-8 p-4 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
        
        <div className=" font-medium text-base text-center my-4 ">
          Admin Login
        </div>

        <div className="dark:text-white">
          <div className="flex flex-col">
            <label className=" text-xs">Username</label>
            <input
              type="text"
              placeholder="Input username"
              ref={refUsername}
              className="mt-2 outline-none bg-transparent border-b border-sky-500  text-sm "
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className=" text-xs">Password ID</label>
            <input
              type="password"
              placeholder="Input password Id"
              ref={refPassword}
              className="mt-2 outline-none bg-transparent border-b border-sky-500  text-sm "
            />
          </div>
        </div>

        <button
          onClick={onLogin}
          className="mt-3  px-2 py-1 text-sm  hover:bg-sky-500 dark:hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-slate-200 dark:bg-neutral-700 dark:text-white rounded"
        >
          Login
        </button> 
      </div>

      {/* modal data kosong */}
      {isModalLogin ? (
        <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
          <div className="flex flex-col w-[45%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center">
            <div className="flex justify-between">
              <div className=" text-rose-500">Login Failed</div>
            </div>
            <div className="flex justify-between">
              <div className="dark:text-white  text-sm">
                Data yang anda masukan tidak sesuai.
              </div>
            </div>
            <button
              onClick={() => setIsModalLogin(false)}
              className="px-4 py-1 text-sm  hover:bg-sky-500 dark:hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-slate-200 rounded"
            >
              Ok
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
