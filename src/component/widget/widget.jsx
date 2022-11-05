import React from "react";

const Widget = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-3">
      <div className="w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:text-white">
        <div className=" mb-6 font-thin text-sm">Total Pendapatan</div>
        <div className=" font-thin text-2xl flex justify-between items-baseline">
          <span>233$</span>
          <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-rounded  text-lg font-thin ">
              add_shopping_cart
            </span>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:text-white">
        <div className=" mb-6 font-thin text-sm">Pengeluaran</div>
        <div className=" font-thin text-2xl flex justify-between items-baseline">
          <span>233$</span>
          <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-rounded  text-lg font-thin ">
              add_shopping_cart
            </span>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:text-white">
        <div className=" mb-6 font-thin text-sm">Realiasi</div>
        <div className=" font-thin text-2xl flex justify-between items-baseline">
          <span>233$</span>
          <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-rounded  text-lg font-thin ">
              add_shopping_cart
            </span>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-neutral-800 bg-slate-200 rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)] dark:text-white">
        <div className=" mb-6 font-thin text-sm">Selisih</div>
        <div className=" font-thin text-2xl flex justify-between items-baseline">
          <span>233$</span>
          <div className="bg-sky-500 rounded-sm w-6 h-6 flex items-center justify-center">
            <span className="material-symbols-rounded  text-lg font-thin ">
              add_shopping_cart
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
