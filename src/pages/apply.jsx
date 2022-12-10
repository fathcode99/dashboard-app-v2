import React, { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
// import ExportExcel from "../component/exportExcel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const Tutors = () => {
  const stateTutors = useSelector((state) => state.applyReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // default data
  const [dataMembers, setDataMembers] = useState(stateTutors.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateTutors.data);

  // pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  let [nomer, setNomer] = useState(1);

  let rowPerPage = 20;
  let startRow = (page - 1) * rowPerPage;
  let sliceTable = dataRenders.slice(startRow, startRow + rowPerPage);

  const onNext = () => {
    setPage(page + 1);
    setNomer(rowPerPage * page + 1);
  };
  const onPrev = () => {
    setPage(page - 1);
    setNomer(1 + rowPerPage * (page - 2));
  };

  useEffect(() => {
    setDataMembers(stateTutors.data);
    setDataRenders(dataMembers);
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage));
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTutors.data, dataMembers, rowPerPage]);

  const onSearch = (e) => {
    let value = e.target.value;
    if (value) {
      const matchDatas = dataMembers.filter((item) => {
        return (
          item.nama_pengajar.toLowerCase().includes(value.toLowerCase()) ||
          item.no_telp.toLowerCase().includes(value.toLowerCase()) ||
          item.id_pengajar.toString().includes(value.toLowerCase())  
        );
      });
      setDataRenders(matchDatas);
    } else if (!value) {
      setDataRenders(dataMembers);
    }
  };

  // proteksi login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    async function getApply() {
      try {
        await axios
        .get(`${url}/apply`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "GET_DATA_APPLY",
            payload: res.data,
          });
        });
      } catch (err) {
        console.log("Error when fetching data - Apply");
      }
    }
    getApply()

    if (!token) {
      navigate("/login");
    }
  }, [navigate, dispatch]);

  // menghapus data apply
  let token = localStorage.getItem("token");
  const deleteApply = (id) => {
    axios
      .delete(`${url}/apply/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/apply`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch({
              type: "GET_DATA_APPLY",
              payload: res.data,
            });
          });
      });
  };

  // modal message for apply
  const [modalMessage, setModalMessage] = useState(false)
  const [idApply, setIdApply] = useState(null)
  const [nmPengajar, setNmPengajar] = useState('')

  const onApply = (id, name) => {
    setModalMessage(true)
    setIdApply(id)
    setNmPengajar(name)
  }

  // modal message
  let defaultMessage = "Anda mendapatkan siswa bernama ...";
  let refMessage = useRef();
  const closeModal = () => {
    setModalMessage(false);
  };

  const onMessage = async () => {
    let messageNotif = refMessage.current.value;

    let message = {
      id_pengajar: idApply,
      nama_pengajar: nmPengajar,
      pesan: messageNotif,
    };
    await axios
      .post(`${url}/notifypengajar`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setModalMessage(false)
        setIdApply(null)
        setNmPengajar('')
      }); 
  };

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] lg:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2 relative'>
        <Navbar />
        <div className="main-title">Data Apply</div>
        <div>
          <div className="flex flex-col dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            
            {/* search data */}
            <div className="flex justify-between items-center">  
              <div className="flex mb-3">
                <input
                  onChange={(e) => onSearch(e)}
                  type="text"
                  placeholder="Search by Id/Name"
                  className="outline-none bg-transparent w-full ml-2 dark:text-white  text-sm border-b border-sky-500"
                />
              </div> 
            </div>

            {/* TABLE START */}
            <table className="w-full">
              <thead className="h-8">
                <tr className="text-sm text-white  dark:bg-sky-500 bg-slate-900 h-full">
                  <th className="font-medium w-8 cursor-pointer border-r">No.</th>
                  <th className="font-medium w-12 cursor-pointer border-r">Tanggal</th>
                  <th className="font-medium w-8 cursor-pointer border-r">Waktu</th>
                  <th className="font-medium w-24 cursor-pointer border-r">ID Pengajar</th>
                  <th className="font-medium w-36 border-r"> Nama </th>
                  <th className="font-medium hidden md:table-cell cursor-pointer border-r">Mapel</th>
                  <th className="font-medium hidden md:table-cell border-r cursor-pointer"> Asal Kampus </th>
                  <th className="font-medium cursor-pointer border-r">Telp</th>
                  {/* <th className="font-medium hidden md:table-cell cursor-pointer border-r">Email</th> */}
                  <th className="font-medium">Action</th>
                </tr>
              </thead>

              {dataMembers.length === 0 ? (
                <tbody>
                  <tr className="dark:text-white  w-full">
                    <td style={{ colSpan: "8" }}>No Data Found</td>
                  </tr>
                </tbody>
              ) : (
                sliceTable
                // .sort((a, b) => (a.nama_pengajar > b.nama_pengajar ? 1 : -1))
                .map((item, index) => {
                  return (
                    <tbody
                      key={index}
                      className="dark:text-white  text-sm "
                    >
                      <tr
                        className={
                          index % 2 === 0
                            ? " bg-slate-white h-8"
                            : " bg-slate-200 h-8"
                        }
                      >
                        <td className="text-center border-r">{nomer++}</td>
                        <td className="whitespace-nowrap border-r px-2">
                              {item.created_at.slice(0, 10)}
                        </td>
                        <td className="whitespace-nowrap border-r px-2">
                              {item.created_at.slice(11, 16)}
                        </td>

                        <td className="border-r px-2 text-center">
                          {item.id_pengajar}
                        </td>
                        <td className="border-r px-2">{item.nama_pengajar}</td>
                        <td className="border-r px-2 uppercase hidden md:table-cell">
                          {item.mapel}
                        </td>
                        <td className="border-r px-2 text-center hidden md:table-cell">
                          {item.asal_kampus}
                        </td>
                        <td className="border-r text-center">{item.no_telp}</td>
                        {/* <td className="border-r px-2 hidden md:table-cell">{item.email}</td> */}
                        <td className="flex justify-center items-center h-8 gap-2 ">
                          <button
                            onClick={() => onApply(item.id_pengajar, item.nama_pengajar)}
                            className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => deleteApply(item.id)}
                            className="hover:bg-slate-200 transition duration-300 bg-rose-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              )}
            </table>
            <div className="flex justify-end my-4">
              <button
                onClick={onPrev}
                disabled={page === 1 ? true : false}
                className="dark:text-white bg-slate-200 dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-l-md px-2"
              >
                Prev
              </button>
              <button
                onClick={onNext}
                disabled={page === maxPage ? true : false}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-r-md px-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      
         {/* modal message */}
         {modalMessage ? (
          <div className="absolute backdrop-blur-sm w-full h-full bg-transparent bg-opacity-20 flex justify-center items-center">
            <div className="flex flex-col w-[75%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3">
              <div className="flex justify-between">
                <div className="dark:text-white">Send Message</div>
                <button onClick={closeModal}>
                  <span className="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div>

              <textarea
                ref={refMessage}
                type="text"
                className=" break-words dark:text-white  text-sm rounded-md p-2 bg-transparent outline-none border dark:border-sky-500 border-slate-900 "
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

      </div>
    </div>
  );
};

export default Tutors;
