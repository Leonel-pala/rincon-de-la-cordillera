import { Link } from 'react-router-dom';

export default function ReserveHeader() {
  return (
    <header className="mx-auto w-full text-white   px-8 py-4 bg-header-admin flex items-center justify-between  ">
      <h1 className="text-xl text-white">
        <b>Rincón de la Cordillera</b>
      </h1>

      <nav className="flex gap-2 items-center">
        <a href="/" className="p-2 duration-200 hover:bg-[#3F9176]">
          Inicio
        </a>
        <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
        <a href="/" className="p-2 duration-200 hover:bg-[#3F9176]">
          Reservas pendientes
        </a>
        <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
        <a href="/" className="p-2 duration-200 hover:bg-[#3F9176]">
          Reservas confirmadas
        </a>
        <span className=" relative w-[2px] h-7  bg-[#fff]"></span>
      </nav>
    </header>
  );
}
