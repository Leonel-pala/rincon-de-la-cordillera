import { Link } from 'react-router-dom';
import Whatsapp from '../../assets/iconWhatsapp';

export default function SectionContactUs() {
  const inputStyle =
    'border border-primary-foreground outline-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary mb-2 py-1 px-2';
  return (
    <section
      className="w-full h-screen px-5 py-10 flex justify-center items-center gap-7 "
      id="contactUs"
    >
      <div className="w-2/5 h-full">
        <h2 className="text-4xl w-full px-24 flex flex-col mt-16">
          <b>Contactanos!</b>
          <span className="relative w-20 -left-3 h-1 bg-primary mb-4"></span>
          <p className="text-lg">
            Si quiere consultar o preguntar sobre algo puede contactarse con
            nosotros mediante el formulario o enviarno un mensaje a través de
            nuestro número de telefono.
          </p>
          <b className="text-lg text-primary flex mb-5">
            <Whatsapp /> +54 9 2945 55-3125
          </b>
          <p className="text-lg">
            Si desea realizar una reserva puede realizarlo mediante el siguiente
            enlace
          </p>
          <Link
            to="reservar"
            className="bg-primary text-[#fff] w-max py-1 px-2 text-2xl"
          >
            Reservar
          </Link>
        </h2>
      </div>
      <form className="bg-second flex flex-col p-5 w-[400px]">
        <label htmlFor="" className="text-primary text-xl">
          Nombre
        </label>
        <input type="text" className={inputStyle} name="" id="" />
        <label htmlFor="" className="text-primary text-xl">
          Correo electrónico
        </label>
        <input type="email" name="" id="" className={inputStyle} />
        <label htmlFor="" className="text-primary text-xl">
          Asunto
        </label>
        <input type="text" name="" id="" className={inputStyle} />
        <label htmlFor="" className="text-primary text-xl">
          Mensaje
        </label>
        <textarea className={'resize-none h-28 ' + inputStyle} name="" id="" />
        <button
          type="submit"
          className="bg-primary text-[#fff] w-max py-1 px-2 text-2xl ml-auto"
        >
          Enviar
        </button>
      </form>
    </section>
  );
}
