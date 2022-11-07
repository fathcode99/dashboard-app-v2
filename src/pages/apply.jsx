import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import ExportExcel from "../component/exportExcel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const Tutors = () => {
  const stateTutors = useSelector((state) => state.applyReducer);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // default data
  const [dataMembers, setDataMembers] = useState(stateTutors.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateTutors.data);

  // button value
  const [statusActive, setStatusActive] = useState(false);
  const [statusInactive, setStatusInactive] = useState(false); 

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
      setDataRenders(dataMembers);
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
      setDataRenders(dataMembers);
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
      setDataRenders(dataMembers);
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
    if (statusActive) {
      setStatusActive(!statusActive);
    } else if (statusInactive) {
      setStatusInactive(!statusInactive);
    }
  };

  // short table
  function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  // proteksi login 
  useEffect(() => {
    const tokenId = localStorage.getItem('token') 
    if (!tokenId) {
      navigate('/login')
    }
  }, [navigate])

  // menghapus data apply
  let token = localStorage.getItem("token");
  const deleteApply = (id) => {
    axios
      .delete(`${url}/apply/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios.get(`${url}/apply`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          dispatch({
            type : 'GET_DATA_APPLY',
            payload : res.data
          })
        })
      });
  }

  

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen">
        <Navbar />
        <div className="dark:text-white font-bold text-xl m-2 ">
         Data Apply
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

            <div>
              <button
                onClick={onFilter}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-1"
              >
                <span className="material-symbols-rounded ">filter_alt</span>
              </button>
            </div>
            <div>
              <button
                onClick={onResetFilter}
                className="dark:text-white dark:bg-neutral-800 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-1"
              >
                <span className="material-symbols-rounded ">
                  filter_alt_off
                </span>
              </button>
            </div>
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
            <table className="w-full" id="myTable">
              <thead className="h-8">
                <tr className="text-sm text-white font-thin dark:bg-sky-500 bg-slate-900 h-full">
                  <th className="font-medium w-8 cursor-pointer" onClick={()=> sortTable(0)}>No.</th>
                  <th className="font-medium w-8 cursor-pointer" onClick={()=> sortTable(1)}>ID</th>
                  <th className="font-medium flex items-center h-8 w-32 justify-center cursor-pointer" onClick={()=> sortTable(2)}>
                    Nama 
                  </th> 
                  <th className="font-medium cursor-pointer" onClick={()=> sortTable(3)}>Mapel</th>
                  <th className="font-medium hidden md:table-cell cursor-pointer" onClick={()=> sortTable(4)}>
                    Asal Kampus
                  </th>
                  <th className="font-medium cursor-pointer" onClick={()=> sortTable(5)}>Telp</th>
                  <th className="font-medium cursor-pointer" onClick={()=> sortTable(6)}>Email</th>
                  <th className="font-medium">Action</th>
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

                        <td className="border-r px-2 text-center">{item.id_pengajar}</td>
                        <td className="border-r px-2">{item.nama_pengajar}</td>
                        <td className="border-r px-2 uppercase">{item.mapel}</td>
                        <td className="border-r px-2 text-center">
                          {item.asal_kampus}
                        </td>
                        <td className="border-r text-center">
                          {item.no_telp}
                        </td>
                        <td className="border-r px-2">
                          {item.email}
                        </td>
                        <td className="flex justify-center items-center h-8 ">
                            <button 
                            onClick={() => deleteApply(item.id)}
                            className="dark:text-white dark:bg-neutral-800 bg-slate-200 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2">
                              Delete
                            </button> 
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
