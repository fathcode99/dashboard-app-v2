import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
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
  // const [teksA, setTeksA] = useState();
  const [indexEdit, setIndexEdit] = useState(null);
  const teksIklanRef = useRef();
  const onUpload = async (id) => {
    let teksA = teksIklanRef.current.value;
    let teks = {
      teks: teksA,
    };
    await axios
      .put(`${url}/teks/${id}/update`, teks, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/teks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataTeks(res.data);
          });
      });
    setIndexEdit(null);
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
          {dataTeks.length === 0 ? (
            ""
          ) : (
            <div>
              {dataTeks.map((item, index) => (
                <div className="mb-5" key={index}>
                  {indexEdit === index ? (
                    <textarea
                      ref={teksIklanRef}
                      name="iklan"
                      id="teksiklan" 
                      rows="3"
                      defaultValue={item.teks}
                      className="w-full"
                    />
                  ) : (
                    <div className="bg-slate-100 p-2 w-full mb-3 rounded-md">
                      {item.teks}
                    </div>
                  )}

                  <div>
                    {indexEdit === index ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => onUpload(item.id)}
                          className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                        >
                          <span className="material-symbols-rounded">
                            file_upload
                          </span>
                          Upload Teks
                        </button>
                        <button
                          className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                          onClick={() => setIndexEdit(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                        onClick={() => setIndexEdit(index)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
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
