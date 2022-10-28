import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import ExportExcel from '../component/exportExcel'

const url = "http://localhost:2000/students"

const Students = () => {
  const [dataMembers, setDataMembers] = useState([])

  // data filter result
  const [resultSearch, setResultSearch] = useState([])
  const [filterName, setFilterName] = useState([])
  const [filterGender, setFilterGender] = useState([])

  // sort
  const [sortName, setSortName] = useState(false)
  const [statusActive, setStatusActive] = useState(false)
  const [statusInactive, setStatusInactive] = useState(false)

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    return await axios.get(url)
      .then(res => {
        setDataMembers(res.data)
        setResultSearch(res.data)
        setMaxPage(Math.ceil(res.data.length / rowPerPage))
      })
  }

  // handle filter search
  const handleSubmit = (e) => e.preventDefault()
  const handleSearchName = (e) => {
    if (!e.target.value) return setResultSearch(dataMembers)

    const resultName = dataMembers.filter(dataMember => dataMember.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterName(resultName)
    setResultSearch(resultName)
  }

  const handleSearchGender = (e) => {
    if (!e.target.value) return setResultSearch(filterName)

    const resultGender = filterName.filter(dataMember => dataMember.gender.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterGender(resultGender)
    setResultSearch(resultGender)
  }

  // handle status
  const handleActive = () => {
    if (statusActive === false) {
      setStatusActive(!statusActive)
      setResultSearch(dataMembers.filter((item) => item.status === "Active"))
      if (statusInactive === true) {
        setStatusInactive(false)
      } else {
        setStatusInactive(false)
      }
    } else {
      setStatusActive(!statusActive)
      setResultSearch(dataMembers)
    }
  }
  const handleInactive = () => {
    if (statusInactive === false) {
      setStatusInactive(!statusInactive)
      setResultSearch(dataMembers.filter((item) => item.status === "Inactive"))
      if (statusActive === true) {
        setStatusActive(false)
      } else {
        setStatusActive(false)
      }
    } else {
      setStatusInactive(!statusInactive)
      setResultSearch(dataMembers)
    }
  }

  // handle sort
  const handleSortName = async (e) => {
    if (sortName === false) {
      return await axios.get(`${url}?_sort=first_name&_order=asc`)
        .then(res => {
          setDataMembers(res.data)
          setResultSearch(res.data)
          setSortName(!sortName)
        })
    } else {
      return await axios.get(`${url}?_sort=first_name&_order=desc`)
        .then(res => {
          setDataMembers(res.data)
          setResultSearch(res.data)
          setSortName(!sortName)
        })
    }
  }

  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  let rowPerPage = 20
  let startRow = (page - 1) * rowPerPage
  let sliceTable = resultSearch.slice(startRow, startRow + rowPerPage)

  const onNext = () => {
    setPage(page + 1)
  }
  const onPrev = () => {
    setPage(page - 1)
  }

  console.log("refresh")

  return (
    <div className='flex'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:m-8 w-full min-h-screen'>
        <Navbar />
        <div className='text-white font-bold text-xl m-2'>Data Students</div>
        <div className='m-2'>
          <div className='text-white text-sm my-2'>Filter Setting :</div>
          <div className='flex justify-between w-full'>
            <div className='flex gap-2 mr-2'>
              <form onSubmit={handleSubmit} className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/3 mb-2 h-8'>
                <input onChange={handleSearchName} type="text" placeholder='By Name' className='outline-none bg-transparent w-full ml-2 text-white font-thin text-sm' />
                <span class="material-symbols-rounded text-sky-500 text-sm mx-2 cursor-pointer">search</span>
              </form>

              <form onSubmit={handleSubmit} className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/3 mb-2 h-8'>
                <input onChange={handleSearchGender} type="text" placeholder='By Gender' className='outline-none bg-transparent w-full ml-2 text-white font-thin text-sm' />
                <span class="material-symbols-rounded text-sky-500 text-sm mx-2 cursor-pointer">search</span>
              </form>

              <div className='flex'>
                <button onClick={handleActive} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-l-md px-2' >
                  {statusActive ?
                    <span class="material-symbols-rounded text-sky-500 text-base mr-1">check_circle</span>
                    :
                    <span class="material-symbols-rounded text-base mr-1">radio_button_unchecked</span>
                  }
                  Active
                </button>

                <button onClick={handleInactive} className='text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-r-md px-2'>
                  {statusInactive ?
                    <span class="material-symbols-rounded text-sky-500 text-base mr-1">check_circle</span>
                    :
                    <span class="material-symbols-rounded text-base mr-1">radio_button_unchecked</span>
                  }
                  Inactive
                </button>
              </div>
            </div>
            {/* <div className='cursor-pointer bg-neutral-800 rounded-md flex justify-center items-center border border-sky-500 w-8 mb-2 h-8 p-2'>
                        <span className="material-symbols-rounded text-white">description</span>
                        </div> */}
            <ExportExcel data={dataMembers} />
          </div>

          <div className='text-white text-sm my-2'>Data Results :</div>
          <table className='w-full'>
            <thead className='h-8'>
              <tr className='text-sm text-white font-thin bg-sky-500 h-full'>
                <th className='font-medium '>No.</th>
                <th className='font-medium flex items-center h-8 justify-between'>
                  First Name

                  {/* sort button */}
                  <span onClick={handleSortName} className="material-symbols-rounded cursor-pointer text-white">
                    {sortName ? "expand_more" : "expand_less"}
                  </span>
                </th>
                <th className='font-medium hidden md:table-cell'>Last Name</th>
                <th className='font-medium hidden md:table-cell'>Email</th>
                <th className='font-medium hidden md:table-cell'>Gender</th>
                <th className='font-medium'>Payment</th>
                <th className='font-medium'>Status</th>
                <th className='font-medium'>Action</th>
              </tr>
            </thead>

            {resultSearch.length === 0 ? (
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
                      <td>{item.first_name}</td>
                      <td className='hidden md:table-cell'>{item.last_name}</td>
                      <td className='hidden md:table-cell'>{item.email}</td>
                      <td className='hidden md:table-cell'>{item.gender}</td>
                      <td>{item.fee}</td>
                      <td className={item.status === "Active" ? "text-lime-600 text-center" : "text-rose-600 text-center"}>
                        {item.status}
                      </td>
                      <td className='flex justify-center items-center h-8'>
                        <button className='text-white bg-neutral-800 text-sm flex justify-center items-center h-6 border border-sky-500 rounded-md px-2'>
                          View
                        </button>
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