import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Eye from '../../assets/eye';
import EyeClosed from '../../assets/eye-closed';
import { registerSchema } from '../../validation/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = {
  correo: string;
  user: string;
  adress: string;
  password: string;
  passwordConfir: string;
};
export default function Register() {
  const navigate = useNavigate();
  const inputStyle = 'border border-solid rounded px-2 py-1 ';
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
  });
  async function signUpNewUser(data: Inputs) {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.existing == 'user') setError('user', { message: 'hola' });
    if (res.existing == 'email') setError('correo', { message: 'hola' });
    if (res.existing == 'emailAndUser') {
      setError('correo', { message: 'hola' });
      setError('user', { message: 'hola' });
    }
    if (res.succes) {
      navigate('/');
    }
  }
  const [visibility, setVisibility] = useState(false);
  return (
    <>
      <div className="w-screen h-screen bg-primary-foreground flex items-center justify-center">
        <div className="bg-[#fff] w-3/5 flex min-h-3/4">
          <form
            className="w-3/5 p-12 flex flex-col justify-center"
            onSubmit={handleSubmit((data) => signUpNewUser(data))}
          >
            <h2 className="text-4xl text-primary ">Regístrate</h2>
            <label className="mt-2" htmlFor="user">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="user"
              {...register('user')}
              className={inputStyle}
            />
            {errors.user?.message && (
              <p className="errorMessage">{errors.user?.message}</p>
            )}
            <label className="mt-2" htmlFor="correo">
              Correo electronico
            </label>
            <input
              type="email"
              {...register('correo')}
              id="correo"
              className={inputStyle}
            />
            {errors.correo?.message && (
              <p className="errorMessage">{errors.correo?.message}</p>
            )}
            <label className="mt-2 flex items-center gap-1" htmlFor="password">
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
              {...register('password')}
              id="password"
              className={inputStyle}
            />
            {errors.password?.message && (
              <p className="errorMessage">{errors.password?.message}</p>
            )}
            <label className="mt-2" htmlFor="passwordConfir">
              Confirmar contraseña
            </label>
            <input
              type={visibility ? 'text' : 'password'}
              {...register('passwordConfir')}
              id="confirmPassword"
              className={inputStyle}
            />
            {errors.passwordConfir?.message && (
              <p className="errorMessage">{errors.passwordConfir?.message}</p>
            )}
            <button
              type="submit"
              className="bg-primary p-2  text-xl text-[#fff] mb-6"
            >
              Iniciar sesion
            </button>
            <p>
              Ya tienes una cuenta {':D'}?{' '}
              <Link to=".." className="text-primary">
                <b>Inicia sesion!</b>
              </Link>
            </p>
            <Link className="text-primary-foreground" to="/">
              Continuar sin cuenta
            </Link>
          </form>
          <div className="bg-primary p-10 box-content  basis-1/3 ">
            <h1 className="text-4xl text-[#fff] mt-24 ">
              ¿Eres nuevo? Bienvenido a <b className="">BuyFruit!</b>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
