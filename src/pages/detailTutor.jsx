import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const url = "http://localhost:2000/tutors"

const DetailTutor = () => {
  const [dataTutor, setDataTutor] = useState({})
  const [dataStudents, setDataStudents] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios.get(`${url}/${id}`)
      .then(res => {
        setDataTutor(res.data)
      })
    axios.get('http://localhost:2000/students')
      .then(res => {
        setDataStudents(res.data)
      })
  }, [id])

  return (
    <div className='flex'>
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen">
        <Navbar />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-2'>

          {/* data diri */}
          <div className='flex flex-col w-full bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
            <div className='flex gap-3 relative'>
              <div className='w-1/3 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
                <img src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg" alt="profile" />
              </div>
              <div className='flex flex-col justify-center'>
                <div className='text-white font-medium text-xl'>{dataTutor.first_name} {dataTutor.last_name}</div>
                <div className='text-white font-thin text-sm'>Kediri, 12 Januari 1997</div>
                <div className='italic font-thin text-sky-500 text-sm mt-3'>Address</div>
                <div className='text-white font-thin text-sm'>Jl. Basuki Rahmat no 18 Kediri</div>

                <div className='flex gap-2'>
                  <div className='w-3/4'>
                    <div className='italic font-thin text-sky-500 text-sm mt-3'>Email</div>
                    <div className='text-white font-thin text-sm'>{dataTutor.email}</div>
                    <div className='italic font-thin text-sky-500 text-sm mt-3'>Phone</div>
                    <div className='text-white font-thin text-sm'>{dataTutor.phone}</div>
                  </div>
                  <div>
                    <div className='italic font-thin text-sky-500 text-sm mt-3'>Gender</div>
                    <div className='text-white font-thin text-sm'>{dataTutor.gender}</div>
                    <div className='italic font-thin text-sky-500 text-sm mt-3'>Status</div>
                    <div className='text-white font-thin text-sm'>{dataTutor.status}</div>
                  </div>
                </div>
              </div>

              <button className='hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-neutral-700 rounded h-6 w-6 absolute top-0 right-0'>
                <span className="material-symbols-rounded text-white font-thin"> edit </span>
              </button>
            </div>
          </div>

          {/* payment */}
          <div className='flex flex-col justify-between w-full bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
            <div className='text-white font-thin text-sm'>Payment</div>
            <div className='text-sky-500 font-thin text-right text-7xl'>{dataTutor.fee}</div>
            <p className='text-white font-thin text-right text-sm'>Lorem ipsum dolor sit amet, <br /> consectetur adipisicing elit. Quo cupiditate sint, totam rem ipsa ex!</p>
            <div className='flex justify-end mt-3'>
              <button className='drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-neutral-700 rounded px-2 py-1 w-fit flex items-center text-white text-sm font-thin hover:bg-sky-500'>
                <span className=" material-symbols-rounded text-white font-thin"> chat </span>
                <span>Send Message</span> 
              </button>
              
            </div>
          </div>
        </div>

        {/* rincian kepengajaran */}
        <div className='flex flex-col m-2 bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]'>
          <div className='text-white font-thin text-sm my-3'>Rincian Kepengajaran</div>
          <table className='w-full'>
            <thead className='h-8'>
              <tr className='text-sm text-white font-thin bg-sky-500 h-full'>
                <th className='font-medium '>No.</th>
                <th className='font-medium flex items-center h-8 justify-between'>
                  First Name

                  {/* sort button
                  <span onClick={handleSortName} className="material-symbols-rounded cursor-pointer text-white">
                    {sortName ? "expand_more" : "expand_less"}
                  </span> */}
                </th>
                <th className='font-medium hidden md:table-cell'>Last Name</th>
                <th className='font-medium hidden md:table-cell'>Email</th>
                <th className='font-medium'>Gender</th>
                <th className='font-medium'>Status</th>
                <th className='font-medium'>Action</th>
              </tr>
            </thead>

            {dataStudents.length === 0 ? (
              <tbody>
                <tr className='text-white font-thin w-full'>
                  <td style={{ colSpan: "8" }}>
                    No Data Found
                  </td>
                </tr>
              </tbody>
            ) : (
              dataStudents.map((item, index) => {
                return (
                  <tbody key={index} className="text-white font-thin text-sm">
                    <tr className={index % 2 === 0 ? "bg-neutral-800 h-8" : "bg-neutral-900 h-8"} >
                      <td className='text-center'>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td className='hidden md:table-cell'>{item.last_name}</td>
                      <td className='hidden md:table-cell'>{item.email}</td>
                      <td>{item.gender}</td>
                      <td className={item.status === "Active" ? "text-lime-600 text-center" : "text-rose-600 text-center"}>
                        {item.status}
                      </td>
                      <td className='flex justify-center items-center h-8'>
                        <Link to={`/tutors/${item.id}`}>
                          <button className='text-white bg-neutral-800 text-sm flex justify-center items-center h-6 border border-sky-500 rounded-md px-2'>
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                )
              })
            )}

          </table>
        </div>
      </div>
    </div>
  )
}

export default DetailTutor