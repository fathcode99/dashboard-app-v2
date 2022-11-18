import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";

const url = "https://admin.menujudigital.com/api";

const Picture = () => {
  const [file, setFile] = useState();
  const [dataGbr, setDataGbr] = useState([]);

  let token = localStorage.getItem("token");

  const onChooseFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get(`${url}/gambar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataGbr(res.data);
      });
  }, [token]);

  const onUpload = () => {
    const data = new FormData();
    data.append("gambar", file);

    axios.post(`${url}/gambar`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          Upload Picture{" "}
        </div>
        <div className="w-full h-[400px] bg-slate-300 flex justify-center items-center overflow-hidden">
          <label
            htmlFor="addfile"
            className="flex flex-col text-slate-700 cursor-pointer hover:text-sky-500"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="upload"
                className="h-[400px]"
              />
            ) : (
              <>
                <span class="material-symbols-rounded text-5xl text-center">
                  add_photo_alternate
                </span>
                <div>Choose File</div>
              </>
            )}
          </label>
        </div>
        <div>
          <input
            id="addfile"
            type="file"
            onChange={(e) => onChooseFile(e)}
            className="hidden"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={onUpload}
            className="w-fit mt-3 hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] cursor-pointer dark:bg-neutral-800 bg-slate-300 rounded-md flex justify-center items-center border dark:border-sky-500 p-2"
          >
            <span class="material-symbols-rounded">file_upload</span>
            Upload Image
          </button>
        </div>
        <div>{dataGbr.length === 0 ? "" : 
        <div>
            {dataGbr.map((item) =>(
                <div className="h-[150px] overflow-hidden">
                    {item.gambar}
                </div>
            ))}
        </div>
        }
        </div>
      </div>
    </div>
  );
};

export default Picture;
