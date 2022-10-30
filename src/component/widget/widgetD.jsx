import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const WidgetD = () => {
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#7e22ce', '#2563eb', '#be123c', '#65a30d'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    return (
        <div className='w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:text-white'>
            <div className=' font-thin text-sm'>Reviews</div>
            <div className='w-full h-[200px] flex justify-center '> 
                    <ResponsiveContainer  height="100%">
                        <PieChart >
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>  
            </div>
            <div className=' text-sm font-semibold text-center mt-4'>Progress-1</div>
            <div className='text-center  my-2 font-thin text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, excepturi!</div>
        </div>
    )
}

export default WidgetD