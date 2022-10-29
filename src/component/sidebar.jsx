import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='min-w-[40px] md:w-[200px] flex flex-col bg-neutral-800 min-h-screen'> 
            <div className='min-w-[40px] md:w-[200px] flex flex-col min-h-screen fixed justify-center '>
                <div className="flex justify-center items-center pb-6">
                    <span className='font-bold text-center text-white text-xs  lg:text-5xl lg:mb-5'>LO<br />GO</span>
                </div>
                <div className="w-full sidebar flex flex-col gap-8 lg:gap-1 ">
                    <span className='hidden md:block text-white text-sm font-thin text-left pl-4'>Home</span>
                    <Link to="/">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 md:mb-5'>
                            <span className="material-symbols-rounded text-white"> grid_view </span>
                            <span className="hidden md:block text-white font-thin ml-4">Dashboard</span>
                        </div>
                    </Link>

                    <span className='hidden md:block text-white text-sm font-thin text-left pl-4'>Data</span>
                    <Link to="/tutors">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                            <span className="material-symbols-rounded text-white">supervised_user_circle</span>
                            <span className="hidden md:block text-white font-thin ml-4">Tutors</span>
                        </div>
                    </Link>

                    <Link to="/students">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                            <span className="material-symbols-rounded text-white"> groups </span>
                            <span className="hidden md:block text-white font-thin ml-4">Students</span>
                        </div>
                    </Link>

                    <Link to="/addtutor">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4'>
                            <span className="material-symbols-rounded text-white"> person_add </span>
                            <span className="hidden md:block text-white font-thin ml-4">Add Tutors</span>
                        </div>
                    </Link>

                    <Link to="/addstudent">
                        <div className='cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 md:mb-4'>
                            <span className="material-symbols-rounded text-white"> person_add </span>
                            <span className="hidden md:block text-white font-thin ml-4">Add Students</span>
                        </div>
                    </Link>

                    <span className='hidden md:block text-white text-sm font-thin text-left pl-4'>Notification</span>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 cursor-pointer'>
                        <span className="material-symbols-rounded text-white"> sms </span>
                        <span className="hidden md:block text-white font-thin ml-4">Message</span>

                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 md:mb-7 cursor-pointer'>
                        <span className="material-symbols-rounded text-white"> notifications </span>
                        <span className="hidden md:block text-white font-thin ml-4">Notif</span>
                    </div>

                    {/* logout */}
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 cursor-pointer'>
                        <span className="material-symbols-rounded text-white"> logout </span>
                        <span className="hidden md:block text-white font-thin ml-4">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar