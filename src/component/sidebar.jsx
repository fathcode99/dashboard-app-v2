import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Sidebar = () => {
  const stateNotify = useSelector((state) => state.notifyAdminReducer);
  const [counterNotify, setCounterNotify] = useState();


  useEffect(() => {
    setCounterNotify(stateNotify.data.length); 
  }, [stateNotify]);

  let counter = localStorage.getItem('count')
  const onCounter = () => {
    localStorage.setItem('count', counterNotify)
  }

  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-w-[40px] md:w-[200px] flex flex-col dark:bg-neutral-800 bg-slate-300 min-h-screen drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
      <div className="min-w-[40px] md:w-[200px] flex flex-col min-h-screen justify-center dark:text-white">
        <div className="flex justify-center items-center  pb-6">
          <span className="font-bold text-center  text-xs  md:text-5xl md:mt-3 md:mb-5">
            LO
            <br />
            GO
          </span>
        </div>
        <div className="w-full sidebar flex text-sm flex-col gap-8 lg:gap-0">
          <span className="hidden md:block  text-xs text-left pl-4">Home</span>
          <Link to="/">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded "> grid_view </span>
              <span className="hidden md:block  ml-4">Dashboard</span>
            </div>
          </Link>

          <span className="hidden md:block text-xs text-left pl-4 mt-5">
            Data Tentang Pengajar
          </span>
          <Link to="/tutors">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded ">
                supervised_user_circle
              </span>
              <span className="hidden md:block  ml-4">List Tutors</span>
            </div>
          </Link>
          <Link to="/apply">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded ">
                supervised_user_circle
              </span>
              <span className="hidden md:block  ml-4">Apply Pengajar</span>
            </div>
          </Link>
          <Link to="/feepengajar">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded ">
                supervised_user_circle
              </span>
              <span className="hidden md:block  ml-4">Keuangan Pengajar</span>
            </div>
          </Link>

          <span className="hidden md:block  text-xs text-left pl-4 mt-5">
            Data Tentang Siswa
          </span>
          <Link to="/students">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded "> groups </span>
              <span className="hidden md:block  ml-4">Data Siswa</span>
            </div>
          </Link>
          <Link to="/keuangansiswa">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded "> groups </span>
              <span className="hidden md:block  ml-4">Keuangan Siswa</span>
            </div>
          </Link>

          <span className="hidden md:block text-xs text-left pl-4 mt-5">
            Admin
          </span>
          <Link to="/notifadmin" onClick={onCounter}>
            <div className="sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 cursor-pointer">
              <span className="material-symbols-rounded "> notifications </span>
              <div className="hidden md:block  ml-4">
                Notifikasi
                {counter < counterNotify ? (
                  <span className="h-6 ml-2 px-2 bg-rose-700 text-white rounded-md">
                    {counterNotify}
                  </span>
                ) : (
                  <span className="h-6 ml-2 px-2 border border-slate-500 rounded-sm">
                    {counterNotify}
                  </span>
                )}
              </div>
            </div>
          </Link>
          <Link to="/picture">
            <div className="cursor-pointer sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4">
              <span className="material-symbols-rounded "> groups </span>
              <span className="hidden md:block  ml-4">Advertising</span>
            </div>
          </Link>
          <div
            onClick={onLogout}
            className="sidebar-btn-hover hover:border-l-2 border-sky-500 md:flex md:justify-start md:pl-4 cursor-pointer"
          >
            <span className="material-symbols-rounded "> logout </span>
            <span className="hidden md:block  ml-4">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
