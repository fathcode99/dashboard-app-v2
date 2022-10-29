import axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from '../component/navbar'
import Sidebar from '../component/sidebar'

const url = 'http://localhost:2000/tutors'

const AddTutor = () => {

    const dispatch = useDispatch()
    let refName = useRef()
    let refAddress = useRef()
    let refBirth = useRef()
    let refGender = useRef()
    let refPhone = useRef()
    let refRegional = useRef()

    const onSubmit = () => {
        let valueName = refName.current.value
        let valueAddress = refAddress.current.value
        let valueBirth = refBirth.current.value
        let valueGender = refGender.current.value
        let valuePhone = refPhone.current.value
        let valueRegional = refRegional.current.value 

        const addTutor = {
            tutorName : valueName,
            gender : valueGender,
            phone : valuePhone,
            registeredId : "123456789",
            address : valueAddress,
            dateBirth : valueBirth,
            dateJoin : "4/10/2022",
            feeTutor : null,
            regional : valueRegional,
            img : "http",
            status : "Active",
            detailFeeTutor : [],
            notif : []
        }

        axios.post(url, addTutor)
        .then(res => {
            dispatch({
                type : 'GET_DATA_TUTOR',
                payload : res.data
            })
            refName.current.value = ""
            refAddress.current.value = ""
            refBirth.current.value = ""
            refGender.current.value = ""
            refPhone.current.value = ""
            refRegional.current.value = ""
        })
    }

    return (
        <div className='flex'>
            <div className="flex">
                <Sidebar />
            </div>
            <div className="flex flex-col md:m-8 w-full min-h-screen m-2">
                <Navbar />
                <div className='text-white font-bold text-xl m-2 '>Add New Tutors</div>
                <div className="flex flex-col bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                    <div className='flex flex-col'>
                        <label className='text-white text-sm'>Full Name</label>
                        <input type="text" placeholder='Full Name' ref={refName}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-sm'>Address</label>
                        <input type="text" placeholder='Address' ref={refAddress}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-sm'>Date Birth</label>
                        <input type="text" placeholder='Date' ref={refBirth}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-sm'>Gender</label>
                        <input type="text" placeholder='Male / Female' ref={refGender}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-sm'>Phone</label>
                        <input type="text" placeholder='Number' ref={refPhone}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <div className='flex flex-col mt-4'>
                        <label className='text-white text-sm'>Regional</label>
                        <input type="text" placeholder='Regional' ref={refRegional}
                            className='mt-2 outline-none bg-transparent border-b border-sky-500 text-white text-sm font-thin' />
                    </div>

                    <button
                        onClick={onSubmit}
                        className='mt-3 text-white px-2 py-1 text-sm font-thin hover:bg-sky-500 w-fit drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] bg-neutral-700 rounded'>
                        Submit
                    </button>
                    <div className='text-white text-xs font-thin mt-6'>
                        Note : Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTutor