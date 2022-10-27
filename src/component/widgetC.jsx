import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const widgetC = () => {
    const percentage = 66;
    return (
        <div className='w-full bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] flex flex-col'>
            <div className='text-white font-thin text-sm'>Chart Evaluation</div>
            <div className='grid grid-cols-3 gap-3 m-2'>
                <div className='h-full w-full flex flex-col'>
                    <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"white", trailColor:"#f0f9ff", pathColor:"#0ea5e9"})}/>;
                    <span className='text-white text-sm font-thin text-center w-full'>Progress-1</span>
                </div>
                <div className='h-full w-full flex flex-col'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"white", trailColor:"#f0f9ff", pathColor:"#7e22ce"})}/>;
                    <span className='text-white text-sm font-thin text-center w-full'>Progress-2</span>
                </div>
                <div className='h-full w-full flex flex-col'>
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({strokeLinecap:"butt", textColor:"white", trailColor:"#f0f9ff", pathColor:"#be123c"})}/>;
                    <span className='text-white text-sm font-thin text-center w-full'>Progress-3</span>
                </div>
            </div>
        </div>
    )
}

export default widgetC