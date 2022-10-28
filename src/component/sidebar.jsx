import React from 'react'
import { Link } from 'react-router-dom'

const sidebar = () => {
    return (
        <div className='min-w-[40px] md:w-[200px] flex flex-col bg-neutral-800 min-h-screen'>
            <div>
                <div className='top flex justify-center lg:justify-start  items-center py-6 '>
                    <div className="logo fixed">
                        <span className='font-bold text-white'>GO</span>
                        <span className="material-symbols-rounded hidden cursor-pointer text-sky-500">
                            close
                        </span>
                    </div>
                </div>
            </div>
            <div className='min-w-[40px] md:w-[200px] flex flex-col min-h-screen fixed justify-center '>
                <div className="w-full sidebar flex flex-col gap-8 ">
                    <Link to="/">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                            <span class="material-symbols-rounded text-white"> grid_view </span>
                            <span className="hidden md:block text-white font-thin ml-4">Dashboard</span>
                        </div>
                    </Link>

                    <Link to="/tutors">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                        <span class="material-symbols-rounded text-white">supervised_user_circle</span>
                            <span className="hidden md:block text-white font-thin ml-4">Tutors</span>
                        </div>
                    </Link>

                    <Link to="/students">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                            <span class="material-symbols-rounded text-white"> groups </span>
                            <span className="hidden md:block text-white font-thin ml-4">Students</span>
                        </div>
                    </Link>

                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                        <span class="material-symbols-rounded text-white"> paid </span>
                        <span className="hidden md:block text-white font-thin ml-4">Earnings</span>
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                        <span class="material-symbols-rounded text-white"> sms </span>
                        <span className="hidden md:block text-white font-thin ml-4">Message</span>
                        
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                        <span class="material-symbols-rounded text-white"> logout </span>
                        <span className="hidden md:block text-white font-thin ml-4">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default sidebar