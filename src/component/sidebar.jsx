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
    // <div className="min-w-[40px] md:w-[240px] lg:w-[260px] flex flex-col fixed h-screen md:min-h-screen drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] overflow-y-auto">
      <div className="min-w-[40px] lg:w-[240px] flex flex-col h-full text-white justify-start pt-10 bg-ungutua ">
        
        <div className="w-full sidebar flex text-sm flex-col gap-6 md:gap-3 lg:gap-0">
          <div> 
              <span className="hidden lg:block ml-4 font-semibold text-4xl text-center mb-4">ADMIN</span>
            </div>

          <span className="hidden lg:block  text-xs text-left pl-4">Home</span>
          <Link to="/">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> grid_view </span>
              <span className="hidden lg:block  ml-4">Dashboard</span>
            </div>
          </Link>

          
          <Link to="/tutors">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded ">
                supervised_user_circle
              </span> 
              <span className="hidden lg:block  ml-4">Data Pengajar</span>
            </div>
          </Link>
          <Link to="/apply">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded ">
                supervised_user_circle
              </span>
              <span className="hidden lg:block  ml-4">Apply Pengajar</span>
            </div>
          </Link>
          <Link to="/pay">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded ">
                payments
              </span>
              <span className="hidden lg:block  ml-4">Data Keuangan</span>
            </div>
          </Link>

          
          <Link to="/students">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> groups </span>
              <span className="hidden lg:block  ml-4">Data Siswa</span>
            </div>
          </Link>

          <Link to="/register">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> groups </span>
              <span className="hidden lg:block  ml-4">Registrasi Siswa</span>
            </div>
          </Link>

          <span className="hidden lg:block text-xs text-left pl-4 mt-5">
            Admin
          </span>
          <Link to="/notifadmin" onClick={onCounter}>
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> notifications </span>
              <div className="hidden lg:block  ml-4">
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
          <Link to="/ads">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> storefront </span>
              <span className="hidden lg:block  ml-4">Advertising</span>
            </div>
          </Link>

          <Link to="/catatan">
            <div className="sidebar-btn uppercase">
              <span className="material-symbols-rounded "> edit_note </span>
              <span className="hidden lg:block  ml-4">Catatan</span>
            </div> 
          </Link>

          <div
            onClick={onLogout}
            className="sidebar-btn uppercase"
          >
            <span className="material-symbols-rounded "> logout </span>
            <span className="hidden lg:block  ml-4">Logout</span>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Sidebar;
