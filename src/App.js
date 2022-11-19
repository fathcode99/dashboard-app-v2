import React, { useEffect } from "react";

// import pages
import Home from "./pages/home";
import Tutors from "./pages/tutors";
import Students from "./pages/students";
import DetailTutor from "./pages/detailTutor";
import Login from "./pages/login";
import Apply from "./pages/apply";
// import FeePengajar from "./pages/feePengajar";
import DetailStudent from "./pages/detailStudent";
// import KeuanganSiswa from "./pages/keuanganSiswa";
import NotifyAdmin from "./pages/notifyAdmin";
import Picture from "./pages/picture";
import DataKeuangan from "./pages/datakeuangan";

import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");

    async function getDataPengajar() {
      try {
        await axios
        .get(`${url}/datapengajar`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "GET_DATA_TUTORS",
            payload: res.data,
          });
        });
      } catch (err) {
        console.log("Error when fetching data - Pengajar");
      }
    }
    getDataPengajar()
      
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

    async function getBiaya() {
      try {
        await axios
          .get(`${url}/biaya`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            dispatch({
              type: "GET_DATA_BIAYA",
              payload: res.data,
            });
          });
      } catch (err) {
        console.log("Error when fetching data - Biaya");
      }
    }
    getBiaya()

    async function getDataOrtuSiswa() {
      try {
        await axios
        .get(`${url}/dataortusiswa`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "GET_DATA_STUDENTS",
            payload: res.data,
          });
        });
      } catch (err) {
        console.log("Error when fetching data - Ortu Siswa");
      }
    }
    getDataOrtuSiswa()
      

    async function getNotify() {
      try {
        await axios
        .get(`${url}/notifyadmin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "GET_DATA_NOTIFY",
            payload: res.data,
          });
        });
      } catch (err) {
        console.log("Error when fetching data - Notify ")
      }
    }
    getNotify()
    
  }, [dispatch]);

  return (
    <div className="dark:bg-neutral-900 font-rubik bg-slate-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/:id" element={<DetailTutor />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/keuangan" element={<DataKeuangan />} />

        <Route path="/students" element={<Students />} />
        {/* <Route path="/keuangansiswa" element={<KeuanganSiswa />} /> */}
        <Route path="/students/:id" element={<DetailStudent />} />

        <Route path="/notifadmin" element={<NotifyAdmin />} />
        <Route path="/picture" element={<Picture />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
