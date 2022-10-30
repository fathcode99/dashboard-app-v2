import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const WidgetC = () => {
    const percentage = 66;
    return (
        <div className='w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] flex flex-col dark:text-white'>
            <div className=' font-thin text-sm'>Chart Evaluation</div>
            <div className='grid grid-cols-3 gap-3 m-2'>
                <div className='h-full w-full flex flex-col'>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"#0ea5e9", trailColor:"#f0f9ff", pathColor:"#0ea5e9"})}/>
                    <span className='mt-4 text-sm font-thin text-center w-full'>Progress-1</span>
                </div>
                <div className='h-full w-full flex flex-col'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"#0ea5e9", trailColor:"#f0f9ff", pathColor:"#7e22ce"})}/>
                    <span className='mt-4 text-sm font-thin text-center w-full'>Progress-2</span>
                </div>
                <div className='h-full w-full flex flex-col'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"#0ea5e9", trailColor:"#f0f9ff", pathColor:"#be123c"})}/>
                    <span className='mt-4 text-sm font-thin text-center w-full'>Progress-3</span>
                </div>
            </div>
        </div>
    )
}

export default WidgetC