import { useState } from 'react';
import { Plus, X } from 'react-feather';
import { useForm } from 'react-hook-form';
import { reservarFechas } from '../../action/reserver';
import { useNavigate } from 'react-router-dom';

type Inputs = {
  name: String;
  surname: String;
  phoneNumber: String;
};

export default function FormReserve({ isOpen, onClose, dateList }: any) {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({});

  const inputStyle =
    'border border-primary-foreground outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary  py-1 px-2 text-[#000]';
  const ultimaNoche = dateList?.[dateList.length - 1] || '';

  const opcCant = [];
  for (let i = 0; i < 4; i++) {
    opcCant.push(i + 1);
  }

  const partes = ultimaNoche.split('/');
  const diaDeSalida = new Date(partes[2], partes[1] - 1, partes[0]);
  diaDeSalida.setDate(diaDeSalida.getDate() + 1);

  const [cantPersona, setCantPersona] = useState(1);

  const blockLetters = (e: any) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const sendTicket = async (data: any) => {
    setLoad(true);
    const response = await reservarFechas({
      contact: {
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        cantPersonas: cantPersona,
      },
      dateList,
    });
    console.log(response);
    if (response.success) {
      console.log('hola');
      navigate('/');
    }
    setLoad(false);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute w-full top-0 h-screen flex justify-center items-center bg-[#000000da] z-50">
      <form
        className="w-[500px] px-10 py-5 bg-primary relative flex flex-col text-white"
        onSubmit={handleSubmit((data) => sendTicket(data))}
      >
        {load ? (
          <div className="absolute w-full h-full bg-primary top-0 left-0 z-50 cursor-not-allowed"></div>
        ) : (
          ''
        )}
        <button
          onClick={onClose}
          className="absolute top-0 left-auto right-0 text-red-800 font-semibold border-2 border-red-800 m-3 rounded-full p-1 "
        >
          <X className="w-4 h-4 font-semibold" />
        </button>

        <label htmlFor="" className="text-white text-lg">
          Nombre
        </label>
        <input
          type="text"
          className={inputStyle}
          {...register('name', { required: 'Este campo es necesario' })}
        />
        {errors.name?.message && (
          <p className="bg-red-600 text-white px-2 w-max">
            {errors.name?.message}
          </p>
        )}

        <label htmlFor="" className="text-white text-lg">
          Apellido
        </label>
        <input
          type="text"
          className={inputStyle}
          {...register('surname', { required: 'Este campo es necesario' })}
        />
        {errors.surname?.message && (
          <p className="bg-red-600 text-white px-2 w-max">
            {errors.surname?.message}
          </p>
        )}

        <div className="flex flex-col">
          <div>
            <label htmlFor="" className="text-white text-lg">
              Número de teléfono
            </label>
            <div className="flex gap-1 relative items-center">
              <Plus className="text-primary absolute left-1 " />
              <input
                type="tel"
                onInput={blockLetters}
                className={inputStyle + ' pl-7'}
                {...register('phoneNumber', {
                  required: 'Este campo es necesario',
                })}
              />
            </div>
            {errors.phoneNumber?.message && (
              <p className="bg-red-600 text-white px-2 w-max">
                {errors.phoneNumber?.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="" className="text-white text-lg">
              Cant. Personas en total
            </label>{' '}
            <div className="flex">
              {opcCant.map((item, index) => (
                <span
                  onClick={() => setCantPersona(item)}
                  className={
                    'w-[34px] text-xl justify-center text-center cursor-pointer p-[3px] ' +
                    (cantPersona == item ? 'bg-primary-third' : 'bg-[#57A58B]')
                  }
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <span className="w-full h-[2px] relative bg-white my-3"></span>
        <div className="flex flex-col gap-2">
          <span>
            Se {cantPersona > 1 ? 'quedarán' : 'queda'} a partir del
            <span className="bg-primary-third px-1 rounded-md">
              {dateList.startDate}
            </span>{' '}
            hasta{' '}
            <span className="bg-primary-third px-1 rounded-md">
              {dateList.endDate}
            </span>
          </span>
          <span>
            Ingresando el{' '}
            <span className="bg-primary-third px-1 rounded-md">
              {dateList.startDate}
            </span>{' '}
            luego de las 14:30
          </span>
          <span>
            Saliendo el{' '}
            <span className="bg-primary-third px-1 rounded-md">
              {dateList.endDate}
            </span>{' '}
            antes de las 10:30
          </span>
        </div>
        <span className="w-full h-[2px] relative bg-white my-3"></span>
        <p className="text-slate-300">
          En caso que el número de telefono no sea valido, nos contactaremos con
          usted mediante su correo.
        </p>
        <button
          type="submit"
          className="bg-primary-third text-[#fff] w-max py-1 px-2 text-xl ml-auto"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
