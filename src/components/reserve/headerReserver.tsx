import { Link } from 'react-router-dom';

export default function HeaderReserve() {
  return (
    <>
      <header className="relative   px-8 z-40   bg-second-foreground w-full  flex items-center justify-between text-[#000]  py-4">
        <h1 className="text-xl text-primary">
          <b>Rincón de la Cordillera</b>
        </h1>

        <nav className="flex gap-2 items-center">
          <>
            <Link to="/" className="p-2  hover:bg-gray-200">
              Inicio
            </Link>
            <span className=" relative w-[2px] h-7  bg-[#000]"></span>
            <Link to="/misReservas" className="p-2  hover:bg-gray-200">
              Mis reservas
            </Link>
          </>
        </nav>
      </header>
    </>
  );
}
