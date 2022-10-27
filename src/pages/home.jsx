import React from 'react'
import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import Widget from '../component/widget'
import WidgetB from '../component/widgetB'
import WidgetC from '../component/widgetC'
import WidgetD from '../component/widgetD'

const home = () => {
  return (
    <div className='flex'>
      <div className='flex flex-1'>
        <Sidebar />
      </div>
      <div className='flex flex-col flex-[6_6_0%]'>
        <Navbar />
        <div className='text-white text-lg font-bold m-2'>Dashboard</div>
        <div className='grid grid-cols-2 gap-2 m-2'>
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
        <div className='grid grid-cols-1 gap-2 m-2'>
          <WidgetB />
        </div>
        <div className='grid grid-cols-1 gap-2 m-2'>
          <WidgetC />
        </div>
        <div className='grid grid-cols-1 gap-2 m-2'>
          <WidgetD />
        </div>
      </div>

    </div>
  )
}

export default home