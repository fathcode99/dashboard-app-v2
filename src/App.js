import React from 'react'
import Home from './pages/home' 
import Members from './pages/members'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div className='bg-neutral-900 font-rubik'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/members' element={<Members />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App