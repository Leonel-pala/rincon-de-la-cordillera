import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-primary text-[#fff]">
      <h1 className="text-7xl  ">
        <b>Error 404</b>
      </h1>
      <h2 className="text-4xl">Page not found</h2>
      <h3 className="text-3xl">Osea pagina no encontrada XD</h3>
      <h4 className="text-2xl">Osea no la hice por fiaca XDDD</h4>
      <Link to="/" className="underline underline-offset-2">
        Ir al inicio
      </Link>
    </section>
  );
}
