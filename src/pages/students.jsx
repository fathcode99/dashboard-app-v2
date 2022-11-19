import React, { useEffect, useState } from "react";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import ExportExcelSiswa from "../component/exportExcelSiswa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Students = () => {
  const stateStudents = useSelector((state) => state.studentsReducer); 

  // default data
  const [dataMembers, setDataMembers] = useState(stateStudents.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateStudents.data);

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
    setDataMembers(stateStudents.data);
    setDataRenders(dataMembers);
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateStudents.data, dataMembers, rowPerPage]);

  //search /filter
  const onSearch = (e) => {
    let value = e.target.value;
    if (value) {
      const matchDatas = dataMembers.filter((item) => {
        return item.nama_pengajar.toLowerCase().includes(value.toLowerCase());
      });
      setDataRenders(matchDatas);
    } else if (!value) {
      setDataRenders(dataMembers);
    }
  };

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] md:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2'>
        <Navbar />
        <div className="main-title">Data Students</div>
        <div>
          <div className="flex flex-col dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            {/* search data */}
            <div className="flex justify-between items-center">
              <div className="flex mb-3">
                <input
                  onChange={(e) => onSearch(e)}
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent w-full ml-2 dark:text-white  text-sm border-b border-sky-500"
                />
              </div>

              <div className="flex mb-3 items-center">
                <span className="dark:text-white mr-2">Export to Excel:</span>
                <ExportExcelSiswa data={dataMembers} />
              </div>
            </div>

            <table className="table-auto w-full">
              <thead className="h-8">
                <tr className="text-sm text-white  dark:bg-sky-500 bg-slate-900 h-full">
                  <th className="font-medium ">No.</th>
                  <th className="font-medium ">ID</th>
                  <th className="font-medium flex items-center h-8 justify-between w-fit">
                    
                    Nama Ortu
                  </th>
                  <th className="font-medium hidden md:table-cell">
                    Nama Siswa
                  </th>
                  <th className="font-medium">Kelas</th>
                  {/* <th className="hidden md:table-cell font-medium">Kurikulum</th> */}
                  {/* <th className="hidden md:table-cell font-medium">Alamat</th>  */}
                  {/* <th className="hidden md:table-cell font-medium">Kota</th> */}
                  <th className="hidden md:table-cell font-medium">Mapel</th>
                  {/* <th className="hidden md:table-cell font-medium">Email</th>  */}
                  <th className="hidden md:table-cell font-medium">Jadwal</th>
                  <th className="hidden md:table-cell font-medium">Waktu</th>
                  <th className="hidden md:table-cell font-medium">
                    Jenis Bimble
                  </th>
                  {/* <th className="hidden md:table-cell font-medium"> Gender Tentor </th> */}
                  {/* <th className="hidden md:table-cell font-medium">Program</th>  */}
                  <th className="hidden md:table-cell font-medium">
                    Status Siswa
                  </th>
                  {/* <th className="hidden md:table-cell font-medium">Regional</th>  */}
                  {/* <th className="hidden md:table-cell font-medium">Status Pendaftaran</th>  */}
                  <th className="font-medium">Action</th>
                </tr>
              </thead>

              {dataMembers.length === 0 ? (
                <tbody>
                  <tr className="text-white  w-full">
                    <td style={{ colSpan: "8" }}>No Data Found</td>
                  </tr>
                </tbody>
              ) : (
                sliceTable.map((item, index) => {
                  return (
                    <tbody key={index} className="dark:text-white  text-sm">
                      <tr
                        className={
                          index % 2 === 0
                            ? " bg-white h-8"
                            : " bg-slate-200 h-8"
                        }
                      >
                        <td className="text-center">{nomer++}</td>
                        <td>{item.id_siswa}</td>

                        <td className="table-cell">
                          {item.nama_orangtua}
                        </td>
                        <td className="table-cell">
                          {item.nama_siswa}
                        </td>
                        <td className="text-center">{item.kelas}</td> 
                        <td className="text-center">{item.mapel}</td>
                        <td className="text-center">{item.jadwal_les}</td>
                        <td className="text-center">{item.jam_mulai_les}</td>
                        <td className="text-center">{item.jenis_bimble}</td>
                        <td
                          className={
                            item.status === "Active"
                              ? "text-lime-600 text-center"
                              : "text-rose-600 text-center"
                          }
                        >
                          {item.status_siswa}
                        </td>
                        <td className="flex justify-center items-center h-8">
                          <Link to={`/students/${item.id}`}>
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
                className="text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-l-md px-2"
              >
                Prev
              </button>
              <button
                onClick={onNext}
                disabled={page === maxPage ? true : false}
                className="text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-r-md px-2"
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

export default Students;
