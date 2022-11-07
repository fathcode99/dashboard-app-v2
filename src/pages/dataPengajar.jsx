import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 

import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";
import ExportExcel from "../component/exportExcel";
import { useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";

const DataPengajar = () => {
  const stateTutors = useSelector((state) => state.tutorsReducer);
  const navigate = useNavigate();

  // default data
  const [dataMembers, setDataMembers] = useState(stateTutors.data);

  const columns = [
    
    { field: "id_pengajar", headerName: "ID", width: 70 },
    { field: "nama_pengajar", headerName: "Nama Pengajar", width: 130 },
    { field: "mapel", headerName: "Mapel", width: 130 },
    {
      field: "asal_kampus",
      headerName: "Asal Kampus",
      type: "number",
      width: 90,
    },
    { field: "no_telp", headerName: "No Telp", type: "number", width: 90 },
    { field: "email", headerName: "Email", type: "number", width: 90 },
    { field: 'action', headerName: "Action", width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction flex items-center">
                        <Link to={`/tutors/${params.row.id}`}>
                            <div className='viewButton py-1 px-2 bg-secondary text-fourth mr-2 rounded font-medium'>View</div>
                        </Link>
                        {console.log(params)}
                        
                    </div>
                )
            }
    }
  ];

  // proteksi login
  useEffect(() => {
    const tokenId = localStorage.getItem("token");
    if (!tokenId) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setDataMembers(stateTutors.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateTutors.data, dataMembers]);

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="dark:text-white flex flex-col md:m-8 w-full min-h-screen">
        <Navbar />
        <div className="dark:text-white font-bold text-xl m-2 ">
          <span>Data Pengajar</span>
          <div className="flex dark:text-white gap-2 text-sm justify-end items-center">
            <span>Export to Excel:</span>
            <ExportExcel data={dataMembers} />
          </div>
        </div>
        <div style={{ height: 400, width: "100%", color: "white" }} className="dark:text-white">
          <DataGrid
            rows={dataMembers}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </div>
    </div>
  );
};

export default DataPengajar;
