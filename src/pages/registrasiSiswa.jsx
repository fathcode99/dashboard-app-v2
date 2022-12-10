import React from 'react'
import axios from "axios";

import Sidebar from "../component/sidebar";
import Navbar from "../component/navbar";
import { useState } from 'react';

const url = "https://admin.menujudigital.com/api"; 

const RegistrasiSiswa = () => {
  const [namaSiswa, setNamaSiswa] = useState('')
  const [namaOrangtua, setNamaOrangtua] = useState('')
  const [alamat, setAlamat] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [kota, setKota] = useState('')
  const [email, setEmail] = useState('')
  const [kelas, setKelas] = useState('')
  const [mapel, setMapel] = useState('')
  const [kurikulum, setKurikulum] = useState('')
  const [phone, setPhone] = useState('')
  const [jadwalLes, setJadwalLes] = useState('')
  const [jamLes, setJamLes] = useState('')
  const [mulaiLes, setMulaiLes] = useState('')
  const [jenisBimble, setJenisBimble] = useState('')
  const [program, setProgram] = useState('')

  const [modalSucess, setModalSuccess] = useState(false)
  const [modalFailed, setModalFailed] = useState(false)

  let token = localStorage.getItem("token");

  const onRegister = () => {
    let dataRegister = {
        nama_orangtua: namaOrangtua,
        id_siswa: null,
        nama_siswa: namaSiswa,
        kelas: kelas,
        kurikulum: kurikulum,
        alamat: alamat,
        kecamatan: kecamatan,
        kota: kota,
        no_telp: phone,
        email: email,
        mapel: mapel,
        jadwal_les: jadwalLes,
        jam_mulai_les: jamLes,
        mulai_les: mulaiLes,
        jenis_bimble: jenisBimble,
        gender_tentor: '',
        program: program,
        status_siswa: 'Active',
        regional: '',
        status_pendaftaran: '',
        tagihan_per_menit : '',
        tagihan_biaya_pendaftaran : '',
        biaya_pendaftaran_dibayar: '',
        biaya_les: '',
        fee_pengajar: ''
      }; 

    // console.log(dataRegister)
    
    if(!email || !namaSiswa || !namaOrangtua) {
        setModalFailed(true)
    } else {
        axios
          .post(`${url}/dataortusiswa`, dataRegister, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => {
            setModalSuccess(true)
    
            setNamaSiswa('')
            setNamaOrangtua('')
            setKelas('')
            setKurikulum('')
            setAlamat('')
            setKecamatan('')
            setKota('')
            setEmail('')
            setPhone('')
            setJadwalLes('')
            setJamLes('')
            setMulaiLes('')
            setJenisBimble('')
            setProgram('') 
          }) 
    }
  }

  return (
    <div className="flex bg-slate-200  min-h-screen">
      <div className='min-w-[50px] lg:w-[300px]'>
        <Sidebar />
      </div>
      <div className='flex flex-col md:mb-8 md:mx-8 w-full m-2 relative'>
        <Navbar />
        <div className="main-title">Registrasi Siswa</div> 

        <div className="flex flex-col dark:bg-neutral-800 bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            <div className='flex mt-4'>
                <div className='w-52'>
                    Nama Siswa <span className='text-red-500'>*</span>
                </div>
                <input type="text" 
                defaultValue={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)} placeholder='Nama Siswa' className='border rounded-md px-2 w-full border-slate-600'/>
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Nama Orangtua <span className='text-red-500'>*</span>
                </div>
                <input type="text" 
                defaultValue={namaOrangtua}
                onChange={(e) => setNamaOrangtua(e.target.value)} placeholder='Nama Orangtua' className='border rounded-md px-2 w-full border-slate-600'/>
            </div>

            <div className='flex mt-4'>
                <div className='w-52'>
                    Email <span className='text-red-500'>*</span>
                </div>
                <input type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
                className='border rounded-md px-2 w-full border-slate-600'/>
            </div>

            <div className='flex mt-4'>
                <div className='w-52'>
                    Alamat
                </div>
                <div className='flex w-full flex-col gap-3'>
                    <input type="text"
                    defaultValue={alamat}
                    onChange={(e) => setAlamat(e.target.value)} placeholder='Nama Jalan ds, dsn, no' 
                    className='border rounded-md px-2 w-full border-slate-600'/>
                    <input type="text" 
                    defaultValue={kecamatan}
                    onChange={(e) => setKecamatan(e.target.value)} placeholder='Kecamatan'
                    className='border rounded-md px-2 w-full border-slate-600'/>
                    <input type="text"
                    defaultValue={kota}
                    onChange={(e) => setKota(e.target.value)} placeholder='Kota' 
                    className='border rounded-md px-2 w-full border-slate-600'/>
                </div>
            </div>
            
            <div className='flex mt-4'>
                <div className='w-52'>
                    Kelas
                </div>
                <input type="text" defaultValue={kelas} onChange={(e) => setKelas(e.target.value)} placeholder='Kelas'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Mapel
                </div>
                <input type="text" defaultValue={mapel} onChange={(e) => setMapel(e.target.value)} placeholder='Mapel'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Kurikulum
                </div>
                <input type="text" defaultValue={kurikulum} onChange={(e) => setKurikulum(e.target.value)} placeholder='Kurikulum'
                className='border rounded-md px-2 w-full border-slate-600'/>
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Phone
                </div>
                <input type="text" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Jadwal Les
                </div>
                <input type="text" defaultValue={jadwalLes} onChange={(e) => setJadwalLes(e.target.value)} placeholder='Jadwal Les'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Jam Les
                </div>
                <input type="text" defaultValue={jamLes} onChange={(e) => setJamLes(e.target.value)} placeholder='Jam Les'
                className='border rounded-md px-2 w-full border-slate-600'/>
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Mulai Les
                </div>
                <input type="text" defaultValue={mulaiLes} onChange={(e) => setMulaiLes(e.target.value)} placeholder='Mulai Les'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Jenis Bimble
                </div>
                <input type="text" defaultValue={jenisBimble} onChange={(e) => setJenisBimble(e.target.value)} placeholder='Jenis Bimble'
                className='border rounded-md px-2 w-full border-slate-600'/>
            </div>
            <div className='flex mt-4'>
                <div className='w-52'>
                    Program
                </div>
                <input type="text" defaultValue={program} onChange={(e) => setProgram(e.target.value)} placeholder='Program'
                className='border rounded-md px-2 w-full border-slate-600' />
            </div> 
            <button onClick={onRegister} 
            className="bg-sky-500 hover:bg-sky-400 rounded-md w-fit h-full px-2 flex items-center my-4">
                Register 
            </button>
        </div>

        {/* modal message */}
        {modalSucess ? (
          <div className="absolute backdrop-blur-sm w-full h-full bg-transparent bg-opacity-20 flex justify-center items-center">
            <div className="flex flex-col w-[35%] bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3">
              <div className="flex justify-between">
                <div className="text-center">Register Success</div>
                <button onClick={() => setModalSuccess(false)}>
                  <span className="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div> 

              <button
                onClick={() => setModalSuccess(false)}
                className="hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-2 w-fit mt-2"
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* modal message */}
        {modalFailed ? (
          <div className="absolute backdrop-blur-sm w-full h-full bg-transparent bg-opacity-20 flex justify-center items-center">
            <div className="flex flex-col w-[35%] bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] py-3">
              <div className="flex justify-between">
                <div className="text-center text-red-500">Register Failed</div>
                <button onClick={() => setModalFailed(false)}>
                  <span className="hover:text-rose-500 material-symbols-rounded dark:text-white">
                    close
                  </span>
                </button>
              </div> 
              <div>
                Nama Siswa, Orangtua, dan Email harus terisi.
              </div>
              <button
                onClick={() => setModalFailed(false)}
                className="hover:bg-sky-500 dark:hover:bg-sky-500 dark:text-white bg-slate-300 text-sm flex justify-center items-center h-8 border dark:border-sky-500 border-slate-900 rounded-md px-2 w-fit mt-2"
              >
                Ok
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default RegistrasiSiswa