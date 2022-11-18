import React, { useState } from "react";
import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import ExportExcel from "../component/exportExcel";
import axios from "axios";

const url = "https://admin.menujudigital.com/api";

const Home = () => {
  const stateBiaya = useSelector((state) => state.biayaReducer);

  let token = localStorage.getItem("token");

  const [data, setData] = useState([]); 

  const [totalBiaya, setTotalBiaya] = useState([]);
  const [dataRealisasi, setDataRealisasi] = useState([]);
  const [dataPengeluaran, setDataPengeluaran] = useState([]);

  // add pengeluaran
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [halPengeluaran, setHalPengeluaran] = useState("");
  const [nomPengeluaran, setNomPengeluaran] = useState(null);

  const onAddPengeluaran = () => {
    let dataAdd = {
      hal: halPengeluaran,
      nominal: nomPengeluaran,
    };
    axios
      .post(`${url}/pengeluaran`, dataAdd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/pengeluaran`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataPengeluaran(res.data);
          });
      });
    setIsModalAdd(false);
  };

  const navigate = useNavigate();

  // loop data for total : totalbiaya, pengeluaran, realisasi
  const [totalNomPengeluaran, setNomTotalPengeluaran] = useState(0);
  const [totalNomTotalBiaya, setNomTotalBiaya] = useState(0);
  const [totalNomTotalRealisasi, setNomTotalRealisasi] = useState(0);

  useEffect(() => {
    let t = 0;
    for (let i = 0; i < totalBiaya.length; i++) {
      t += +totalBiaya[i].nominal;
    }
    setNomTotalBiaya(t);

    let n = 0;
    for (let i = 0; i < dataPengeluaran.length; i++) {
      n += +dataPengeluaran[i].nominal;
    }
    setNomTotalPengeluaran(n);

    let c = 0;
    for (let i = 0; i < dataRealisasi.length; i++) {
      c += +dataRealisasi[i].nominal;
    }
    setNomTotalRealisasi(c);

  }, [totalBiaya, dataRealisasi, dataPengeluaran, data]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    setData(stateBiaya.data);

    // get detail data
    axios
      .get(`${url}/pengeluaran`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataPengeluaran(res.data);
      });

    axios
      .get(`${url}/realisasi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataRealisasi(res.data);
      });

    axios
      .get(`${url}/totalbiaya`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotalBiaya(res.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateBiaya]);

  //delete pengeluaran
  const onDeletePengeluaran = (id) => {
    axios
      .delete(`${url}/pengeluaran/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/pengeluaran`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataPengeluaran(res.data);
          });
      });
  };

  //edit data pengeluaran
  const [indexEdit, setIndexEdit] = useState(null);
  const [editNominal, setEditNominal] = useState();
  const [editHal, setEditHal] = useState();

  const onEditBtn = (id, hal, nominal) => {
    setIndexEdit(id);
    setEditHal(hal);
    setEditNominal(nominal);
  };

  //edit pengeluaran
  let updateData = {
    hal: editHal,
    nominal: editNominal,
  };
  const onEditPengeluaran = (id) => {
    axios
      .put(`${url}/pengeluaran/${id}/update`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/pengeluaran`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataPengeluaran(res.data);
          });
      });
    setIndexEdit(null);
  };

  //update total biaya
  const onUpdateTotalBiaya = () => {
    let fp = 0;
    for (let i = 0; i < data.length; i++) {
      fp += +data[i].fee_pengajar;
    }

    let ts = 0;
    for (let i = 0; i < data.length; i++) {
      ts += +data[i].tagihan_siswa;
    }

    let bp = 0;
    for (let i = 0; i < data.length; i++) {
      bp += +data[i].biaya_pendaftaran;
    }

    let ftcp = 0;
    for (let i = 0; i < data.length; i++) {
      ftcp += +data[i].biaya_fotokopi
    }

    let dataUpdateFp = {
      hal: "Fee Pengajar",
      nominal: fp,
    };

    let dataUpdateTs = {
      hal: "Tagihan Siswa",
      nominal: ts,
    };

    let dataUpdateBp = {
      hal: "Biaya Pendaftaran",
      nominal: bp,
    };

    let dataUpdateFtcp = {
      hal: "Biaya Fotokopi",
      nominal: ftcp,
    };

    axios
      .put(`${url}/totalbiaya/20/update`, dataUpdateFp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/totalbiaya`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setTotalBiaya(res.data)
          });
      });

    axios.put(`${url}/totalbiaya/21/update`, dataUpdateBp, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    axios.put(`${url}/totalbiaya/22/update`, dataUpdateTs, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    axios.put(`${url}/totalbiaya/23/update`, dataUpdateFtcp, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //update total realisasi
  const onUpdateRealisasi = () => {
    

    let rfp = 0;
    for (let i = 0; i < data.length; i++) {
      rfp += +data[i].realisasi_fee_pengajar;
    }

    let rts = 0;
    for (let i = 0; i < data.length; i++) {
      rts += +data[i].realisasi_tagihan_siswa;
    }

    let rbp = 0;
    for (let i = 0; i < data.length; i++) {
      rbp += +data[i].realisasi_biaya_pendaftaran;
    }

    let dataUpdateRfp = {
      hal: "Fee Pengajar",
      nominal: rfp,
    };

    let dataUpdateRts = {
      hal: "Tagihan Siswa",
      nominal: rts,
    };

    let dataUpdateRbp = {
      hal: "Biaya Pendaftaran",
      nominal: rbp,
    };

    axios
      .put(`${url}/realisasi/1/update`, dataUpdateRfp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/realisasi`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataRealisasi(res.data); 
          });
      });

      axios
      .put(`${url}/realisasi/2/update`, dataUpdateRts, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      axios
      .put(`${url}/realisasi/3/update`, dataUpdateRbp, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('update realisasi');
  }
  return (
    <div>
      <div className="flex bg-slate-200 min-h-screen">
        <div className="min-w-[50px] md:w-[300px]">
          <Sidebar />
        </div>
        <div className="flex flex-col md:mb-8 md:mx-8 w-full m-2 relative">
          <Navbar />
          <div className="main-title">Laporan Keuangan</div>
          <div>
            {/* widget */}
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 font-normal">
              <div className="flex flex-col bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className=" mb-6 font-thin text-sm">Total Biaya</div>
                <div className=" font-thin text-2xl flex justify-between items-baseline">
                  <span>Rp {totalNomTotalBiaya.toLocaleString()}</span>
                  <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
                    <span className="material-symbols-rounded  text-lg font-thin ">
                      add_shopping_cart
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className=" mb-6 font-thin text-sm">Realisasi</div>
                <div className=" font-thin text-2xl flex justify-between items-baseline">
                  <span>Rp {totalNomTotalRealisasi.toLocaleString()}</span>
                  <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
                    <span className="material-symbols-rounded  text-lg font-thin ">
                      add_shopping_cart
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className=" mb-6 font-thin text-sm">Selisih</div>
                <div className=" font-thin text-2xl flex justify-between items-baseline">
                  <span>
                    Rp{" "}
                    {(
                      totalNomTotalBiaya - totalNomTotalRealisasi
                    ).toLocaleString()}
                  </span>
                  <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
                    <span className="material-symbols-rounded  text-lg font-thin ">
                      add_shopping_cart
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className=" mb-6 font-thin text-sm">Pengeluaran</div>
                <div className=" font-thin text-2xl flex justify-between items-baseline">
                  <span>Rp {totalNomPengeluaran.toLocaleString()} </span>
                  <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
                    <span className="material-symbols-rounded  text-lg font-thin ">
                      add_shopping_cart
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="w-full bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] ">
              <div className="flex justify-between items-center mb-2">
                <div>Total Biaya</div>
                <div className="flex gap-2">
                  <button
                    onClick={onUpdateTotalBiaya}
                    className="hover:text-sky-500 cursor-pointer flex justify-center items-center"
                    title="Update total biaya"
                  > 
                    <span className="material-symbols-rounded"> update </span>
                  </button>
                  <button className="flex items-center" title="Export to Excel">
                    <ExportExcel data={totalBiaya} />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white font-thin bg-slate-900 h-full">
                    <th className="font-medium border-r w-8">No.</th>
                    <th className="font-medium border-r">Update</th>
                    <th className="font-medium border-r">Keterangan</th>
                    <th className="font-medium border-r">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {totalBiaya.length === 0 ? (
                    <tr style={{ colspan: 7 }}>
                      <td>Data Empty</td>
                    </tr>
                  ) : (
                    totalBiaya.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-slate-200"
                        }
                      >
                        <td className="font-normal border-r text-center">
                          {index + 1}
                        </td>
                        <td className="font-normal border-r text-center">
                          {(item.updated_at).slice(0, 10)}
                        </td>
                        <td className="font-normal border-r px-2">
                          {item.hal}
                        </td>
                        <td className="font-normal border-r px-2 text-right">
                          Rp {parseInt(item.nominal).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* table data realisasi */}
            <div className=" bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] ">
              <div className="flex justify-between items-center mb-2">
                <div>Realisasi</div>
                <div className="flex gap-2">
                  <button
                    onClick={onUpdateRealisasi}
                    className="hover:text-sky-500 cursor-pointer flex justify-center items-center"
                    title="Update data realisasi"
                  >
                    <span className="material-symbols-rounded"> update </span>
                  </button>

                  <button className="flex items-center" title="Export to Excel">
                    <ExportExcel data={dataRealisasi} />
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white font-thin bg-slate-900 h-full">
                    <th className="font-medium border-r w-8">No.</th>
                    <th className="font-medium border-r">Update</th>
                    <th className="font-medium border-r">Keterangan</th>
                    <th className="font-medium border-r">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRealisasi.length === 0 ? (
                    <tr style={{ colspan: 7 }}>
                      <td>Data Empty</td>
                    </tr>
                  ) : (
                    dataRealisasi.map((item, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0 ? "bg-white" : "bg-slate-200"
                        }
                      >
                        <td className="font-normal border-r text-center">
                          {index + 1}
                        </td>
                        <td className="font-normal border-r text-center">
                          {(item.updated_at).slice(0, 10)}
                        </td>
                        <td className="font-normal border-r px-2 capitalize">
                          {item.hal}
                        </td>
                        <td className="font-normal border-r px-2 text-right">
                          Rp {parseInt(item.nominal).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 w-full bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] ">
            <div className="flex justify-between items-center mb-2">
              <div>Pengeluaran</div>
              <div className="flex gap-2"> 
                <button
                  onClick={() => setIsModalAdd(true)}
                  className="hover:text-sky-500 cursor-pointer flex justify-center items-center"
                  title="Tambah data pengeluaran"
                >
                  <span className="material-symbols-rounded"> note_add </span>
                </button>

                <button className="flex items-center" title="Export to Excel">
                  <ExportExcel data={dataPengeluaran} />
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead className="h-8">
                <tr className="text-sm text-white font-thin bg-slate-900 h-full">
                  <th className="font-medium border-r w-8">No.</th>
                  <th className="font-medium border-r">Keterangan</th>
                  <th className="font-medium border-r">Nominal</th>
                  <th className="font-medium border-r w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {dataPengeluaran.length === 0 ? (
                  <tr style={{ colspan: 7 }}>
                    <td>Data Empty</td>
                  </tr>
                ) : (
                  dataPengeluaran.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-slate-200"}
                    >
                      <td className="font-normal border-r text-center">
                        {index + 1}
                      </td>
                      <td className="font-normal border-r px-2 capitalize"> 
                          {item.hal} 
                      </td>
                      <td className="font-normal border-r px-2 text-right">
                        {indexEdit === item.id ? (
                          <div>
                            <input
                              className="w-full break-words bg-transparent outline-none border-b border-slate-900 "
                              onChange={(e) => setEditNominal(e.target.value)}
                              type="text"
                              defaultValue={item.nominal}
                            />
                          </div>
                        ) : (
                          <span>
                            Rp {parseInt(item.nominal).toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="flex gap-1 justify-center text-sm items-center">
                        {indexEdit === item.id ? (
                          <button
                            onClick={() => onEditPengeluaran(item.id)}
                            className="hover:text-sky-500 cursor-pointer flex justify-center items-center"
                          >
                            <span className="material-symbols-rounded text-center text-lg">
                              task_alt
                            </span>
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                onEditBtn(item.id, item.hal, item.nominal)
                              }
                              className="hover:text-sky-500 cursor-pointer flex justify-center items-center"
                            >
                              <span className="material-symbols-rounded text-center text-lg">
                                {" "}
                                edit_square{" "}
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                onDeletePengeluaran(item.id, item.hal)
                              }
                              className="hover:text-rose-500 cursor-pointer flex justify-center items-center"
                            >
                              <span className="material-symbols-rounded text-center text-lg">
                                {" "}
                                delete{" "}
                              </span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* modal post data */}
          {isModalAdd ? (
            <div className="absolute backdrop-blur-sm w-full h-full bg-transparent bg-opacity-20 flex justify-center items-center">
              <div className="flex flex-col w-[75%] bg-slate-200 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                <div className="flex justify-between items-center bg-indigo-900 p-2">
                  <div className="text-white">Tambahkan data pengeluaran</div>
                  <button
                    className="flex items-center"
                    onClick={() => setIsModalAdd(false)}
                  >
                    <span className="hover:text-rose-500 text-white material-symbols-rounded ">
                      close
                    </span>
                  </button>
                </div>

                <div className="p-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <label>Keterangan</label>
                      <input
                        onChange={(e) => setHalPengeluaran(e.target.value)}
                        type="text"
                        placeholder="ex : Cetak banner"
                        className="px-2 py-1 rounded-md"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label>Nominal</label>
                      <input
                        onChange={(e) => setNomPengeluaran(e.target.value)}
                        type="text"
                        placeholder="ex: 125000"
                        className="px-2 py-1 rounded-md"
                      />
                    </div>
                  </div>

                  <button
                    onClick={onAddPengeluaran}
                    className="hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-2 w-fit mt-2"
                  >
                    Add Data
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
