import React, { useState } from 'react'
import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import Widget from '../component/widget/widget'
import WidgetB from '../component/widget/widgetB'
import WidgetC from '../component/widget/widgetC'
import WidgetD from '../component/widget/widgetD'

import { Navigate } from 'react-router-dom'
import { useEffect } from 'react' 

const Home = () => {
  const [isLogin, setIsLogin] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('idUser') 
    if (id) {
      setIsLogin('Berhasil')
    } else {
      setIsLogin('Gagal')
    }
  }, [isLogin])

  if (isLogin === 'Gagal') {
    return (<Navigate to="/login" />)
  }

  return (
    <div>
      <div className='flex' >
        <div className='flex'>
          <Sidebar />
        </div>
        <div className='flex flex-col md:m-8 w-full'>
          <Navbar />
          <div className='dark:text-white text-lg font-bold m-2'>Dashboard</div>
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
    </div>
  )
}

export default Home