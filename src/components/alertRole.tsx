import { Link } from 'react-router-dom';

export default function AlertRole() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-red-600 w-3/4 h-[400px] text-center text-[#fff] flex flex-col justify-center ">
        <h1 className="text-5xl">OJO AL PIOJO</h1>
        <h2 className="text-3xl">
          No dispone de los permisos necesarios para acceder esta pagina -_-
        </h2>
        <Link to="/" className="text-xl underline underline-offset-2">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
