import React, { useRef, useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const url = "http://localhost:2000"

const Login = () => {
    const dispatch = useDispatch()

    const [login, setLogin] = useState(false)
    const [isModalLogin, setIsModalLogin] = useState(false)

    const [isLogin, setIsLogin] = useState('')

    useEffect(() => {
        const id = localStorage.getItem('idUser')
        if (id) {
            setIsLogin('Berhasil')
        }
    }, [isLogin])

    let refUsername = useRef()
    let refPassword = useRef()

    const onLogin = () => {
        let username = refUsername.current.value
        let password = refPassword.current.value

        axios.get(`${url}/admin?username=${username}&password=${password}`)
            .then(res => {
                if (res.data.length === 0) {
                    setIsModalLogin(true)
                } else {
                    dispatch({
                        type: 'GET_DATA_ADMIN',
                        payload: res.data
                    })
                    localStorage.setItem('idUser', res.data[0].id)
                    setLogin(true)
                }
            })
    }

    if (login) {
        return (<Navigate to="/" />)
    }

    if (isLogin === 'Berhasil') {
        return (<Navigate to="/" />)
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center relative'>
            <div className='w-3/4 md:w-1/3 grid grid-cols-1 dark:bg-neutral-800 bg-slate-100 rounded-md py-8 p-4 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
                <div className='text-sky-500 text-center font-bold text-xl'>Creative.Dev</div>
                <div className='dark:text-white font-medium text-base text-center my-4 '>
                    Admin Login
                </div>

                <div className='dark:text-white' >
                    <div className='flex flex-col'>
                        <label className=' text-xs'>Username</label>
                        <input type="text" placeholder='Input username' ref={refUsername}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500  text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className=' text-xs'>Password ID</label>
                        <input type="text" placeholder='Input password Id' ref={refPassword}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500  text-sm font-thin' />
                    </div>
                </div>

                <button
                    onClick={onLogin}
                    className='mt-3  px-2 py-1 text-sm font-thin hover:bg-sky-500 dark:hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-slate-200 dark:bg-neutral-700 dark:text-white rounded'>
                    Login
                </button>
                <div className='dark:text-white text-xs font-thin mt-6'>
                    Note : Lorem ipsum, dolor sit amet consectetur adipisicing.
                </div>
            </div>

            {/* modal data kosong */}
            {
                isModalLogin ?
                    <div className='absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center'>
                        <div className='flex flex-col w-[45%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center'>
                            <div className='flex justify-between'>
                                <div className=' text-rose-500'>Login Failed</div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='dark:text-white font-thin text-sm'>Data yang anda masukan tidak sesuai.</div>
                            </div>
                            <button
                                onClick={() => setIsModalLogin(false)}
                                className='px-4 py-1 text-sm font-thin hover:bg-sky-500 dark:hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-slate-200 rounded'>
                                Ok
                            </button>
                        </div>
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default Login