import img1 from '../../assets/rooms/rooms1.jpg';
import img2 from '../../assets/rooms/rooms2.jpg';
import img3 from '../../assets/rooms/rooms3.jpg';

export default function SectionRooms() {
  return (
    <section
      className="w-full h-screen px-5 py-10 flex flex-col items-center gap-7"
      id="rooms"
    >
      <h2 className="text-4xl w-full px-24 flex flex-col">
        <b>Habitaciones</b>
        <span className="relative w-20 -left-3 h-1 bg-primary"></span>
        <p className="text-lg">Estas son habitaciones super comodas</p>
      </h2>
      <div className="flex gap-4 w-full justify-center h-full max-h-[430px] ">
        <div
          className=" w-1/4 bg-cover bg-center duration-300  hover:w-1/3"
          style={{ backgroundImage: `URL(${img1})` }}
        ></div>
        <div
          className=" w-1/4 bg-cover  bg-center duration-300  hover:w-1/3"
          style={{ backgroundImage: `URL(${img3})` }}
        ></div>
        <div
          className=" w-1/4 bg-cover  bg-center duration-300  hover:w-1/3"
          style={{ backgroundImage: `URL(${img2})` }}
        ></div>
      </div>
    </section>
  );
}
