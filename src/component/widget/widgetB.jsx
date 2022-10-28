import React from 'react'
import { BarChart, Bar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const WidgetB = () => {
  return (
    <div className='w-full bg-neutral-800  rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] flex flex-col justify-between'>
      <div className='text-white font-thin text-sm'>Statistic</div>
      <div className='h-full w-full'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={150} height={40} barSize={20} data={data} >
            <Bar dataKey="uv" fill="#6d28d9" />
          </BarChart>
        </ResponsiveContainer>
        
      </div>
    </div>
  )
}

export default WidgetB