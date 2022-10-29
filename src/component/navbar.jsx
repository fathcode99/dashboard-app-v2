import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const stateAdmin = useSelector((state => state.usersReducer))

    return ( 
        <div className=' flex items-center justify-between border-b border-sky-500 p-2 bg-neutral-900 w-[100%]'>
            <div className='text-3xl font-bold text-white'>
                Creative.Dev
            </div>
            <div className='flex items-center'>
                <div className='text-white text-sm font-thin mr-2'>Hello, <span className='text-sky-500 font-medium'>{stateAdmin.username}</span> </div>
                <div className='w-8 h-8 rounded-full overflow-hidden bg-neutral-100'>
                    <img src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg" alt="profile-1" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default Navbar