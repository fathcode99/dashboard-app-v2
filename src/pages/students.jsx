import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import ExportExcel from '../component/exportExcel'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const url = "http://localhost:2000/students"

const Students = () => {
  const stateStudents = useSelector((state => state.studentsReducer))
  // console.log(stateStudents.data)

  // default data
  const [dataMembers, setDataMembers] = useState(stateStudents.data)

  // data renders
  const [dataRenders, setDataRenders] = useState(stateStudents.data)

  // button value
  const [statusActive, setStatusActive] = useState(false)
  const [statusInactive, setStatusInactive] = useState(false)

  // handle sort
  const [sortName, setSortName] = useState(false)
  const [sortStatus, setSortStatus] = useState(false)

  // value input
  let refFilterName = useRef()
  let refFilterCity = useRef()

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  let rowPerPage = 20
  let startRow = (page - 1) * rowPerPage
  let sliceTable = dataRenders.slice(startRow, startRow + rowPerPage)

  const onNext = () => {
    setPage(page + 1)
  }
  const onPrev = () => {
    setPage(page - 1)
  }

  useEffect(() => {
    setDataMembers(stateStudents.data)
    setDataRenders(dataMembers)
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateStudents.data, dataMembers, rowPerPage])


  // button handler status
  const handleActive = () => {
    setStatusActive(!statusActive)
    if (statusInactive) {
      setStatusInactive(!statusInactive)
    }
  }
  const handleInactive = () => {
    setStatusInactive(!statusInactive)
    if (statusActive) {
      setStatusActive(!statusActive)
    }
  }

  // filter
  const onFilter = () => {
    let valueFilterName = refFilterName.current.value
    let valueFilterCity = refFilterCity.current.value

    // 01. f f f f
    if (valueFilterName === "" && valueFilterCity === "" && statusActive === false && statusInactive === false) {
      setDataRenders(dataMembers)
      setMaxPage(Math.ceil(dataMembers.length / rowPerPage))
    }

    // 02. t f f f
    else if (valueFilterName && valueFilterCity === "" && statusActive === false && statusInactive === false) {
      const resultFilter = dataMembers.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 03. f t f f
    else if (valueFilterName === "" && valueFilterCity && statusActive === false && statusInactive === false) {
      const resultFilter = dataMembers.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 04. f f t f
    else if (valueFilterName === "" && valueFilterCity === "" && statusActive === true && statusInactive === false) {
      const resultFilter = dataMembers.filter((item) => item.status === "Active")
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 05. f f f t
    else if (valueFilterName === "" && valueFilterCity === "" && statusActive === false && statusInactive === true) {
      const resultFilter = dataMembers.filter((item) => item.status === "Inactive")
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 06. t t f f
    else if (valueFilterName && valueFilterCity && statusActive === false && statusInactive === false) {
      const filterName = dataMembers.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      const resultFilter = filterName.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 07. t f t f
    else if (valueFilterName && valueFilterCity === "" && statusActive === true && statusInactive === false) {
      const filterStatus = dataMembers.filter((item) => item.status === "Active")
      const resultFilter = filterStatus.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 08. t f f t
    else if (valueFilterName && valueFilterCity === "" && statusActive === false && statusInactive === true) {
      const filterStatus = dataMembers.filter((item) => item.status === "Inactive")
      const resultFilter = filterStatus.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 09. f t f t
    else if (valueFilterName === "" && valueFilterCity && statusActive === false && statusInactive === true) {
      const filterStatus = dataMembers.filter((item) => item.status === "Inactive")
      const resultFilter = filterStatus.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 10. f t t f
    else if (valueFilterName === "" && valueFilterCity && statusActive === true && statusInactive === false) {
      const filterStatus = dataMembers.filter((item) => item.status === "Active")
      const resultFilter = filterStatus.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 11. t t t f
    else if (valueFilterName && valueFilterCity && statusActive === true && statusInactive === false) {
      const filterStatus = dataMembers.filter((item) => item.status === "Active")
      const filterName = filterStatus.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      const resultFilter = filterName.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // 12.  t t f t
    else if (valueFilterName && valueFilterCity && statusActive === false && statusInactive === true) {
      const filterStatus = dataMembers.filter((item) => item.status === "Inactive")
      const filterName = filterStatus.filter(dataMember => dataMember.tutorName.toLowerCase().includes(valueFilterName.toLowerCase()))
      const resultFilter = filterName.filter(dataMember => dataMember.regional.toLowerCase().includes(valueFilterCity.toLowerCase()))
      setDataRenders(resultFilter)
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage))
    }

    // console.log(valueFilterName, valueFilterCity, statusActive, statusInactive)
  }

  // reset filter
  const onResetFilter = () => {
    setDataRenders(dataMembers)
    setMaxPage(Math.ceil(dataMembers.length / rowPerPage))
    if (statusActive) {
      setStatusActive(!statusActive)
    } else if (statusInactive) {
      setStatusInactive(!statusInactive)
    }
  }

  // handle sort
  const handleSortName = async (e) => {
    if (sortName === false) {
      return await axios.get(`${url}?_sort=studentsName&_order=asc`)
        .then(res => {
          setDataRenders(res.data)
          setSortName(!sortName)
        })
    } else {
      return await axios.get(`${url}?_sort=studentsName&_order=desc`)
        .then(res => {
          setDataRenders(res.data)
          setSortName(!sortName)
        })
    }
  }
  const handleSortStatus = async (e) => {
    if (sortStatus === false) {
      return await axios.get(`${url}?_sort=status&_order=asc`)
        .then(res => {
          setDataRenders(res.data)
          setSortStatus(!sortStatus)
        })
    } else {
      return await axios.get(`${url}?_sort=status&_order=desc`)
        .then(res => {
          setDataRenders(res.data)
          setSortStatus(!sortStatus)
        })
    }
  }


  return (
    <div className='flex'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:m-8 w-full min-h-screen'>
        <Navbar />
        <div className='text-white font-bold text-xl m-2'>Data Students</div>
        <div className='m-2'>

          {/* filter table */}
          <div className='text-white text-sm my-2'>Filter Setting :</div>
          <div className='flex justify-between w-full flex-wrap'>
            <div className='flex gap-2 mr-2'>
              <form className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/3 mb-2 h-8'>
                <input ref={refFilterName} type="text" placeholder='By Name' className='outline-none bg-transparent w-full ml-2 text-white font-thin text-sm' />
              </form>

              <form className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/3 mb-2 h-8'>
                <input ref={refFilterCity} type="text" placeholder='By Regional' className='outline-none bg-transparent w-full ml-2 text-white font-thin text-sm' />
              </form>

              <div className='flex'>
                <button onClick={handleActive} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-l-md px-2' >
                  {statusActive ?
                    <span className="material-symbols-rounded text-sky-500 text-base mr-1">check_circle</span>
                    :
                    <span className="material-symbols-rounded text-base mr-1">radio_button_unchecked</span>
                  }
                  Active
                </button>

                <button onClick={handleInactive} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-r-md px-2'>
                  {statusInactive ?
                    <span className="material-symbols-rounded text-sky-500 text-base mr-1">check_circle</span>
                    :
                    <span className="material-symbols-rounded text-base mr-1">radio_button_unchecked</span>
                  }
                  Inactive
                </button>
              </div>

              <div>
                <button onClick={onFilter} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-md px-1'>
                  <span className="material-symbols-rounded text-white">filter_alt</span>
                </button>
              </div>
              <div>
                <button onClick={onResetFilter} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-md px-1'>
                  <span className="material-symbols-rounded text-white">filter_alt_off</span>
                </button>
              </div>
            </div>

            <ExportExcel data={dataMembers} />
          </div>

          <div className='text-white text-sm my-2'>Data Results :</div>

          <table className='table-auto w-full'>
            <thead className='h-8'>
              <tr className='text-sm text-white font-thin bg-sky-500 h-full'>
                <th className='font-medium '>No.</th>
                <th className='font-medium flex items-center h-8 justify-between w-fit'>
                  Name

                  {/* sort button */}
                  <span onClick={handleSortName} className="material-symbols-rounded cursor-pointer text-white">
                    {sortName ? "expand_more" : "expand_less"}
                  </span>
                </th>

                <th className='font-medium hidden md:table-cell'>Address</th>
                <th className='font-medium'>Regional</th>
                <th className='hidden md:table-cell font-medium'>Gender</th>
                <th className='font-medium flex items-center h-8 justify-between'>
                  Status

                  {/* sort button */}
                  <span onClick={handleSortStatus} className="material-symbols-rounded cursor-pointer text-white">
                    {sortStatus ? "expand_more" : "expand_less"}
                  </span>
                </th>
                <th className='font-medium'>Action</th>
              </tr>
            </thead>

            {dataMembers.length === 0 ? (
              <tbody>
                <tr className='text-white font-thin w-full'>
                  <td style={{ colSpan: "8" }}>
                    No Data Found
                  </td>
                </tr>
              </tbody>
            ) : (
              sliceTable.map((item, index) => {
                return (
                  <tbody key={index} className="text-white font-thin text-sm">
                    <tr className={index % 2 === 0 ? "bg-neutral-800 h-8" : "bg-neutral-900 h-8"} >
                      <td className='text-center'>{item.id}</td>

                      <td className='hidden md:table-cell'>{item.studentsName}</td>
                      <td className='hidden md:table-cell'>{item.address}</td>
                      <td>{item.regional}</td>
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
          <div className='flex justify-end my-4'>
            <button
              onClick={onPrev}
              disabled={page === 1 ? true : false}
              className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-l-md px-2'>
              Prev
            </button>
            <button
              onClick={onNext}
              disabled={page === maxPage ? true : false}
              className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-r-md px-2'>
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Students