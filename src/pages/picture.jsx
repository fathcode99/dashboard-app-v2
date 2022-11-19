import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";

const url = "https://admin.menujudigital.com/api";

const Picture = () => {
  const [dataTeks, setDataTeks] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${url}/teks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataTeks(res.data);
      });
  }, [token]);

  // upload teks id 1
  const [teksA, setTeksA] = useState();
  const onUpload = () => {
    let teks = {
      teks: teksA,
    };
    axios.post(`${url}/teks`, teks, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className="min-w-[50px] md:w-[300px]">
        <Sidebar />
      </div>
      <div className="flex flex-col md:mb-8 md:mx-8 w-full m-2 relative">
        <Navbar />
        <div className="main-title"> Upload Teks Ads </div>

        <div>
          <input
            id="addfile"
            type="teks"
            onChange={(e) => setTeksA(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-center"></div>

        <div>
          {dataTeks.length === 0 ? (
            ""
          ) : (
            <div>
              {dataTeks.map((item) => (
                <div>
                  {item.teks}
                  <button
                    onClick={onUpload}
                    className="w-fit mt-3 hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] cursor-pointer dark:bg-neutral-800 bg-slate-300 rounded-md flex justify-center items-center border dark:border-sky-500 p-2"
                  >
                    <span class="material-symbols-rounded">file_upload</span>
                    Upload Teks
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Picture;
