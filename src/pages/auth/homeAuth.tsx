import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Eye from '../../assets/eye';
import EyeClosed from '../../assets/eye-closed';
export default function HomeAuth() {
  const navigate = useNavigate();
  const inputStyle = 'border border-solid rounded px-2 py-1 mb-2';
  const [error, setError] = useState({ user: '', password: '' });
  const [visibility, setVisibility] = useState(false);
  async function login(dataInput: any) {
    setError({ user: '', password: '' });
    dataInput.preventDefault();
    const formData = new FormData(dataInput.target);
    const data = {
      user: formData.get('user'),
      password: formData.get('password'),
    };
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.error == 'userUndefined') {
      return setError({ user: 'Usuario no existe', password: '' });
    }
    if (!res.passwordVerify) {
      return setError({ user: '', password: 'Contraseña incorrecta' });
    }
    return navigate('/');
  }
  return (
    <>
      <div className="w-screen h-screen bg-primary-foreground flex items-center justify-center">
        <div className="bg-[#fff] w-3/5 flex h-3/4">
          <div className="bg-primary p-10 box-content  basis-1/3 ">
            <h1 className="text-4xl text-[#fff] mt-24 ">
              Bienvenido de nuevo a <b className="">BuyFruit</b>
            </h1>
          </div>

          <form
            className="w-3/5 p-12 flex flex-col justify-center"
            onSubmit={login}
          >
            <h2 className="text-4xl text-primary ">Iniciar sesion</h2>
            <label htmlFor="user">Usuario</label>
            <input type="text" name="user" id="user" className={inputStyle} />
            <p className="errorMessage">{error.user}</p>

            <label htmlFor="password" className="flex items-center gap-1">
              Contraseña
              <button
                className=" relative my-auto"
                onClick={() => setVisibility(!visibility)}
              >
                {visibility ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </button>
            </label>
            <input
              type={visibility ? 'text' : 'password'}
              name="password"
              id="password"
              className={inputStyle}
            />
            <p className="errorMessage">{error.password}</p>

            <button
              type="submit"
              className="bg-primary p-2  text-xl text-[#fff] mb-6"
            >
              Iniciar sesion
            </button>
            <p>
              No tienes cuenta {':('}? No hay problema
              <Link to="register" className="text-primary">
                <b>registrate!</b>
              </Link>
            </p>
            <Link className="text-primary-foreground" to="/">
              Continuar sin cuenta
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
