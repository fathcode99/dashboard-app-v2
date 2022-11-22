import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";

const url = "https://admin.menujudigital.com/api";

const NotifyAdmin = () => {
  const stateNotify = useSelector((state) => state.notifyAdminReducer);
  const [dataNotify, setDataNotify] = useState(stateNotify.data);


  const [isModalDelete, setIsModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(null)
  
  let token = localStorage.getItem("token");
  
  const dispatch = useDispatch()

  useEffect(() => {
    setDataNotify(stateNotify.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateNotify]);

  // modal delete
  const onDelete = (id) => {
    setIsModalDelete(true)
    setIdDelete(id)
  }
  
  const onValidDeleteYes = () => {
    axios
      .delete(`${url}/notifyadmin/${idDelete}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios.get(`${url}/notifyadmin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          dispatch({
            type : 'GET_DATA_NOTIF',
            payload : res.data
          })
          setDataNotify(res.data)
          setIsModalDelete(false);
          setIdDelete(null)
        })
      });
  };

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] md:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2 relative'>
        <Navbar />
        <div className="main-title">
          {" "}
          Notifikasi dari Pengajar{" "}
        </div>
        {dataNotify.length === 0
          ? ""
          : dataNotify.map((item, index) => (
              <div
                key={index}
                className="bg-slate-200 p-2 border-b mb-2 border-slate-500 flex justify-between gap-2"
              >
                <div className="flex gap-3">
                  <div>{item.id_pengajar}</div>
                  <div>{item.nama_pengajar}</div>
                </div>

                <button
                  onClick={() => onDelete(item.id)}
                  className="hover:bg-slate-200 transition duration-300 bg-rose-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                >
                  <span className="material-symbols-rounded dark:text-white ">
                    {" "}
                    Delete{" "}
                  </span>
                  <span>Delete</span>
                </button>
              </div>
            ))}

      {/* modal delete */}
      {isModalDelete ? (
          <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
            <div className="flex flex-col w-[45%] bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center">
              <div className="flex justify-between">
                <div className=" text-rose-500">Delete Data</div>
              </div>
              <div className="flex justify-between">
                <div className="dark:text-white  text-sm">
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
                  onClick={() => setIsModalDelete(false)}
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

export default NotifyAdmin;
