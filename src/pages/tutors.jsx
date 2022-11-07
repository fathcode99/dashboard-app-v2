import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import ExportExcel from "../component/exportExcel";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const url = "https://admin.menujudigital.com/api/datapengajar";

const Tutors = () => {
  const stateTutors = useSelector((state) => state.tutorsReducer);
  const navigate = useNavigate()

  // default data
  const [dataMembers, setDataMembers] = useState(stateTutors.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateTutors.data);

  // button value
  const [sortName, setSortName] = useState(false);

  // value input
  let refFilterName = useRef();
  let refFilterMapel = useRef();

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
    setNomer(1 + rowPerPage * (page-2));
  };

  useEffect(() => {
    setDataMembers(stateTutors.data);
    setDataRenders(dataMembers);
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTutors.data, dataMembers, rowPerPage]);

  // filter
  const onFilter = () => {
    let valueFilterName = refFilterName.current.value;
    let valueFilterMapel = refFilterMapel.current.value;

    // 01. f f
    if (
      valueFilterName === "" &&
      valueFilterMapel === ""
    ) {
      setDataRenders(dataMembers);
      setMaxPage(Math.ceil(dataMembers.length / rowPerPage));
    }

    // 02. t f
    else if (
      valueFilterName &&
      valueFilterMapel === ""
    ) {
      const resultFilter = dataMembers.filter((dataMember) =>
        dataMember.nama_pengajar
          .toLowerCase()
          .includes(valueFilterName.toLowerCase())
      );
      setDataRenders(resultFilter);
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage));
    }

    // 03. f t
    else if (
      valueFilterName === "" &&
      valueFilterMapel
    ) {
      const resultFilter = dataMembers.filter((dataMember) =>
        dataMember.mapel
          .toLowerCase()
          .includes(valueFilterMapel.toLowerCase())
      );
      setDataRenders(resultFilter);
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage));
    }

    // 04. tt
    else if (
      valueFilterName &&
      valueFilterMapel
    ) {
      const filterName = dataMembers.filter((dataMember) =>
        dataMember.nama_pengajar
          .toLowerCase()
          .includes(valueFilterName.toLowerCase())
      );
      const resultFilter = filterName.filter((dataMember) =>
        dataMember.mapel
          .toLowerCase()
          .includes(valueFilterMapel.toLowerCase())
      );
      setDataRenders(resultFilter);
      setMaxPage(Math.ceil(resultFilter.length / rowPerPage));
    }

  };

  // reset filter
  const onResetFilter = () => {
    setDataRenders(dataMembers);
    setMaxPage(Math.ceil(dataMembers.length / rowPerPage));
  };

  // handle sort
  let token = localStorage.getItem("token");
  const handleSortName = async (e) => {
    if (sortName === false) {
      return await axios
        .get(`${url}?_sort=nama_pengajar&_order=asc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDataRenders(res.data);
          setSortName(!sortName);
        });
    } else {
      return await axios
        .get(`${url}?_sort=nama_pengajar&_order=desc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDataRenders(res.data);
          setSortName(!sortName);
        });
    }
  };

  // proteksi login 

  useEffect(() => {
    const tokenId = localStorage.getItem('token') 
    if (!tokenId) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen">
        <Navbar />
        <div className="dark:text-white font-bold text-xl m-2 ">
          Data Tutors
        </div>
        <div className="m-2">
          {/* filter table */}
          <div className="dark:text-white text-sm my-2">Filter Setting :</div>

          <div className="flex gap-1 md:gap-2 mb-3 flex-wrap w-full">
            <form className="dark:bg-neutral-800 rounded-md flex items-center border w-full md:w-1/3 border-slate-800 dark:border-sky-500 mb-2 h-8">
              <input
                ref={refFilterName}
                type="text"
                placeholder="By Name"
                className="outline-none bg-transparent w-full ml-2 dark:text-white font-thin text-sm"
              />
            </form>

            <form className="dark:bg-neutral-800 rounded-md flex items-center border w-full md:w-1/3 border-slate-800 dark:border-sky-500 mb-2 h-8">
              <input
                ref={refFilterMapel}
                type="text"
                placeholder="By Mapel"
                className="outline-none bg-transparent w-full ml-2 dark:text-white font-thin text-sm"
              />
            </form>

            
              <button
                onClick={onFilter}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-1"
              >
                <span className="material-symbols-rounded ">filter_alt</span>
              </button>
            
              <button
                onClick={onResetFilter}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-1"
              >
                <span className="material-symbols-rounded ">
                  filter_alt_off
                </span>
              </button>
            
          </div>

          <div className="flex flex-col dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center">
              <div className="dark:text-white text-sm mb-2">Data Results :</div>
              <div className="flex dark:text-white gap-2 text-sm justify-end items-center">
                <span>Export to Excel:</span>
                <ExportExcel data={dataMembers} />
              </div>
            </div>

            {/* TABLE START */}
            <table className="w-full">
              <thead className="h-8">
                <tr className="text-sm text-white font-thin dark:bg-sky-500 bg-slate-900 h-full">
                  <th className="font-medium w-8">No.</th>
                  <th className="font-medium w-8">ID</th>
                  <th className="font-medium w-36 flex items-center h-8 justify-center">
                    Nama
                    {/* sort button */}
                    <span
                      onClick={handleSortName}
                      className="material-symbols-rounded cursor-pointer text-white ml-2"
                    >
                      {sortName ? "expand_more" : "expand_less"}
                    </span>
                  </th> 
                  <th className="font-medium hidden md:table-cell"> Mapel</th>
                  <th className="font-medium hidden md:table-cell"> Asal Kampus </th>
                  <th className="font-medium">Telp</th>
                  <th className="font-medium w-56">Email</th>
                  <th className="font-medium w-20">Action</th>
                </tr>
              </thead>

              {dataMembers.length === 0 ? (
                <tbody>
                  <tr className="dark:text-white font-thin w-full">
                    <td style={{ colSpan: "8" }}>No Data Found</td>
                  </tr>
                </tbody>
              ) : (
                sliceTable.map((item, index) => {
                  return (
                    <tbody
                      key={index}
                      className="dark:text-white font-thin text-sm "
                    >
                      <tr
                        className={
                          index % 2 === 0
                            ? "dark:bg-neutral-800 bg-slate-200 h-8"
                            : "dark:bg-neutral-900 bg-slate-300 h-8"
                        }
                      >
                        <td className="text-center border-r">{nomer++}</td>
                        <td className="text-center border-r">{item.id_pengajar}</td>

                        <td className="border-r px-2">{item.nama_pengajar}</td>
                        <td className="hidden md:table-cell border-r px-2 uppercase">
                          {item.mapel}
                        </td>
                        <td className="hidden md:table-cell border-r px-2">
                          {item.asal_kampus}
                        </td>
                        <td className="border-r text-center">
                          {item.no_telp}
                        </td>
                        <td className="border-r text-center">
                          {item.email}
                        </td>
                        <td className="flex justify-center items-center h-8 ">
                          <Link to={`/tutors/${item.id}`}>
                            <button className="dark:text-white dark:bg-neutral-800 bg-slate-200 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2">
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
