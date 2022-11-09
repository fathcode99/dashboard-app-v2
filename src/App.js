import React, { useEffect } from "react";

// import pages
import Home from "./pages/home";
import Tutors from "./pages/tutors";
import Students from "./pages/students";
import DetailTutor from "./pages/detailTutor";
import Login from "./pages/login";
import Apply from "./pages/apply";
import FeePengajar from "./pages/feePengajar";
import DetailStudent from "./pages/detailStudent";

import axios from "axios";
import { Routes, Route } from "react-router-dom";
// import axios from 'axios'
import { useDispatch } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
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

    axios
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

    axios
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

    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [dispatch]);

  return (
    <div className="dark:bg-neutral-900 font-rubik bg-slate-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/tutors/:id" element={<DetailTutor />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/feepengajar" element={<FeePengajar />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<DetailStudent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
