import React, { useEffect, useState } from "react";
// import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import ExportExcelTutor from "../component/exportExcelTutor";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const Tutors = () => {
  const stateTutors = useSelector((state) => state.tutorsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // default data
  const [dataMembers, setDataMembers] = useState(stateTutors.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateTutors.data);

  const onSearch = (e) => {
      let value = e.target.value
      if(value) {
        const matchDatas = dataMembers.filter((item) => {
          return item.nama_pengajar.toLowerCase().includes(value.toLowerCase()) ||
          item.no_telp.toLowerCase().includes(value.toLowerCase())
        })
        setDataRenders(matchDatas)
      } else if(!value) {
        setDataRenders(dataMembers)
      }
  }

  // pagination
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  let [nomer, setNomer] = useState(1);

  let rowPerPage = 20;
  let startRow = (page - 1) * rowPerPage;
  let sliceTable = dataRenders.slice(startRow, startRow + rowPerPage);

  const onNext = () => {
    setPage(page + 1);
    setNomer(rowPerPage * page + 1);
  };
  const onPrev = () => {
    setPage(page - 1);
    setNomer(1 + rowPerPage * (page - 2));
  };

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

    setDataMembers(stateTutors.data);
    setDataRenders(dataMembers);
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTutors.data, dataMembers, rowPerPage,]);

  // proteksi login
  useEffect(() => {
    const tokenId = localStorage.getItem("token");
    if (!tokenId) {
      navigate("/login");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] lg:w-[300px]'>
        <Sidebar />
      </div>
      <div className="className='flex flex-col md:mb-8 md:mx-8 w-full m-2">
        <Navbar />
        <div className="main-title">
          Data Tutors
        </div>
        <div>
          <div className="flex flex-col dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            
            {/* search data */}
            <div className="flex justify-between items-center"> 
              <div className="flex mb-3">
                <input
                  onChange={(e) => onSearch(e)}
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent w-full ml-2  text-sm border-b border-sky-500"
                />
              </div>

              <div className="flex mb-3 items-center">
                <span className=" mr-2">Export to Excel:</span>
                <ExportExcelTutor data={dataMembers} />
              </div>
            </div>

            {/* TABLE START */}
            <table className="w-full">
              <thead className="h-8">
                <tr className="text-sm text-white  dark:bg-sky-500 bg-slate-900 h-full">
                  <th className="font-medium w-8 border-r">No.</th>
                  <th className="font-medium w-8 border-r">ID</th>
                  <th className="font-medium w-36 border-r"> Nama </th>
                  <th className="font-medium hidden md:table-cell cursor-pointer border-r"> Mapel </th>
                  <th className="font-medium hidden md:table-cell cursor-pointer border-r"> Asal Kampus </th>
                  <th className="font-medium cursor-pointer border-r">Telp</th>
                  <th className="font-medium hidden md:table-cell w-56 cursor-pointer border-r">Email</th>
                  <th className="font-medium w-20 border-r">Action</th>
                </tr>
              </thead>

              {dataMembers.length === 0 ? (
                <tbody>
                  <tr className="dark:text-white  w-full">
                    <td style={{ colSpan: "8" }}>No Data Found</td>
                  </tr>
                </tbody>
              ) : (
                sliceTable
                  .sort((a, b) => (a.nama_pengajar > b.nama_pengajar ? 1 : -1))
                  .map((item, index) => {
                    return (
                      <tbody
                        key={index}
                        className="dark:text-white  text-sm "
                      >
                        <tr
                          className={
                            index % 2 === 0
                              ? " bg-slate-200 h-8"
                              : " bg-white h-8"
                          }
                        >
                          <td className="text-center border-r">{nomer++}</td>
                          <td className="text-center border-r">
                            {item.id_pengajar}
                          </td>

                          <td className="border-r px-2">
                            {item.nama_pengajar}
                          </td>
                          <td className="hidden md:table-cell border-r px-2 uppercase">
                            {item.mapel}
                          </td>
                          <td className="hidden md:table-cell border-r px-2">
                            {item.asal_kampus}
                          </td>
                          <td className="border-r text-center">
                            {item.no_telp}
                          </td>
                          <td className="border-r text-center hidden md:table-cell">{item.email}</td>
                          <td className="flex justify-center items-center h-8 ">
                            <Link to={`/tutors/${item.id}`}>
                              <button className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2">
                                View
                              </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
              )}
            </table>
            <div className="flex justify-end my-4">
              <button
                onClick={onPrev}
                disabled={page === 1 ? true : false}
                className="dark:text-white bg-slate-200 dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-l-md px-2"
              >
                Prev
              </button>
              <button
                onClick={onNext}
                disabled={page === maxPage ? true : false}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-r-md px-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutors;
