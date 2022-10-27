import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Sidebar from '../component/sidebar'
import Navbar from '../component/navbar'
import ExportExcel from '../component/exportExcel'

const url = "http://localhost:2000/members"

const Members = () => {
    const [dataMembers, setDataMembers] = useState([])
    const [resultSearch, setResultSearch] = useState([])
    const [sortName, setSortName] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        return await axios.get(url)
            .then(res => {
                setDataMembers(res.data)
                setResultSearch(res.data)
            })
    }

    const handleSubmit = (e) => e.preventDefault()
    const handleSearch = (e) => {
        if (!e.target.value) return setResultSearch(dataMembers)

        const resultArray = dataMembers.filter(dataMember => dataMember.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setResultSearch(resultArray)
    }

    const handleSortName = async (e) => {
        if (sortName === false) {
            return await axios.get(`${url}?_sort=first_name&_order=asc`)
                .then(res => {
                    setDataMembers(res.data)
                    setResultSearch(res.data)
                    setSortName(!sortName)
                })
        } else {
            getData()
            setSortName(!sortName)
        }
    }


    console.log("refresh")
    return (
        <div className='flex'>
            <div className='flex'>
                <Sidebar />
            </div>
            <div className='flex flex-col md:m-8 w-full min-h-screen'>
                <Navbar />
                <div className='text-white text-lg m-2'>Data Members</div>
                <div className='m-2'>
                    <div className='flex justify-between w-full'>
                        <form onSubmit={handleSubmit} className='bg-neutral-800 rounded-md flex items-center border border-sky-500 w-1/3 mb-2 h-8'>
                            <input onChange={handleSearch} type="text" placeholder='Search Name' className='outline-none bg-transparent w-full ml-2 text-white font-thin text-sm' />
                            <span class="material-symbols-rounded text-sky-500 text-sm mx-2 cursor-pointer">search</span>
                        </form>
                        {/* <div className='cursor-pointer bg-neutral-800 rounded-md flex justify-center items-center border border-sky-500 w-8 mb-2 h-8 p-2'>
                        <span className="material-symbols-rounded text-white">description</span>
                        </div> */}
                        <ExportExcel data={dataMembers}/>
                    </div>

                    <table className='w-full'>
                        <thead className='h-8'>
                            <tr className='text-sm text-white font-thin bg-neutral-800'>
                                <th className='font-medium '>No.</th>
                                <th onClick={handleSortName} className='font-medium cursor-pointer'>First Name</th>
                                <th className='font-medium hidden'>Last Name</th>
                                <th className='font-medium hidden'>Email</th>
                                <th className='font-medium'>Gender</th>
                                <th className='font-medium'>Status</th>
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
                            resultSearch.map((item, index) => {
                                return (
                                    <tbody key={index} className="text-white font-thin text-sm">
                                        <tr className={index % 2 === 0 ? "bg-neutral-800 h-8" : "bg-neutral-900 h-8"} >
                                            <td className='text-center'>{index + 1}</td>
                                            <td>{item.first_name}</td>
                                            <td className='hidden'>{item.last_name}</td>
                                            <td className='hidden'>{item.email}</td>
                                            <td>{item.gender}</td>
                                            <td className={item.status === "Active" ? "text-lime-600 text-center" : "text-rose-600 text-center"}>
                                                {item.status}
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

export default Members