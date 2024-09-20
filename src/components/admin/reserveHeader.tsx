import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ReserveHeader() {
  const [reservasActive, setReservasActive] = useState(true);
  return (
    <>
      <header className="relative mx-auto w-full text-white z-50  px-8 py-4 bg-header-admin flex items-center justify-between  ">
        <h1 className="text-xl text-white">
          <b>Rincón de la Cordillera</b>
        </h1>

        <nav className="flex gap-2 items-center">
          <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
          <Link to="/" className="p-2 duration-200 hover:bg-[#3F9176]">
            Inicio
          </Link>
          <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
          <Link
            onClick={() => setReservasActive(true)}
            to="/admin-panel/hospedajes"
            className="p-2 duration-200 hover:bg-[#3F9176]"
          >
            Cabañas
          </Link>
          <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
          <button
            onClick={() => {
              setReservasActive(!reservasActive);
            }}
            className="p-2 duration-200 hover:bg-[#3F9176]"
          >
            Reservas
          </button>
          <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
        </nav>
      </header>
      <div
        className={`fixed  w-full right-0 h-screen inline-block bg-[#00000044] z-20  ${
          reservasActive && 'bg-transparent hidden '
        }`}
        onClick={() => setReservasActive(!reservasActive)}
      ></div>
      <div
        className={`fixed bg-header  w-40 left-auto h-screen top-0 z-30 pt-[80px] flex flex-col duration-300 linear ${
          reservasActive ? '-right-40' : ' right-0'
        }`}
      >
        <h2 className="text-xl  text-primary font-semibold px-3 py-2">
          Reservas
        </h2>
        <nav className="flex flex-col gap-1 px-2">
          <span className=" relative w-full h-[2px]  bg-[#acacac]"></span>
          <Link
            onClick={() => setReservasActive(true)}
            to="/admin-panel"
            className="p-2 duration-200 hover:bg-[#cecece]"
          >
            Todas
          </Link>
          <span className=" relative w-full h-[2px]  bg-[#acacac]"></span>
          <Link
            onClick={() => setReservasActive(true)}
            to="/admin-panel/reservas/pendientes"
            className="p-2 duration-200 hover:bg-[#cecece]"
          >
            Pendientes
          </Link>
          <span className="relative w-full h-[2px]  bg-[#acacac]"></span>
          <Link
            onClick={() => setReservasActive(true)}
            to="/admin-panel/reservas/confirmadas"
            className="p-2 duration-200 hover:bg-[#cecece]"
          >
            Confirmadas
          </Link>
          <span className=" relative w-full h-[2px]  bg-[#acacac]"></span>
        </nav>
      </div>
    </>
  );
}
