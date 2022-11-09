import React, { useEffect } from 'react'
import { useState } from 'react' 

const Navbar = () => { 
    const [themeLocal, setThemeLocal] = useState(false)

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        
        if (theme === 'light') {
            document.documentElement.classList.remove('dark')
        } else if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        }
    }, [themeLocal])

    const onDark = () => {
        localStorage.removeItem('theme', 'light')
        localStorage.setItem('theme', 'dark')
        setThemeLocal(!themeLocal)
    }
    const onLight = () => {
        localStorage.removeItem('theme', 'dark')
        localStorage.setItem('theme', 'light')
        setThemeLocal(!themeLocal)
    }

    return (
        <div className=' flex items-center justify-between border-b border-neutral-900 dark:border-sky-500 p-2 dark:bg-neutral-900'>
            <div className='text-xl md:text-3xl font-bold dark:text-white text-neutral-900'>
                Creative.Dev
            </div>
            <div className='flex items-center'>
                <div className='flex gap-2 mx-4'>
                    <button onClick={onLight} className="dark:text-white text-neutral-900">
                        <span className="material-symbols-rounded text-3xl font-thin">brightness_high</span>
                    </button>
                    <button onClick={onDark} className="dark:text-white text-neutral-900">
                        <span className="material-symbols-rounded text-3xl font-thin"> dark_mode </span>
                    </button>
                </div>

                <div className='dark:text-white text-neutral-900 text-sm font-thin mr-2'>Hello, <span className='text-sky-500 font-medium'>admin</span> </div>
                <div className='w-8 h-8 rounded-full overflow-hidden bg-neutral-100'>
                    <img src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg" alt="profile-1" className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default Navbar