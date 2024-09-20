import { useEffect, useState } from 'react';
import { getPendingReserve } from '../../../action/reserver';
import { Minus, X } from 'react-feather';
import clsx from 'clsx';
import ReserveTitlePage from '../../../components/admin/reserveTitlePage';

type Reserve = {
  code_reserve: string;
  cantPersonas: 4;
  status: string;
  room: string;
  endDate: string;
  startDate: string;
  contactUser: {
    userName: string;
    email: string;
    numberPhone: number;
    name: string;
    surname: string;
  };
};
type MoreDetails = {
  pedido: string;
  name: string;
  surname: string;
  userName: string;
  numberPhone: number;
  email: string;
};

export default function PagePendingReserve() {
  const [reserves, setReserves] = useState<Reserve[]>([]);
  const [load, setLoad] = useState(true);

  const [contactoDetails, setContactoDetails] = useState<
    MoreDetails[] | undefined
  >(undefined);
  const [showConctactDetails, setShowConctactDetails] = useState(false);

  useEffect(() => {
    async function fetchReserves() {
      const fetchAllReserve = await getPendingReserve();
      setReserves(fetchAllReserve);
      setLoad(false);
    }

    fetchReserves();
  }, []);

  return (
    <>
      <ReserveTitlePage titulo="Todas las reservas" />
      <div className="flex px-3 items-stretch">
        <div className="w-full">
          {load ? (
            <p>Cargando...</p>
          ) : (
            <div className="flex flex-wrap gap-3 border-2 p-2 justify-center m-0 top-0 bottom-0">
              {reserves.map((item: Reserve) => (
                <div
                  key={item.code_reserve}
                  className="w-[200px] bg-second-foreground border flex flex-col"
                >
                  <h3 className="bg-primary text-center text-white text-xl p-1">
                    {item.code_reserve}
                  </h3>
                  <div className="p-2 flex flex-col gap-1">
                    <div
                      className={
                        'rounded-full mx-auto px-2 py-[2px] text-base my-1 w-max text-white ' +
                        clsx({
                          'bg-orange-500': item.status == 'pending',
                          'bg-green-500': item.status == 'confirm',
                        })
                      }
                    >
                      {clsx({
                        pendiente: item.status == 'pending',
                        confirmado: item.status == 'confirm',
                      })}
                    </div>
                    <div className="flex gap-1">
                      <div className="flex flex-col justify-center">
                        <span className="font-medium">Entrada</span>
                        <span className="bg-[#fff] px-1">{item.startDate}</span>
                      </div>
                      <Minus className="mt-auto" />
                      <div className="flex flex-col">
                        <span className="font-medium">Salida</span>
                        <span className="bg-[#fff] px-1">{item.endDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-medium">Cant. Personas:</span>
                      <span>{item.cantPersonas}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">Cabaña asignada:</span>
                      <span>
                        {item.room ? `Nro. ${item.room}` : 'Sin asignar '}
                      </span>
                    </div>
                    <div>
                      <button
                        className="underline"
                        onClick={() => {
                          setContactoDetails([
                            {
                              pedido: item.code_reserve,
                              name: item.contactUser.name,
                              surname: item.contactUser.surname,
                              userName: item.contactUser.userName,
                              numberPhone: item.contactUser.numberPhone,
                              email: item.contactUser.email,
                            },
                          ]);
                          setShowConctactDetails(true);
                        }}
                      >
                        Info de contacto
                      </button>
                    </div>
                    <div className="flex justify-between mt-auto">
                      {item.status == 'pending' ? (
                        <button className="text-primary border-primary border p-1 duration-100 hover:bg-primary hover:text-white">
                          Asignar
                        </button>
                      ) : (
                        'hola'
                      )}
                      <button
                        onClick={() => {}}
                        className="bg-error text-white p-1"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={
            'relative px-2 ' + (showConctactDetails ? 'w-[280px]' : 'w-0')
          }
        >
          <div
            className={
              'sticky top-1 border-2 left-0 overflow-x-hidden justify-center items-center ' +
              (showConctactDetails ? 'w-[280px]' : 'w-0')
            }
          >
            <div className="bg-primary text-white text-xl flex justify-between px-2 py-1 ">
              <h3>Detalles de contacto</h3>
              <button
                onClick={() => {
                  setShowConctactDetails(false);
                }}
              >
                <X className="text-error w-5 h-5 border-2 border-error rounded-full my-auto" />
              </button>
            </div>
            <div className="flex flex-col p-2">
              <span>
                <b className="mr-1">Nro. de pedido:</b>
                {contactoDetails?.[0]?.pedido ?? ''}
              </span>
              <span>
                <b className="mr-1">Nombre:</b>
                {contactoDetails?.[0]?.name ?? ''}
              </span>
              <span>
                <b className="mr-1">Apellido:</b>
                {contactoDetails?.[0]?.surname ?? ''}
              </span>
              <span>
                <b className="mr-1">Usuario:</b>
                {contactoDetails?.[0]?.userName ?? ''}
              </span>
              <span>
                <b className="mr-1">Telefono:</b>
                {contactoDetails?.[0]?.numberPhone ?? ''}
              </span>
              <span>
                <b className="mr-1">Correo:</b>
                {contactoDetails?.[0]?.email ?? ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
