import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import ExportExcel from "../component/exportExcel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const url = "https://admin.menujudigital.com/api";

const Tutors = () => {
  const stateBiaya = useSelector((state) => state.biayaReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");

  // default data
  const [dataBiaya, setDataBiaya] = useState(stateBiaya.data);

  // data renders
  const [dataRenders, setDataRenders] = useState(stateBiaya.data);

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
    setDataBiaya(stateBiaya.data);
    setDataRenders(dataBiaya);
    setMaxPage(Math.ceil(dataRenders.length / rowPerPage));

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateBiaya.data, dataBiaya, rowPerPage]);

  //search /filter
  const onSearch = (e) => {
    let value = e.target.value;
    if (value) {
      const matchDatas = dataBiaya.filter((item) => {
        return (
          item.nama_pengajar.toLowerCase().includes(value.toLowerCase())
        );
      });
      setDataRenders(matchDatas);
    } else if (!value) {
      setDataRenders(dataBiaya);
    }
  };

  // proteksi login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // menghapus data pembiayaan
  
  const onDelete = (id) => {
    console.log(id);
    axios
      .delete(`${url}/biaya/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
      });
  };


  // edit data realisasi
  const [isIndexEdit, setIsIndexEdit] = useState()
  let refEditRealisasi = useRef();
  const onEditDataRincian = (id) => {
    let dataEdit = refEditRealisasi.current.value;
    axios
      .put(
        `${url}/biaya/${id}/update`,
        { realisasi_fee_pengajar: dataEdit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
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
            setDataBiaya(res.data);
          });
      });
    setIsIndexEdit(null);
    setDataBiaya(dataBiaya);
  };

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] md:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2'>
        <Navbar />
        <div className="main-title">
          Data Keuangan Pengajar
        </div>
        <div >
          <div className="flex flex-col dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            {/* search data */}
            <div className="flex justify-between items-center">
              <div className="flex mb-3">
                <input
                  onChange={(e) => onSearch(e)}
                  type="text"
                  placeholder="Search..."
                  className="outline-none bg-transparent w-full ml-2 font-thin text-sm border-b border-sky-500"
                />
              </div>

              <div className="flex mb-3 items-center">
                <span className="dark:text-white mr-2">Export to Excel:</span>
                <ExportExcel data={dataBiaya} />
              </div>
            </div>

            <table className="w-full">
              <thead className="h-8">
                <tr className="text-sm text-white font-thin bg-slate-900 h-full">
                  <th className="font-medium border-r w-8">No.</th>
                  <th className="font-medium border-r w-8 cursor-pointer">
                    ID
                  </th>
                  <th className="font-medium flex items-center h-8 justify-center border-r cursor-pointer">
                    Nama Pengajar
                  </th>
                  <th className="font-medium border-r cursor-pointer">
                    Fee Pengajar
                  </th>
                  <th className="font-medium border-r cursor-pointer">
                    Realisasi FP
                  </th>
                  <th className="font-medium border-r cursor-pointer">
                    Biaya Fotocopy
                  </th>
                  <th className="font-medium">Action</th>
                </tr>
              </thead>

              {dataBiaya.length === 0 ? (
                <tbody>
                  <tr className="dark:text-white font-thin w-full">
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
                      className="dark:text-white font-thin text-sm "
                    >
                      <tr
                        className={
                          index % 2 === 0
                            ? " bg-white h-8"
                            : " bg-slate-200 h-8"
                        }
                      >
                        <td className="text-center border-r">{nomer++}</td>

                        {/* <td className="border-r px-2">{item.id_pengajar}</td> */}
                        <td className="border-r px-2">{item.created_at}</td>
                        <td className="border-r px-2">{item.nama_pengajar}</td>
                        <td className="border-r px-2 text-right">
                          Rp {item.fee_pengajar}{" "}
                        </td>
                        <td className="border-r px-2 text-right">
                        {isIndexEdit === index ? (
                              <>
                                <input
                                  ref={refEditRealisasi}
                                  type="text"
                                  defaultValue={item.realisasi_fee_pengajar}
                                  className="w-20 break-words text-center dark:text-white font-thin text-sm px-2 bg-transparent outline-none border-b dark:border-sky-500 border-slate-900 "
                                />
                              </>
                            ) : (
                              <div> Rp {item.realisasi_fee_pengajar}
                              </div>
                            )}
                        </td>
                        <td className="border-r px-2 text-right">
                          Rp {item.biaya_fotokopi}{" "}
                        </td>
                        <td className="flex justify-center items-center h-8 ">
                        {isIndexEdit === index ? (
                              <button
                                onClick={() => onEditDataRincian(item.id)}
                                className="dark:text-white dark:bg-neutral-800 bg-slate-200 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2"
                              >
                                Done
                              </button>
                            ) : (
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => setIsIndexEdit(index)}
                                  className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                                >
                                  {" "}
                                  Edit
                                </button>
                                <button
                                  onClick={() => onDelete(item.id)}
                                  className="hover:bg-slate-200 transition duration-300 bg-rose-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                                >
                                  {" "}
                                  Delete
                                </button>
                              </div>
                            )}
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