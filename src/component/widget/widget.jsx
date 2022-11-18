import React, {useEffect} from "react"; 

const Widget = ({dataPengeluaran}) => { 
  
  useEffect(() => {
    // if (dataPengeluaran.length !== 0) {
    //   getTotalNomPengeluaran() 
    // }
    console.log(dataPengeluaran)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let totalNomPengeluaran = 0
  const getTotalNomPengeluaran = (dataPengeluaran) => {
    for (let i = 0; i < dataPengeluaran.length; i++) {
            totalNomPengeluaran += dataPengeluaran[i].nominal
    }
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-3 font-normal">
      <div className="flex flex-col bg-white rounded-md p-2 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
        <div className=" mb-6 font-thin text-sm">Total Biaya</div>
        <div className=" font-thin text-2xl flex justify-between items-baseline">
          <span>Rp </span>
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
          <span>233$</span>
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
          <span>Rp {} </span>
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
