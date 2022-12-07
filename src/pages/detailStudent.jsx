import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://admin.menujudigital.com/api"; 

const DetailStudent = () => {
  let token = localStorage.getItem("token");
  const { id } = useParams();

  const [dataSiswa, setDataSiswa] = useState({}); 
  const [isEdit, setIsEdit] = useState(false); 
  
  const [filterDataBiaya, setFilterDataBiaya] =  useState([])

  const [isModalDelete, setIsModalDelete] = useState(false);

  // edit data siswa
  const [namaSiswa, setNamaSiswa] = useState(dataSiswa.nama_siswa);
  const [namaOrtu, setNamaOrtu] = useState(dataSiswa.nama_orangtua);
  const [idSiswa, setIdSiswa] = useState(dataSiswa.id_siswa);
  const [kelas, setKelas] = useState(dataSiswa.kelas);
  const [kurikulum, setKurikulum] = useState(dataSiswa.kurikulum);
  const [alamat, setAlamat] = useState(dataSiswa.alamat);
  const [kecamatan, setKecamatan] = useState(dataSiswa.kecamatan);
  const [kota, setKota] = useState(dataSiswa.kota);
  const [email, setEmail] = useState(dataSiswa.email);
  const [mapel, setMapel] = useState(dataSiswa.mapel);
  const [telp, setTelp] = useState(dataSiswa.no_telp);
  const [jadwal, setJadwal] = useState(dataSiswa.jadwal);
  const [jam, setJam] = useState(dataSiswa.jam_mulai_les);
  const [mulaiLes, setMulaiLes] = useState(dataSiswa.jam_mulai_les);
  const [jenisBimble, setJenisBimble] = useState(dataSiswa.jenis_bimble);
  const [genderTutor, setGenderTutor] = useState(dataSiswa.gender_tutor);
  const [program, setProgram] = useState(dataSiswa.program);
  const [statusSiswa, setStatusSiswa] = useState(dataSiswa.status_siswa);
  const [regional, setRegional] = useState(dataSiswa.regional);
  const [statusPendaftaran, setStatusPendaftaran] = useState(dataSiswa.status_pendaftaran);
  const [biayaPendaftaran, setBiayaPendaftaran] = useState(dataSiswa.biaya_pendaftaran);
  const [tagihanMnt, setTagihanMnt] = useState(dataSiswa.tagihan_per_menit);
  const [realisasiBp, setRealisasiBp] = useState(dataSiswa.biaya_pendaftaran_dibayar)
  const [biayaLes, setBiayaLes] = useState(dataSiswa.biaya_les)

  useEffect(() => {
    axios
      .get(`${url}/dataortusiswa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSiswa(res.data);
      });

      async function getBiaya() {
        try {
          await axios
          .get(`${url}/biaya`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => { 
            let filter = res.data.filter((data) => data.id_siswa === id); 
            setFilterDataBiaya(filter)
          });
        } catch (err) {
          console.log("Error when fetching data - Biaya");
        }
      }
      getBiaya()
  }, [id, token]);

  // // filter data rincian
  // let filterDataBiaya;
  // if (dataBiaya) {
  //   filterDataBiaya = dataBiaya.filter((data) => data.id_siswa === idSiswa);
  // }

  //menghitung total fee
  let totalTagihanSiswa = 0;
  for (let i = 0; i < filterDataBiaya.length; i++) {
    totalTagihanSiswa += +filterDataBiaya[i].tagihan_siswa;
  }

  const onDone = () => { 
    let updateData = {
      nama_orangtua: namaOrtu,
      id_siswa: idSiswa,
      nama_siswa: namaSiswa,
      kelas: kelas,
      kurikulum: kurikulum,
      alamat: alamat,
      kecamatan: kecamatan,
      kota: kota,
      no_telp: telp,
      email: email,
      mapel: mapel,
      jadwal_les: jadwal,
      jam_mulai_les: jam,
      mulai_les: mulaiLes,
      jenis_bimble: jenisBimble,
      gender_tentor: genderTutor,
      program: program,
      status_siswa: statusSiswa,
      regional: regional,
      status_pendaftaran: statusPendaftaran,
      tagihan_per_menit : tagihanMnt,
      tagihan_biaya_pendaftaran : biayaPendaftaran,
      biaya_pendaftaran_dibayar: realisasiBp,
      biaya_les: biayaLes
    };
    console.log(updateData);
    axios
      .put(`${url}/dataortusiswa/${id}/update`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        axios
          .get(`${url}/dataortusiswa/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDataSiswa(res.data);
          });
      });
    setIsEdit(!isEdit);
  };

  

  // modal delete
  const onValidDeleteYes = () => {
    axios
      .delete(`${url}/dataortusiswa/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDataSiswa({});
        setIsModalDelete(false);
      });
  };
 
  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] lg:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2 relative'>
        <Navbar />
        <div className="main-title flex justify-between">
          <div>
            Detail Data Siswa
          </div>
          <a
              href={`https://api.whatsapp.com/send?phone=${dataSiswa.no_telp}&text=*INVOICE*%0ATagihan+Bulan+ini+untuk+Ananda+${dataSiswa.nama_siswa}%0Aadalah+Rp+${totalTagihanSiswa.toLocaleString()}+%0A%0ATerimakasih+%0AAdmin+Cendikia`} 
              target='_blank'
              rel='noreferrer'
               > Send Invoice via WA 
          </a>
        </div>
        {dataSiswa.nama_orangtua ? (
          <>
            <div className="flex flex-col gap-4">
              {/* data student */}
              {isEdit ? (
                <div className="flex flex-col w-full md:w=3/4 dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                  <div className="flex gap-3 relative">
                    {/* <div className="w-1/4 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div> */}

                    <div className="flex flex-col w-full justify-center">
                      <input
                        onChange={(e) => setNamaSiswa(e.target.value)}
                        type="text"
                        defaultValue={dataSiswa.nama_siswa}
                        className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                      />

                      <div className=" text-sm flex">
                        <span className="dark:text-white mr-2">ID : </span>
                        <input
                          type="text"
                          onChange={(e) => setIdSiswa(e.target.value)}
                          defaultValue={dataSiswa.id}
                          className="outline-none bg-transparent border border-sky-500 rounded-sm px-2 dark:text-white  text-base"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Nama Orang Tua
                          </div>
                          <input
                            onChange={(e) => setNamaOrtu(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.nama_orangtua}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Alamat
                          </div>
                          <div className="flex flex-col">
                            <input
                              onChange={(e) => setAlamat(e.target.value)}
                              type="text"
                              defaultValue={dataSiswa.alamat}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                            <input
                              onChange={(e) => setKecamatan(e.target.value)}
                              type="text"
                              defaultValue={dataSiswa.kecamatan}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                            <input
                              onChange={(e) => setKota(e.target.value)}
                              type="text"
                              defaultValue={dataSiswa.kota}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <input
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={dataSiswa.email}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Kelas
                          </div>
                          <input
                            onChange={(e) => setKelas(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.kelas}
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
                              defaultValue={dataSiswa.mapel}
                              className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Kurikulum
                          </div>
                          <input
                            onChange={(e) => setKurikulum(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.kurikulum}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <input
                            onChange={(e) => setTelp(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.no_telp}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jadwal Les
                          </div>
                          <input
                            onChange={(e) => setJadwal(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.jadwal_les}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jam Les
                          </div>
                          <input
                            onChange={(e) => setJam(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.jam_mulai_les}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Mulai Les
                          </div>
                          <input
                            onChange={(e) => setMulaiLes(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.mulai_les}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jenis Bimble
                          </div>
                          <input
                            onChange={(e) => setJenisBimble(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.jenis_bimble}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Gender Tentor
                          </div>
                          <input
                            onChange={(e) => setGenderTutor(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.gender_tentor}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Program
                          </div>
                          <input
                            onChange={(e) => setProgram(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.program}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Status Siswa
                          </div>
                          <input
                            onChange={(e) => setStatusSiswa(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.status_siswa}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 dark:text-white  text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Status Pendaftaran
                          </div>
                          <input
                            onChange={(e) =>
                              setStatusPendaftaran(e.target.value)
                            }
                            type="text"
                            defaultValue={dataSiswa.status_pendaftaran}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Regional
                          </div>
                          <input
                            onChange={(e) => setRegional(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.regional}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Tagihan/mnt
                          </div>
                          <input
                            onChange={(e) => setTagihanMnt(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.tagihan_per_menit}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Biaya Pendaftaran
                          </div>
                          <input
                            onChange={(e) => setBiayaPendaftaran(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.tagihan_biaya_pendaftaran}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Realisasi BP
                          </div>
                          <input
                            onChange={(e) => setRealisasiBp(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.biaya_pendaftaran_dibayar}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Biaya Les
                          </div>
                          <input
                            onChange={(e) => setBiayaLes(e.target.value)}
                            type="text"
                            defaultValue={dataSiswa.biaya_les}
                            className="outline-none bg-transparent border border-sky-500 rounded-sm w-full px-2 text-base"
                          />
                        </div>
                      </div>
                    </div>

                    {/* button editing */}
                    <div className="absolute top-0 right-0 flex gap-2">
                      <button
                        onClick={onDone}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6"
                      >
                        <span className="material-symbols-rounded dark:text-white ">
                          {" "}
                          done{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsEdit(false)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white ">
                          {" "}
                          cancel{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full  dark:bg-neutral-800 bg-white rounded-md p-4 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                  <div className="flex gap-3 relative">
                    {/* <div className="w-1/4 rounded-md overflow-hidden drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]">
                      <img
                        src="https://www.stepstherapy.com.au/wp-content/uploads/2020/05/Natalie-square-profile-picture-1024x1024.jpg"
                        alt="profile"
                      />
                    </div> */}
                    <div className="flex flex-col w-full justify-center">
                      <div className="dark:text-white font-medium text-xl">
                        {dataSiswa.nama_siswa}
                      </div>
                      <div className="dark:text-white  text-sm">
                        ID : {dataSiswa.id}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Nama Orang Tua
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.nama_orangtua}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Alamat
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.alamat} {dataSiswa.kecamatan}{" "}
                            {dataSiswa.kota}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Email
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.email}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Kelas
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.kelas}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Mapel
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.mapel}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Kurikulum
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.kurikulum}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Phone
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.no_telp}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jadwal Les
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.jadwal_les}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jam Les
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.jam_mulai_les}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Mulai Les
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.mulai_les}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Jenis Bimble
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.jenis_bimble}
                          </div>
                        </div>

                        <div className="w-full">
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Gender Tentor
                          </div>
                          <div className="dark:text-white  text-sm">
                            {dataSiswa.gender_tentor}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Program
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.program}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Status Siswa
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.status_siswa}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Status Pendaftaran
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.status_pendaftaran}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Regional
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.regional}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Tagihan/mnt
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.tagihan_per_menit}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Biaya Pendaftaran
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.tagihan_biaya_pendaftaran}
                          </div>
                        </div>

                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Realisasi BP
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.biaya_pendaftaran_dibayar}
                          </div>
                        </div>
                        <div>
                          <div className="italic  text-sky-500 text-sm mt-3">
                            Biaya Les
                          </div>
                          <div className={`dark:text-white  text-sm`}>
                            {dataSiswa.biaya_les}
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
                        <span className="material-symbols-rounded dark:text-white ">
                          {" "}
                          edit{" "}
                        </span>
                      </button>
                      <button
                        onClick={() => setIsModalDelete(true)}
                        className="hover:bg-sky-500 dark:hover:bg-sky-500 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:bg-neutral-700 bg-slate-300 rounded h-6 w-6 "
                      >
                        <span className="material-symbols-rounded dark:text-white ">
                          {" "}
                          delete{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* payment */}
              <div className="flex flex-col  w-full bg-white dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
                <div className="dark:text-white  text-sm">Payment</div>
                <div className="text-sky-500  text-right text-5xl md:text-3xl lg:text-5xl">
                  Rp {totalTagihanSiswa.toLocaleString()}
                </div>
                
              </div>
            </div>

            {/* rincian pembayaran */}
            <div className="flex flex-col mt-2 bg-white dark:bg-neutral-800 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
              <div className="  text-sm my-3">
                Rincian Pembayaran Siswa
              </div>

              <table className="w-full">
                <thead className="h-8">
                  <tr className="text-sm text-white  bg-slate-900 dark:bg-sky-500 h-full">
                    <th className="font-medium">No.</th>
                    <th className="font-medium hidden md:table-cell">Tanggal</th>
                    <th className="font-medium hidden md:table-cell">ID</th>
                    <th className="font-medium px-2 flex items-center h-8 justify-between">
                      Nama Siswa
                    </th>
                    <th className="font-medium hidden md:table-cell">
                      Tagihan Siswa
                    </th>
                    <th className="font-medium hidden md:table-cell">
                      Realisasi TS
                    </th>
                    <th className="font-medium md:table-cell">
                      Biaya Pendaftaran
                    </th>
                    <th className="font-medium hidden md:table-cell">
                      Realisasi BP
                    </th>
                    {/* <th className="font-medium hidden md:table-cell">Action</th> */}
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
                  filterDataBiaya
                    .sort((a, b) => (a.nama_siswa > b.nama_siswa ? 1 : -1))
                    .map((item, index) => {
                      return (
                        <tbody
                          key={index}
                          className="dark:text-white  text-sm"
                        >
                          <tr
                            className={
                              index % 2 === 0
                                ? " bg-slate-200 h-8"
                                : " bg-white h-8"
                            }
                          >
                            <td className="text-center border-r dark:border-white">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap border-r px-2">
                              {item.created_at.slice(0, 10)}
                            </td>
                            <td className="text-center border-r dark:border-white hidden md:table-cell">
                              {item.id_siswa}
                            </td>
                            <td className="border-r dark:border-white px-2">
                              {item.nama_siswa}
                            </td>
                            <td className="text-center border-r dark:border-white hidden md:table-cell">
                              Rp {item.tagihan_siswa}
                            </td>
                            <td className="text-center border-r dark:border-white">
                              Rp {item.realisasi_tagihan_siswa}
                            </td>
                            <td className="text-center border-r dark:border-white">
                              Rp {item.biaya_pendaftaran}
                            </td>
                            <td className="text-center border-r dark:border-white hidden md:table-cell">
                              
                                Rp {item.realisasi_biaya_pendaftaran}
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
            <Link to="/students">
              <button className="text-white hover:bg-slate-200 transition duration-300 bg-sky-500 text-sm font-normal flex justify-center items-center h-6 border border-slate-900 rounded-md px-2">
                <span>Back to Students Page</span>
              </button>
            </Link>
          </div>
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

export default DetailStudent;
