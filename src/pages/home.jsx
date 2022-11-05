import React from 'react'
import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import Widget from '../component/widget/widget'
import WidgetB from '../component/widget/widgetB'
import WidgetC from '../component/widget/widgetC'
import WidgetD from '../component/widget/widgetD'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react' 

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const tokenId = localStorage.getItem('token') 
    if (!tokenId) {
      navigate('/login')
    }
  }, [navigate])

  

  return (
    <div>
      <div className='flex' >
        <div className='flex'>
          <Sidebar /> 
        </div>
        <div className='flex flex-col md:m-8 w-full m-2'>
          <Navbar />
          <div className='dark:text-white text-lg font-bold m-2'>Laporan Keuangan</div>
          <div>
            <Widget /> 
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2'>
            <WidgetB />
            <WidgetC />
            <WidgetD />
          </div>
        </div>
      </div >
    </div>
  )
}

export default Home