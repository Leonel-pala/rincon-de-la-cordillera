import img1 from '../../assets/carousel/image1.jpg';
import img2 from '../../assets/aboutUs.jpg';
export default function SectionAboutUs() {
  return (
    <section
      className="h-screen w-full flex gap-7 items-center justify-center"
      id="aboutUs"
    >
      <div className="col-span-1 w-1/2 relative h-full">
        <img
          src={img2}
          className="w-3/5 absolute  top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-3/4"
          alt=""
        />
        <img
          src={img1}
          className="w-3/5 absolute  top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-11/12"
          alt=""
        />
      </div>
      <div className="max-w-[500px] flex flex-col gap-1 w-1/2">
        <h3 className="text-2xl">Sobre nosotros</h3>
        <span className="relative w-20 -left-3 h-1 bg-primary"></span>
        <h2 className="text-4xl flex flex-col">
          Bienvenido a <b className="text-primary">Rincón de la cordillera!</b>
        </h2>
        <p className=" mx-auto w-4/5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          dolorum, quo similique voluptates voluptatibus animi aliquid
          laudantium quod vitae assumenda alias ipsum aut adipisci accusantium
          minima magnam necessitatibus natus. Repudiandae.
        </p>
      </div>
    </section>
  );
}
