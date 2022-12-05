import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar"; 

const Catatan = () => {
  const [dataTeks, setDataTeks] = useState([]);

  let teks = localStorage.getItem("note");

  useEffect(() => {
    setDataTeks(teks)
  }, [teks]);

  // upload teks id 1
  const noteRef = useRef()
  const onSave = () => {
    let catatan = noteRef.current.value 
    localStorage.setItem('note', catatan)
  }

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className="min-w-[50px] lg:w-[300px]">
        <Sidebar />
      </div>
      <div className="flex flex-col md:mb-8 md:mx-8 w-full m-2 relative">
        <Navbar />
        <div className="main-title"> Catatan </div> 
        <textarea name="note" id="note" ref={noteRef} defaultValue={dataTeks}  rows="5" className="p-3 w-full" />
        <button
            onClick={onSave}
            className="hover:bg-slate-200 mt-3 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
        >Save</button>
      </div>
    </div>
  );
};

export default Catatan;
