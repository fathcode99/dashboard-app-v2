import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://admin.menujudigital.com/api";

const DetailTutor = () => {
  const { id } = useParams();

  const [dataTutor, setDataTutor] = useState({});
  // const [dataRincian, setDataRincian] = useState([])
  const [isEdit, setIsEdit] = useState(false);

  // const [totalFeeTutor, setTotalFeeTutor] = useState();

  const [isModalMessage, setIsModalMessage] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${url}/datapengajar/${id}`);
      setDataTutor(request.data);
      console.log(request.data)
    }
    fetchData();
    // if (dataRincian === 0) {
    //   console.log('kosong')
    // } else {
    //   getTotalFee()
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // // total fee tutor
  // const getTotalFee = () => {
  //   let feeTotal = 0
  //   for (let index = 0; index < dataRincian.length; index++) {
  //     feeTotal = feeTotal = parseFloat(dataRincian[0].detailFeeStudent[index].feeTm).toFixed(3)
  //   }
  //   setTotalFeeTutor(feeTotal)
  // }

  // update edit data
  let refName = useRef();
  let refBirth = useRef();
  let refAddress = useRef();
  let refDateJoin = useRef();
  let refGender = useRef();
  let refPhone = useRef();
  let refStatus = useRef();

  const onDone = () => {
    let valueName = refName.current.value;
    let valueAddress = refAddress.current.value;
    let valueBirth = refBirth.current.value;
    let valueGender = refGender.current.value;
    let valuePhone = refPhone.current.value;
    let valueStatus = refStatus.current.value;
    let valueDateJoin = refDateJoin.current.value;

    let updateData = {
      tutorName: valueName,
      gender: valueGender,
      phone: valuePhone,
      address: valueAddress,
      dateBirth: valueBirth,
      dateJoin: valueDateJoin,
      status: valueStatus,
    };
    axios.patch(`${url}/${id}`, updateData).then((res) => {
      setIsEdit(!isEdit);
      setDataTutor(res.data);
    });
  };

  // modal message
  let defaultMessage =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo cupiditate sint, totam rem ipsa ex!";
  let refMessage = useRef();
  const closeModal = () => {
    setIsModalMessage(false);
  };
  const onMessage = () => {
    let messageNotif = refMessage.current.value;

    let dataNotif = dataTutor.notif;
    dataNotif.push({ messageNotif });

    let message = {
      notif: dataNotif,
    };
    axios.patch(`${url}/${id}`, message).then((res) => {
      setIsModalMessage(false);
    });
  };

  // modal delete
  const onValidDeleteYes = () => {
    axios.delete(`${url}/datapengajar/${id}/delete`).then((res) => {
      setDataTutor({});
      setIsModalDelete(false);
    });
  };
  const onValidDeleteNo = () => {
    setIsModalDelete(false);
  };

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen relative">
        <Navbar />
        <div className="dark:text-white font-bold text-xl m-2 ">
          Detail Data Tutor
        </div>
        {dataTutor.nama_pengajar ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
              {/* data diri */}
              {isEdit ? (
                <div className="flex flex-col w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex gap-3 relative">
                    <div className="w-1/3 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div>
                    <div className="flex flex-col w-full justify-center">
                      <input
                        ref={refName}
                        className="dark:text-white font-medium bg-transparent text-xl outline-none border-b border-sky-500"
                        defaultValue={dataTutor.tutorName}
                      />
                      <input
                        ref={refBirth}
                        className="dark:text-white font-thin text-sm bg-transparent outline-none border-b border-sky-500"
                        defaultValue={dataTutor.dateBirth}
                      />
                      <div className="italic font-thin text-sky-500 text-sm mt-3">
                        Address
                      </div>
                      <input
                        ref={refAddress}
                        className="dark:text-white font-thin text-sm bg-transparent outline-none border-b border-sky-500"
                        defaultValue={dataTutor.address}
                      />

                      <div className="flex gap-4">
                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Date Join
                          </div>
                          <input
                            ref={refDateJoin}
                            className="dark:text-white font-thin bg-transparent text-sm outline-none border-b border-sky-500"
                            defaultValue={dataTutor.dateJoin}
                          />
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <input
                            ref={refPhone}
                            className="dark:text-white font-thin bg-transparent text-sm outline-none border-b border-sky-500"
                            defaultValue={dataTutor.phone}
                          />
                        </div>
                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Gender
                          </div>
                          <input
                            ref={refGender}
                            className="dark:text-white font-thin bg-transparent text-sm outline-none border-b border-sky-500"
                            defaultValue={dataTutor.gender}
                          />
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Status
                          </div>
                          <input
                            ref={refStatus}
                            className={`dark:text-white font-thin bg-transparent text-sm outline-none border-b border-sky-500`}
                            defaultValue={dataTutor.status}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={onDone}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6"
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          done{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsEdit(false)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          cancel{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex gap-3 relative">
                    <div className="w-1/3 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div>
                    <div className="flex flex-col w-full justify-center">
                      <div className="dark:text-white font-medium text-xl">
                        {dataTutor.tutorName}
                      </div>
                      <div className="dark:text-white font-thin text-sm">
                        {dataTutor.dateBirth}
                      </div>
                      <div className="italic font-thin text-sky-500 text-sm mt-3">
                        Address
                      </div>
                      <div className="dark:text-white font-thin text-sm">
                        {dataTutor.address}
                      </div>

                      <div className="flex w-full gap-4">
                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Date Join
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.dateJoin}
                          </div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.phone}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Gender
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.gender}
                          </div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Status
                          </div>
                          <div className={`dark:text-white font-thin text-sm`}>
                            {dataTutor.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          edit{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsModalDelete(true)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          delete{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* payment */}
              <div className="flex flex-col justify-between w-full bg-slate-200 dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                <div className="dark:text-white font-thin text-sm">Payment</div>
                <div className="text-sky-500 font-thin text-right text-7xl">
                  $ 
                </div>
                <p className="dark:text-white font-thin text-right text-sm">
                  Lorem ipsum dolor sit amet, <br /> consectetur adipisicing
                  elit. Quo cupiditate sint, totam rem ipsa ex!
                </p>
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => setIsModalMessage(!isModalMessage)}
                    className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded px-2 py-1 w-fit flex items-center dark:text-white text-sm font-thin dark:hover:bg-sky-500 hover:bg-sky-500"
                  >
                    <span className=" material-symbols-rounded dark:text-white font-thin">
                      {" "}
                      chat{" "}
                    </span>
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            </div>

            {/* rincian kepengajaran */}
            <div className="flex flex-col m-2 bg-slate-200 dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
              <div className="dark:text-white font-thin text-sm my-3">
                Rincian Kepengajaran
              </div>
              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white font-thin bg-slate-900 dark:bg-sky-500 h-full">
                    <th className="font-medium ">No.</th>
                    <th className="font-medium flex items-center h-8 justify-between">
                      Students Name
                      {/* sort button
                  <span onClick={handleSortName} className="material-symbols-rounded cursor-pointer text-white">
                    {sortName ? "expand_more" : "expand_less"}
                  </span> */}
                    </th>
                    <th className="font-medium hidden md:table-cell">
                      Parents Name
                    </th>
                    <th className="font-medium hidden md:table-cell">
                      Fee Student
                    </th>
                    <th className="font-medium">Detail Payment</th>
                    <th className="font-medium">Status</th>
                    <th className="font-medium">Action</th>
                  </tr>
                </thead>

                {/* {dataRincian.length === 0 ? (
                  <tbody>
                    <tr className="text-white font-thin w-full">
                      <td style={{ colSpan: "8" }}>No Data Found</td>
                    </tr>
                  </tbody>
                ) : (
                  dataRincian.map((item, index) => {
                    return (
                      <tbody
                        key={index}
                        className="dark:text-white font-thin text-sm"
                      >
                        <tr
                          className={
                            index % 2 === 0
                              ? "dark:bg-neutral-800 bg-slate-200 h-8"
                              : "dark:bg-neutral-900 bg-slate-300 h-8"
                          }
                        >
                          <td className="text-center">{index + 1}</td>
                          <td>{item.studentsName}</td>
                          <td className="hidden md:table-cell">
                            {item.parentsName}
                          </td>
                          <td className="hidden md:table-cell">
                            $ {totalFeeTutor}
                          </td>
                          <td className="py-2">
                            <table className="w-full">
                              <thead>
                                <tr>
                                  <td>Date TM</td>
                                  <td>Fee TM</td>
                                </tr>
                              </thead>
                              {item.detailFeeStudent.map((item2, index) => (
                                <tbody key={index}>
                                  <tr>
                                    <td>{item2.dateTm}</td>
                                    <td>{item2.feeTm}</td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </td>
                          <td
                            className={
                              item.status === "Active"
                                ? "text-lime-600 text-center"
                                : "text-rose-600 text-center"
                            }
                          >
                            {item.status}
                          </td>
                          <td className="flex justify-center items-center h-8">
                            <Link to={`/students/${item.id}`}>
                              <button className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                )} */}
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full m-2 text-sky-500 italic font-thin">
            Data Empty
            <Link to="/tutors">
              <button className="mt-2 text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-md px-1">
                <span>Back to Tutors Page</span>
              </button>
            </Link>
          </div>
        )}

        {/* modal message */}
        {isModalMessage ? (
          <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
            <div className="flex flex-col w-[75%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3">
              <div className="flex justify-between">
                <div className="dark:text-white">Send Message</div>
                <button onClick={closeModal}>
                  <span class="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div>

              <textarea
                ref={refMessage}
                type="text"
                className=" break-words dark:text-white font-thin text-sm rounded-md p-2 bg-transparent outline-none border dark:border-sky-500 border-slate-900 "
                defaultValue={defaultMessage}
              />

              <button
                onClick={onMessage}
                className="hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-2 w-fit mt-2"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* modal delete */}
        {isModalDelete ? (
          <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
            <div className="flex flex-col w-[45%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center">
              <div className="flex justify-between">
                <div className=" text-rose-500">Delete Data</div>
              </div>
              <div className="flex justify-between">
                <div className="dark:text-white font-thin text-sm">
                  Are you sure ?
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onValidDeleteYes}
                  className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 rounded-md px-2 w-fit mt-2"
                >
                  Yes
                </button>
                <button
                  onClick={onValidDeleteNo}
                  className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 rounded-md px-2 w-fit mt-2"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DetailTutor;
