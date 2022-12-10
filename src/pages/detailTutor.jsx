import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://admin.menujudigital.com/api";

const DetailTutor = () => {
  let token = localStorage.getItem("token");
  const { id } = useParams();

  const [dataTutor, setDataTutor] = useState({}); 
  const [isEdit, setIsEdit] = useState(false); 
  const [filterDataBiaya, setFilterDataBiaya] =  useState([])

  const [isModalMessage, setIsModalMessage] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);

  // edit data tutor
  const [namaPengajar, setNamaPengajar] = useState(dataTutor.nama_pengajar);
  const [idPengajar, setIdPengajar] = useState(dataTutor.id_pengajar);
  const [email, setEmail] = useState(dataTutor.email);
  const [asalKampus, setAsalKampus] = useState(dataTutor.asal_kampus);
  const [mapel, setMapel] = useState(dataTutor.mapel);
  const [telp, setTelp] = useState(dataTutor.no_telp);
  const [namaBank, setNamaBank] = useState(dataTutor.nama_bank);
  const [rekBank, setRekBank] = useState(dataTutor.rek_bank);
  const [anBank, setAnBank] = useState(dataTutor.an_rek_bank);

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    async function getDataPengajar() {
      try {
        await axios
        .get(`${url}/datapengajar/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setDataTutor(res.data);
        });
      } catch (err) {
        console.log("Error when fetching data - Pengajar")
      }
    }
    getDataPengajar()
    
    async function getBiaya() {
      try {
        await axios
        .get(`${url}/biaya`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => { 
          let filter = res.data.filter((data) => data.id_pengajar === id); 
          setFilterDataBiaya(filter)
          // console.log(filter)
        });
      } catch (err) {
        console.log("Error when fetching data - Biaya");
      }
    }
    getBiaya()
    
  }, [id, token, navigate]);

  //menghitung total fee
  let totalFee = 0;
  for (let i = 0; i < filterDataBiaya.length; i++) {
    totalFee += +filterDataBiaya[i].fee_pengajar;
  }

  const onDone = async () => {
    let updateData = {
      nama_pengajar: namaPengajar,
      id_pengajar: idPengajar,
      email: email,
      asal_kampus: asalKampus,
      mapel: mapel,
      no_telp: telp,
      nama_bank: namaBank,
      rek_bank: rekBank,
      an_rek_bank: anBank,
    };
    // console.log(updateData);
    await axios
      .put(`${url}/datapengajar/${id}/update`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/datapengajar/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataTutor(res.data);
          });
      });
    setIsEdit(!isEdit);
  };

  // modal message
  let defaultMessage = "Anda mendapatkan siswa bernama ...";
  let refMessage = useRef();
  const closeModal = () => {
    setIsModalMessage(false);
  };

  const onMessage = async () => {
    let messageNotif = refMessage.current.value;

    // let message = {
    //   id_pengajar: 15,
    //   nama_pengajar: 1,
    //   pesan: messageNotif,
    // };
    let message = {
      id_pengajar: dataTutor.id,
      nama_pengajar: dataTutor.nama_pengajar,
      pesan: messageNotif,
    };
    await axios
      .post(`${url}/notifypengajar`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsModalMessage(false);
      });
  };

  // modal delete
  const onValidDeleteYes = async () => {
    await axios
      .delete(`${url}/datapengajar/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataTutor({});
        setIsModalDelete(false);
      });
  };


  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className="min-w-[50px] lg:w-[300px]">
        <Sidebar />
      </div>
      <div className="flex flex-col md:mb-8 md:mx-8 w-full m-2 relative">
        <Navbar />
        <div className="flex justify-between items-center my-2 py-1">
          <div className="main-title">Detail Data Pengajar</div>
          <div className="flex h-fit items-center font-normal">
            <button
              onClick={() => setIsModalMessage(!isModalMessage)}
              className="hover:bg-sky-500 py-1 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] cursor-pointer  bg-slate-300 rounded-md flex justify-center items-center border border-sky-900 px-2"
            >
              <span className="material-symbols-rounded mr-2 ">
                {" "}
                chat{" "}
              </span>
              <span>Send Message</span>
            </button>
          </div>
        </div>
        {dataTutor.nama_pengajar ? (
          <>
            <div className="grid grid-cols-1 md:flex gap-4">
              {/* data tutor */}
              {isEdit ? (
                <div className="flex flex-col w-full md:w=3/4 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex gap-3 relative">
                    <div className="flex flex-col w-full justify-center">
                      <input
                        onChange={(e) => setNamaPengajar(e.target.value)}
                        type="text"
                        defaultValue={dataTutor.nama_pengajar}
                        className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                      />

                      <div className=" text-sm flex">
                        <span className="dark:text-white mr-2">ID : </span>
                        <input
                          type="text"
                          onChange={(e) => setIdPengajar(e.target.value)}
                          defaultValue={dataTutor.id}
                          className="outline-none bg-transparent border border-sky-500 rounded-sm px-2 dark:text-white  text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={dataTutor.email}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Asal Kampus
                          </div>
                          <input
                            onChange={(e) => setAsalKampus(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.asal_kampus}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div>
                          <div className="w-full">
                            <div className="italic  text-sky-500 text-sm mt-3">
                              Mapel
                            </div>
                            <input
                              onChange={(e) => setMapel(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.mapel}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <input
                            onChange={(e) => setTelp(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.no_telp}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Nama Bank
                          </div>
                          <input
                            onChange={(e) => setNamaBank(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.nama_bank}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Rek Bank
                          </div>
                          <div>
                            <input
                              onChange={(e) => setRekBank(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.rek_bank}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                            <input
                              onChange={(e) => setAnBank(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.an_rek_bank}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* button editing */}
                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={onDone}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6"
                      >
                        <span className="material-symbols-rounded ">
                          {" "}
                          done{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsEdit(false)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded ">
                          {" "}
                          cancel{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                  <div className="flex gap-3 relative">
                    <div className="flex flex-col w-full justify-center">
                      <div className="dark:text-white font-medium text-xl">
                        {dataTutor.nama_pengajar}
                      </div>
                      <div className="dark:text-white  text-sm">
                        ID : {dataTutor.id}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataTutor.email}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Asal Kampus
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataTutor.asal_kampus}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Mapel
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataTutor.mapel}
                          </div>
                        </div>
                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataTutor.no_telp}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Nama Bank
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataTutor.nama_bank}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Rek Bank
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataTutor.rek_bank} <br /> {dataTutor.an_rek_bank}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* button edit data tutor */}
                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white ">
                          Edit
                        </span>
                      </button>
                      <button
                        onClick={() => setIsModalDelete(true)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white ">
                          {" "}
                          Delete{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* payment */}
              <div className="flex flex-col md:w-[50%] w-full bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className="dark:text-white  text-sm">
                  Total Fee
                </div>
                <div className="text-sky-500 h-full  text-right text-5xl md:text-3xl lg:text-5xl flex items-center justify-end">
                  Rp {totalFee.toLocaleString()}
                </div>
              </div>
            </div>

            {/* rincian kepengajaran */}
            <div className="flex flex-col mt-4 bg-white  rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between font-normal my-3">
                <div>Rincian Kepengajaran</div>
                {/* <button
                  onClick={() => setIsModalPost(true)}
                  className="hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2"
                >
                  Tambahkan Data
                </button> */}
              </div>

              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white  bg-slate-900 dark:bg-sky-500 h-full">
                    <th className="font-medium w-8">No.</th>
                    <th className="font-medium w-8 hidden md:table-cell">ID</th>
                    <th className="font-medium w-8 hidden md:table-cell">Tanggal</th>

                    <th className="font-medium w-36 px-2 flex items-center h-8 justify-between">
                      Nama Pengajar
                    </th>
                    <th className="font-medium w-20 hidden md:table-cell">
                      Lembur
                    </th>
                    <th className="font-medium md:table-cell">Fee Pengajar</th>
                    <th className="font-medium">Fotokopi</th>
                    <th className="font-medium hidden md:table-cell">
                      Realisasi Fee
                    </th>
                    {/* <th className="font-medium w-32 hidden md:table-cell">
                      Action
                    </th> */}
                  </tr>
                </thead>

                {filterDataBiaya.length === 0 ? (
                  <tbody>
                    <tr className="text-white  w-full">
                      <td></td>
                      <td></td>
                      <td>No Data Found</td>
                      <td></td>
                    </tr>
                  </tbody>
                ) : (
                  filterDataBiaya.map((item, index) => {
                    return (
                      <tbody
                        key={index}
                        className="dark:text-white  text-sm"
                      >
                        <tr
                          className={
                            index % 2 === 0
                              ? " bg-white h-8"
                              : " bg-slate-200 h-8"
                          }
                        >
                          <td className="text-center border-r dark:border-white">
                            {index + 1}
                          </td>
                          
                          <td className="text-center border-r dark:border-white hidden md:table-cell">
                            {item.id_pengajar}
                          </td>
                          <td className="whitespace-nowrap border-r px-2">
                              {item.created_at.slice(0, 10)}
                          </td>
                          <td className="border-r dark:border-white px-2">
                            {item.nama_pengajar}
                          </td>
                          <td className="text-center border-r dark:border-white hidden md:table-cell">
                            {item.durasi_lembur} jam
                          </td>
                          <td className="text-center border-r dark:border-white">
                            
                            Rp {item.fee_pengajar}
                          </td>
                          <td className="text-center border-r dark:border-white">
                            Rp {item.biaya_fotokopi}
                          </td>
                          <td className="text-center border-r dark:border-white hidden md:table-cell"> 
                            Rp {item.realisasi_fee_pengajar}
                          </td> 
                        </tr>
                      </tbody>
                    );
                  })
                )}
              </table>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full m-2 text-sky-500 italic ">
            Data Empty
            <Link to="/tutors">
              <button className="text-white hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2">
                <span>Back to Tutors Page</span>
              </button>
            </Link>
          </div>
        )}

        {/* modal message */}
        {isModalMessage ? (
          <div className="absolute backdrop-blur-sm w-full h-full bg-transparent bg-opacity-20 flex justify-center items-center">
            <div className="flex flex-col w-[75%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3">
              <div className="flex justify-between">
                <div className="dark:text-white">Send Message</div>
                <button onClick={closeModal}>
                  <span className="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div>

              <textarea
                ref={refMessage}
                type="text"
                className=" break-words dark:text-white  text-sm rounded-md p-2 bg-transparent outline-none border dark:border-sky-500 border-slate-900 "
                defaultValue={defaultMessage}
              />

              <button
                onClick={onMessage}
                className="hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-2 w-fit mt-2"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* modal delete */}
        {isModalDelete ? (
          <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
            <div className="flex flex-col w-[45%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center">
              <div className="flex justify-between">
                <div className=" text-rose-500">Delete Data</div>
              </div>
              <div className="flex justify-between">
                <div className="dark:text-white  text-sm">
                  Are you sure ?
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onValidDeleteYes}
                  className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 rounded-md px-2 w-fit mt-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsModalDelete(false)}
                  className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 rounded-md px-2 w-fit mt-2"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        
      </div>
    </div>
  );
};

export default DetailTutor;
