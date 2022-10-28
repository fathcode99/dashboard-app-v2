import React from 'react'
import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import Widget from '../component/widget'
import WidgetB from '../component/widgetB'
import WidgetC from '../component/widgetC'
import WidgetD from '../component/widgetD'

import Login from './login'
import { useSelector } from 'react-redux'

const Home = () => {
  const stateAdmin = useSelector((state => state.usersReducer))

  return (
    <div>
      {
        stateAdmin.username ?

          <div className='flex' >
            <div className='flex'>
              <Sidebar />
            </div>
            <div className='flex flex-col md:m-8'>
              <Navbar />
              <div className='text-white text-lg font-bold m-2'>Dashboard</div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2 m-2'>
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
          </div >
          :
          <div>
            <Login />
          </div>
      }
    </div>
  )
}

export default Home