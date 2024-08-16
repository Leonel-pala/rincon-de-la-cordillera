import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export default function CarouselHome({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: string[];
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [curr]);
  return (
    <div className="overflow-hidden relative w-full h-full ">
      <div
        className="flex transition-transform ease-out duration-500 h-full w-auto"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((img) => (
          <div
            className="relative min-w-full min-h-full bg-cover bg-center flex justify-end"
            style={{ backgroundImage: `URL(${img})` }}
            key={img}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-0 right-0 left-0 ">
        <div className="flex items-center justify-center gap-2 w-max mx-auto p-5 rounded ">
          {slides.map((_, i) => (
            <div
              className={`
              transition-all w-3 h-3 bg-white rounded-full cursor-pointer 
              ${curr === i ? 'p-2' : 'bg-opacity-50'}
            `}
              onClick={() => {
                setCurr(i);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
