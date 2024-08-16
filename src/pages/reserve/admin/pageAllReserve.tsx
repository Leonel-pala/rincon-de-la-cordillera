import { useEffect, useState } from 'react';
import { getAllReserve } from '../../../action/reserver';
import ReserveHeader from '../../../components/admin/reserveHeader';

type Reserve = {
  code_reserve: string;
  cantPersonas: 4;
  status: string;
  room: string;
  day_reserves: string[];
  contactUser: {
    userName: string;
    email: string;
    numberPhone: number;
    name: string;
    surname: string;
  };
};

export default function AllReserve() {
  const [reserves, setReserves] = useState<Reserve[]>([]); // Cambiar a un array de reservas
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function fetchReserves() {
      const fetchAllReserve = await getAllReserve();
      console.log(fetchAllReserve);
      setReserves(fetchAllReserve);
      setLoad(false);
    }

    fetchReserves();
  }, []);

  return (
    <>
      <ReserveHeader></ReserveHeader>
      <div>
        <div className="relative m-4 mx-8">
          <h1 className="text-3xl  text-primary font-semibold">
            Todas las reservas
          </h1>
          <span className="absolute -left-4 w-20 h-1 bg-primary text-red-900"></span>
        </div>

        {load ? (
          <p>Cargando...</p>
        ) : (
          <div className="flex flex-wrap gap-3 mx-5 border-2 p-3 justify-center">
            {reserves.map((item: Reserve) => (
              <div
                key={item.code_reserve}
                className="w-[200px] bg-second-foreground border "
              >
                <h3 className="bg-primary text-center text-white text-xl p-1">
                  {item.code_reserve}
                </h3>
                <h3>Fechas pedidas:</h3>
                <ul>
                  {item.day_reserves.map((fecha, index) => (
                    <li key={index}>{fecha}</li>
                  ))}
                </ul>
                <div>
                  <h4>Contacto:</h4>
                  <div>{item.contactUser.userName}</div>
                  <div>{item.contactUser.name}</div>
                  <div>{item.contactUser.surname}</div>
                  <div>{item.contactUser.numberPhone}</div>
                  <div>{item.contactUser.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
