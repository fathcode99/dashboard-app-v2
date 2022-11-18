import React from 'react' 

const Navbar = () => { 

    return (
        <div className=' flex items-center justify-between border-b border-neutral-900 dark:border-sky-500 p-2 dark:bg-neutral-900'>
            <div className='text-xl md:text-3xl font-bold dark:text-white text-neutral-900'>
                admin.
            </div>
            <div className='flex items-center'>
                <div className='flex gap-2 items-center mx-4 px-2 py-1 rounded-lg bg-white relative'> 
                    <button className="dark:text-white text-neutral-900 flex items-center">
                    <span className="material-symbols-rounded">notifications_active</span>
                    <span className='absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full text-center flex justify-center items-center text-white'>4</span>
                    </button>
                </div>

                <div className='dark:text-white text-neutral-900 text-sm font-thin mr-2'>Hello, <span className='text-sky-500 font-medium'>admin</span> </div>
                <div className='w-8 h-8 rounded-full overflow-hidden bg-neutral-100'>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar