import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://admin.menujudigital.com/api";

const DetailTutor = () => {
  let token = localStorage.getItem("token");
  const { id } = useParams();

  const [dataTutor, setDataTutor] = useState({});
  const [dataBiaya, setDataBiaya] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isIndexEdit, setIsIndexEdit] = useState(null);

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

  useEffect(() => {
    axios
      .get(`${url}/datapengajar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataTutor(res.data);
      });

    axios
      .get(`${url}/biaya`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataBiaya(res.data);
      });
  }, [id, token]);

  // filter data rincian
  let idTutor = dataTutor.id_pengajar;
  let filterDataBiaya;
  if (dataBiaya) {
    filterDataBiaya = dataBiaya.filter((data) => data.id_pengajar === idTutor);
  }

  //menghitung total fee
  let totalFee = 0;
  for (let i = 0; i < filterDataBiaya.length; i++) {
    totalFee += +filterDataBiaya[i].fee_pengajar;
  }

  const onDone = () => {
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
    console.log(updateData);
    axios
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

  //edit data rincian
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
            setDataBiaya(res.data);
          });
      });
    setIsIndexEdit(null);
    setDataBiaya(dataBiaya);
  };

  // modal message
  let defaultMessage = "Anda mendapatkan siswa bernama ...";
  let refMessage = useRef();
  const closeModal = () => {
    setIsModalMessage(false);
  };

  const onMessage = () => {
    let messageNotif = refMessage.current.value;

    let message = {
      id_pengajar: dataTutor.id_pengajar,
      nama_pengajar: dataTutor.nama_pengajar,
      pesan: messageNotif,
    };
    axios
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
  const onValidDeleteYes = () => {
    axios
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

  // DELETE RINCIAN
  // delete data biaya / rincian
  const [idRincian, setIdRincian] = useState("");
  const [isModalDeleteRincian, setIsModalDeleteRincian] = useState(false);
  const onDeleteRincian = (id) => {
    setIdRincian(id);
    setIsModalDeleteRincian(true);
  };

  // modal delete biaya / rincian
  const onValidDeleteRincian = () => {
    axios
      .delete(`${url}/biaya/${idRincian}/delete`, {
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
            setDataBiaya(res.data);
          });
      });
    setIsModalDeleteRincian(false);
  };

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen relative">
        <Navbar />
        <div className="flex justify-between m-2 py-1">
          <div className="dark:text-white font-bold text-xl">
            Detail Data Tutor
          </div>
          <div className="flex dark:text-white font-thin">
            <button
              onClick={() => setIsModalMessage(!isModalMessage)}
              className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] cursor-pointer dark:bg-neutral-800 bg-slate-300 rounded-md flex justify-center items-center border dark:border-sky-500 px-2"
            >
              <span className="material-symbols-rounded mr-2 font-thin">
                {" "}
                chat{" "}
              </span>
              <span>Send Message</span>
            </button>
          </div>
        </div>
        {dataTutor.nama_pengajar ? (
          <>
            <div className="grid grid-cols-1 md:flex gap-4 m-2">
              {/* data tutor */}
              {isEdit ? (
                <div className="flex flex-col w-full md:w=3/4 dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex gap-3 relative">
                    <div className="w-1/3 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div>

                    <div className="flex flex-col w-full justify-center">
                      <input
                        onChange={(e) => setNamaPengajar(e.target.value)}
                        type="text"
                        defaultValue={dataTutor.nama_pengajar}
                        className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                      />

                      <div className="font-thin text-sm flex">
                        <span className="dark:text-white mr-2">ID : </span>
                        <input
                          type="text"
                          onChange={(e) => setIdPengajar(e.target.value)}
                          defaultValue={dataTutor.id_pengajar}
                          className="outline-none bg-transparent border border-sky-500 rounded-sm px-2 dark:text-white font-thin text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={dataTutor.email}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                          />
                        </div>

                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Asal Kampus
                          </div>
                          <input
                            onChange={(e) => setAsalKampus(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.asal_kampus}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                          />
                        </div>

                        <div>
                          <div className="w-full">
                            <div className="italic font-thin text-sky-500 text-sm mt-3">
                              Mapel
                            </div>
                            <input
                              onChange={(e) => setMapel(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.mapel}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <input
                            onChange={(e) => setTelp(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.no_telp}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Nama Bank
                          </div>
                          <input
                            onChange={(e) => setNamaBank(e.target.value)}
                            type="text"
                            defaultValue={dataTutor.nama_bank}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                          />
                        </div>

                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Rek Bank
                          </div>
                          <div>
                            <input
                              onChange={(e) => setRekBank(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.rek_bank}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
                            />
                            <input
                              onChange={(e) => setAnBank(e.target.value)}
                              type="text"
                              defaultValue={dataTutor.an_rek_bank}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white font-thin text-base"
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
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          done{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsEdit(false)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          cancel{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full  dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                  <div className="flex gap-3 relative">
                    <div className="w-1/3 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div>
                    <div className="flex flex-col w-full justify-center">
                      <div className="dark:text-white font-medium text-xl">
                        {dataTutor.nama_pengajar}
                      </div>
                      <div className="dark:text-white font-thin text-sm">
                        ID : {dataTutor.id_pengajar}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.email}
                          </div>
                        </div>

                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Asal Kampus
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.asal_kampus}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Mapel
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.mapel}
                          </div>
                        </div>
                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.no_telp}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Nama Bank
                          </div>
                          <div className="dark:text-white font-thin text-sm">
                            {dataTutor.nama_bank}
                          </div>
                        </div>

                        <div>
                          <div className="italic font-thin text-sky-500 text-sm mt-3">
                            Rek Bank
                          </div>
                          <div className={`dark:text-white font-thin text-sm`}>
                            {dataTutor.rek_bank} <br /> {dataTutor.an_rek_bank}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* button edit data tutor */}
                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          Edit
                        </span>
                      </button>
                      <button
                        onClick={() => setIsModalDelete(true)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white font-thin">
                          {" "}
                          Delete{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* payment */}
              <div className="flex flex-col justify-between md:w-[50%] w-full bg-slate-200 dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                <div className="dark:text-white font-thin text-sm">Payment</div>
                <div className="text-sky-500 font-thin text-right text-5xl md:text-3xl lg:text-5xl">
                  Rp {totalFee.toLocaleString()}
                </div>
                <p className="dark:text-white font-thin text-right text-sm">
                  Lorem ipsum dolor sit amet, <br /> consectetur adipisicing
                  elit.
                </p>
              </div>
            </div>

            {/* rincian kepengajaran */}
            <div className="flex flex-col m-2 bg-slate-200 dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
              <div className="dark:text-white font-thin text-sm my-3">
                Rincian Kepengajaran
              </div>

              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white font-thin bg-slate-900 dark:bg-sky-500 h-full">
                    <th className="font-medium w-8">No.</th>
                    <th className="font-medium w-8 hidden md:table-cell">ID</th>
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
                    <th className="font-medium w-32 hidden md:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>

                {filterDataBiaya.length === 0 ? (
                  <tbody>
                    <tr className="text-white font-thin w-full">
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
                        className="dark:text-white font-thin text-sm"
                      >
                        <tr
                          className={
                            index % 2 === 0
                              ? "dark:bg-neutral-800 bg-slate-200 h-8"
                              : "dark:bg-neutral-900 bg-slate-300 h-8"
                          }
                        >
                          <td className="text-center border-r dark:border-white">
                            {index + 1}
                          </td>
                          <td className="text-center border-r dark:border-white hidden md:table-cell">
                            {item.id_pengajar}
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
                              item.realisasi_fee_pengajar
                            )}
                          </td>
                          <td className="hidden justify-center items-center h-8 md:table-cell">
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
                                  className="dark:text-white dark:bg-neutral-800 bg-slate-200 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2"
                                >
                                  {" "}
                                  Edit
                                </button>
                                <button
                                  onClick={() => onDeleteRincian(item.id)}
                                  className="dark:text-white dark:bg-neutral-800 bg-slate-200 text-sm flex justify-center items-center h-6 border dark:border-sky-500 border-slate-900 rounded-md px-2"
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
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full m-2 text-sky-500 italic font-thin">
            Data Empty
            <Link to="/tutors">
              <button className="mt-2 text-white bg-neutral-800 text-sm flex justify-center items-center h-8 border border-sky-500 rounded-md px-1">
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
                  <span class="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div>

              <textarea
                ref={refMessage}
                type="text"
                className=" break-words dark:text-white font-thin text-sm rounded-md p-2 bg-transparent outline-none border dark:border-sky-500 border-slate-900 "
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
                <div className="dark:text-white font-thin text-sm">
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

        {/* modal delete rincian */}
        {isModalDeleteRincian ? (
          <div className="absolute backdrop-blur-sm w-full h-full dark:bg-neutral-700 bg-slate-200 bg-opacity-70 flex justify-center items-center">
            <div className="flex flex-col w-[45%] dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3 gap-4 items-center">
              <div className="flex justify-between">
                <div className=" text-rose-500">Delete Data</div>
              </div>
              <div className="flex justify-between">
                <div className="dark:text-white font-thin text-sm">
                  Are you sure ?
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onValidDeleteRincian}
                  className="drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white dark:bg-neutral-800 bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 rounded-md px-2 w-fit mt-2"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsModalDeleteRincian(false)}
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
