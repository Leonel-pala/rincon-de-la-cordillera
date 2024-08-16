import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HeaderAdmin from './admin/headerAdmin';

export default function Header() {
  const [user, setUser] = useState(false);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function cookies() {
      const response = await fetch('http://localhost:3000/api/verifyCookie', {
        credentials: 'include',
      });
      const res = await response.json();
      setUser(res);
      setLoad(!load);
    }
    cookies();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/verifyRole', {
          credentials: 'include',
        });
        const res = await response.json();
        if (res.accesAdmin) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyRole();
  }, []);

  return (
    <header className="fixed   mx-auto w-full    px-8 z-50 top-5 ">
      <div className="bg-header w-full  flex items-center justify-between text-[#000]  py-4 px-8">
        <h1 className="text-xl text-primary">
          <b>Rincón de la Cordillera</b>
        </h1>

        <nav className="flex gap-2 items-center">
          <a href="#" className="p-2 duration-200 hover:bg-gray-300">
            Inicio
          </a>
          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          <a href="#aboutUs" className="p-2 duration-200 hover:bg-gray-300">
            Sobre Nosotros
          </a>
          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          <a href="#service" className="p-2 duration-200 hover:bg-gray-300">
            Servicios
          </a>
          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          <a href="#rooms" className="p-2 duration-200 hover:bg-gray-300">
            Habitaciones
          </a>
          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          <a href="#contactUs" className="p-2 duration-200 hover:bg-gray-300">
            Contactanos
          </a>

          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          <Link to="reservar" className="p-2 duration-200 hover:bg-gray-300">
            Reservar
          </Link>
          <span className=" relative w-[2px] h-7  bg-[#000]"></span>
          {load ? (
            <p>Cargando...</p>
          ) : (
            <>
              {user ? (
                <Link
                  to="myProfile"
                  className="p-2 duration-200 hover:bg-gray-300"
                >
                  Mi perfil
                </Link>
              ) : (
                <>
                  <Link
                    to="auth"
                    className="bg-primary  text-[#fff] p-2 transition hover:bg-primary-foreground"
                  >
                    Autenticar
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
      {isAuthenticated ? <HeaderAdmin></HeaderAdmin> : ''}
    </header>
  );
}
