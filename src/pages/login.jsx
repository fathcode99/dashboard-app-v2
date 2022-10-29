import React, { useRef } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

const url = "http://localhost:2000"

const Login = () => {
    const [toHome, setToHome] = useState(false)

    let refUsername = useRef()
    let refPassword = useRef()

    const onLogin = () => {
        let username = refUsername.current.value
        let password = refPassword.current.value

        axios.get(`${url}/admin?username=${username}&password=${password}`)
        .then(res => {
            if (res.data.length === 0) {
                alert("data kosong")
            } else {
                localStorage.setItem('idUser', res.data[0].id)
                setToHome(true)
            }
        })

        console.log(username, password)
    }

    if (toHome) {
        return <Navigate to = "/" />
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='w-3/4 md:w-1/3 grid grid-cols-1 bg-neutral-800 rounded-md py-8 p-4 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
                <div className='text-sky-500 text-center font-bold text-xl'>Creative.Dev</div>
                <div className='title text-white font-medium text-base text-center my-4 '>
                    Admin Login
                </div>

                <div >
                    <div className='flex flex-col'>
                        <label className='text-white text-xs'>Username</label>
                        <input type="text" placeholder='Input username' ref={refUsername}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-xs'>Password ID</label>
                        <input type="text" placeholder='Input password Id' ref={refPassword}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className='mt-3 text-white px-2 py-1 text-sm font-thin hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-neutral-700 rounded'>
                    Login
                </button>
                <div className='text-white text-xs font-thin mt-6'>
                    Note : Lorem ipsum, dolor sit amet consectetur adipisicing.
                </div>
            </div>
        </div>
    )
}

export default Login