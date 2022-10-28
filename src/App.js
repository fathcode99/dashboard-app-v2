import React, { useEffect } from 'react'
import Home from './pages/home'
import Tutors from './pages/tutors'
import Students from './pages/students'
import DetailTutor from './pages/detailTutor'
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

    // axios.get(`${url}/tutors`)
    //   .then(res => {
    //     dispatch({
    //       type: 'GET_DATA_TUTORS',
    //       payload: res.data
    //     })
    //   })
  }, [dispatch])

  return (
    <div className='bg-neutral-900 font-rubik'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tutors' element={<Tutors />} />
        <Route path='/tutors/:id' element={<DetailTutor />} />
        <Route path='/students' element={<Students />} />
      </Routes>
    </div>
  )
}

export default App