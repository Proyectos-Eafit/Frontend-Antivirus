import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Carousel() {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6JuA2EignVtaNyNT7aemS1KaAqTsFznx1jA&s",
    "https://fconvida.org/wp-content/uploads/2024/05/logo-comfama.webp",
    "https://www.elmamm.org/content/uploads/2022/12/mamm-pilares-comfama.jpg",
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={-30}
      slidesPerView={1.5}
      centeredSlides={true}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      // autoplay={{ delay: 3000 }}
      className="w-full max-w-screen-md"
    >
      {images.map((src, index) => (
        <SwiperSlide
          key={index}
          className="flex justify-center items-center transition-transform duration-300"
        >
          <div className="flex justify-center items-center w-full h-96">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 scale-90 swiper-slide-active:scale-100"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
