import CarouselHome from '../components/carousel';
import Header from '../components/header';
import img1 from '../assets/carousel/image1.jpg';
import img2 from '../assets/carousel/image2.jpg';
import img3 from '../assets/carousel/image3.jpg';
import img4 from '../assets/carousel/image4.jpg';
import img5 from '../assets/carousel/image5.jpg';
import SectionAboutUs from '../components/sectionHome/sectionAboutUs';
import SectionService from '../components/sectionHome/sectionService';
import SectionRooms from '../components/sectionHome/sectionRooms';
import SectionContactUs from '../components/sectionHome/sectionContactUs';
import Footer from '../components/footer';
export default function PageHome() {
  const slides = [img1, img2, img3, img4, img5];
  return (
    <main className="relative">
      <Header></Header>
      <section className="relative h-max">
        <div className="w-full  h-screen inline-block ">
          <CarouselHome slides={slides} />
        </div>
      </section>
      <SectionAboutUs />
      <SectionService />
      <SectionRooms />
      <SectionContactUs />
      <Footer></Footer>
    </main>
  );
}
