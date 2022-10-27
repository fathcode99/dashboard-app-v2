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
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:m-8'>
        <Navbar />
        <div className='text-white text-lg font-bold m-2'>Dashboard</div>
        <div className='grid grid-cols-2 gap-2 m-2'>
          <Widget />
          <Widget />
          <Widget />
          <Widget />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 m-2'>
          <WidgetB />
          <WidgetC />
          <WidgetD />
        </div>
      </div>

    </div>
  )
}

export default home