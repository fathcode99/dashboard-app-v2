import React from 'react'

const sidebar = () => {
    return (
        <div className='w-fit flex flex-1 flex-col bg-neutral-800 h-screen'>
            <div>
                <div className='top flex justify-center lg:justify-start  items-center py-6 '>
                    <div className="logo">
                        <span className='font-bold text-white'>LOGO</span>
                        <span className="material-symbols-rounded hidden cursor-pointer text-sky-500">
                            close
                        </span>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-52 flex flex-col justify-start items-center'>
                <div className="w-full sidebar flex flex-col gap-8 justify-between lg:items-start items-center">
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500'>
                        <span class="material-symbols-rounded text-white"> grid_view </span>
                        <span className="hidden lg:block text-white font-semibold ml-4">Dashboard</span>
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500'>
                        <span class="material-symbols-rounded text-white"> groups </span>
                        <span className="hidden lg:block text-white font-semibold ml-4">Members</span>
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500'>
                        <span class="material-symbols-rounded text-white"> paid </span>
                        <span className="hidden lg:block text-white font-semibold ml-4">Earnings</span>
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500'>
                        <span class="material-symbols-rounded text-white"> sms </span>
                        <span className="hidden lg:block text-white font-semibold ml-4">Message</span>
                        <span className='message-count hidden'>26</span>
                    </div>
                    <div className='sidebar-btn-hover hover:border-l-2 border-sky-500'>
                        <span class="material-symbols-rounded text-white"> logout </span>
                        <span className="hidden lg:block text-white font-semibold ml-4">Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default sidebar