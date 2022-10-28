import React, { useEffect, useState } from 'react'
import Home from './pages/home'
import Tutors from './pages/tutors'
import Students from './pages/students'
import DetailTutor from './pages/detailTutor'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

const url = 'http://localhost:2000'

const App = () => {

  useEffect(() => {
    let id = localStorage.getItem('idUser')
    axios.get(`${url}/admin/${id}`)
  }, [])

  return (
    <div className='bg-neutral-900 font-rubik'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tutors' element={<Tutors />} />
          <Route path='/tutors/:id' element={<DetailTutor />} />
          <Route path='/students' element={<Students />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App