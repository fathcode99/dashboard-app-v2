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
import Ads from "./pages/ads";
import DataKeuangan from "./pages/datakeuangan";
import Catatan from "./pages/catatan";

import axios from "axios";
import { Routes, Route, BrowserRouter } from "react-router-dom"; 
import { useDispatch } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token"); 

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
      <BrowserRouter>
        <Routes basename="/">
          <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="students/:id" element={<DetailStudent />} /> 
              <Route path="notifadmin" element={<NotifyAdmin />} />
              <Route path="ads" element={<Ads />} />
              <Route path="catatan" element={<Catatan />} />
              <Route path="tutors" element={<Tutors />} />
              <Route path="tutors/:id" element={<DetailTutor />} />
              <Route path="apply" element={<Apply />} />
              <Route path="pay" element={<DataKeuangan />} />
              <Route path="students" element={<Students />} /> 
          </Route>
          {/* <Route path="/" element={<Home />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/tutors/:id" element={<DetailTutor />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/pay" element={<DataKeuangan />} />

          <Route path="/students" element={<Students />} /> */}
          {/* <Route path="/keuangansiswa" element={<KeuanganSiswa />} /> */}

          {/* <Route path="/students/:id" element={<DetailStudent />} />

          <Route path="/notifadmin" element={<NotifyAdmin />} />
          <Route path="/picture" element={<Picture />} />
          <Route path="/catatan" element={<Catatan />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
