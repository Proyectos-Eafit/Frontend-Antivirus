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
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Slide ${index + 1}`} className="w-2/5 px-30 bg-black h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
