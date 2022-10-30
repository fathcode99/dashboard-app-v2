import React, { useEffect } from 'react'

// import pages
import Home from './pages/home'
import Tutors from './pages/tutors'
import Students from './pages/students'
import DetailTutor from './pages/detailTutor'
import AddTutor from './pages/addTutor'

import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const url = 'http://localhost:2000'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    let id = localStorage.getItem('idUser')
    axios.get(`${url}/admin/${id}`)
      .then(res => {
        dispatch({
          type: 'GET_DATA_ADMIN',
          payload: res.data,
        })
      })

    axios.get(`${url}/tutors`)
      .then(res => {
        dispatch({
          type: 'GET_DATA_TUTORS',
          payload: res.data
        })
      })

    axios.get(`${url}/students`)
      .then(res => {
        dispatch({
          type: 'GET_DATA_STUDENTS',
          payload: res.data
        })
      })

    const theme = localStorage.getItem('theme')
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    }

  }, [dispatch])

  return (
    <div className='dark:bg-neutral-900 font-rubik bg-slate-100'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tutors' element={<Tutors />} />
        <Route path='/tutors/:id' element={<DetailTutor />} />
        <Route path='/students' element={<Students />} />
        <Route path='/addtutor' element={<AddTutor />} />
      </Routes>
    </div>
  )
}

export default App