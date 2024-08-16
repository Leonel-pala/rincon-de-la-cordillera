import img1 from '../../assets/service.jpg';
import iconWifi from '../../assets/service/wifi.png';
import breakfast from '../../assets/service/coffee.png';
import wash from '../../assets/service/wash-machine.png';
import pool from '../../assets/service/swimming.png';
import game from '../../assets/service/brand-apple-arcade.png';
import park from '../../assets/service/car-garage.png';
export default function SectionService() {
  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center relative"
      id="service"
    >
      <div
        className="bg-red-400 w-full h-1/2 absolute bg-cover bg-bottom-70 max-h-[310px]"
        style={{ backgroundImage: `URL(${img1})` }}
      ></div>
      <div className="bg-primary w-2/5 h-3/4 left-auto right-28 absolute p-16 flex flex-col justify-center gap-2 text-[#fff] max-h-[430px]">
        <h2 className="text-4xl ">Servicios</h2>
        <span className="relative w-20 -left-3 h-1 bg-[#fff] mb-6"></span>

        <p className="text-xl mb-2">
          Estos son los diversos servicio que disponemos para tu estadia
        </p>
        <ul className="text-xl list-none flex flex-wrap gap-x-11 list-inside mt-4 ">
          <div>
            <li>
              <img src={breakfast} className="h-7" alt="" /> Desayuno
            </li>
            <li>
              <img src={iconWifi} className="h-7" alt="" />
              WIFI gratis
            </li>
            <li>
              <img src={wash} className="h-7" alt="" />
              Lavandería
            </li>
          </div>
          <div>
            <li>
              <img src={park} className="h-7" alt="" />
              Estacionamiento
            </li>
            <li>
              <img src={game} className="h-7" alt="" />
              Sala de juegos
            </li>
            <li>
              <img src={pool} className="h-7" alt="" />
              Piscina
            </li>
          </div>
        </ul>
      </div>
    </section>
  );
}
