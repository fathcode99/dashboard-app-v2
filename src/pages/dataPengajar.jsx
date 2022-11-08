import React from "react";
import Navbar from "../component/navbar";
import Sidebar from "../component/sidebar";
import { useSelector } from "react-redux";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const DataPengajar = () => {
  const stateTutors = useSelector((state) => state.tutorsReducer);

  function priceFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filterElement}
        {column.text}
        {sortElement}
      </div>
    );
  }

  const columns = [
    {
      dataField: "id_pengajar",
      text: "ID",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: priceFormatter,
    },
    {
      dataField: "nama_pengajar",
      text: "Nama Pengajar",
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: priceFormatter,
    },
    {
      dataField: "mapel",
      text: "Mapel",
      style: {
        color: "white",
      },
    },
  ];

  return (
    <div className="flex">
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex flex-col md:m-8 w-full min-h-screen">
        <Navbar />
        <div className="dark:text-white font-bold text-xl m-2 ">
          Data Pengajar
        </div>
        <div>
          <BootstrapTable
            keyField="id"
            data={stateTutors.data}
            columns={columns}
            className="text-white"
            filter={filterFactory()} 
          />
        </div>
      </div>
    </div>
  );
};

export default DataPengajar;
