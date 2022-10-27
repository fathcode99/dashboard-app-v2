import React from 'react'

const navbar = () => {
    return (
        <div className='flex items-center justify-between m-2'>
            <div className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/2'>
                <input type="search" className='outline-none bg-transparent w-full' />
                <span class="material-symbols-rounded text-sky-500 text-sm mr-2">search</span>
            </div>
            <div className='flex items-center'>
                <div className='text-white text-sm font-thin mr-2'>Hello, <span className='text-sky-500 font-medium'>admin</span> </div>
                <div className='w-8 h-8 rounded-full overflow-hidden bg-neutral-100'>
                    <img src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg" alt="profile-1" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default navbar