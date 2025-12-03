import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import {
  Keyboard,
  Scrollbar,
  FreeMode,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

export default function SwiperReact() {
  return (
    <div className="px-2 md:px-28 mt-20">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
        We have properties in all of Spain
      </h1>
      <h3 className="text-lg md:text-xl text-center mb-6">
        Please check our latest updates
      </h3>

      <Swiper
        spaceBetween={50}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
        freeMode={true}
        scrollbar={false}
        navigation={true}
        keyboard={{ enabled: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[
          FreeMode,
          Pagination,
          Navigation,
          Scrollbar,
          Keyboard,
          Autoplay,
        ]}
        className="w-full h-full"
      >
        {/* Madrid */}
        <SwiperSlide className="relative flex justify-center items-center rounded-2xl">
          <img
            src="./images/cities/madrid/madrid4.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-0 bottom-5 bg-black/60 p-4 text-start">
            <p className="text-2xl font-[Aladin] text-white mb-2">
              Madrid is always beautiful!
            </p>
            <p className="text-white text-sm md:text-base font-light text-justify">
              Madrid, Spain's capital and largest city, is a vibrant hub of
              culture, history, and modernity, located in the center of the
              Iberian Peninsula. It's known for its rich artistic heritage,
              stunning architecture, and thriving nightlife.
            </p>
          </div>
        </SwiperSlide>

        {/* Barcelona */}
        <SwiperSlide className="relative flex justify-center items-center rounded-2xl">
          <img
            src="./images/cities/barcelona/barca2.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-0 bottom-5 bg-black/60 p-4 text-start">
            <p className="text-2xl font-[Aladin] text-white mb-2">
              Vamos a Barcelona!
            </p>
            <p className="text-white text-sm md:text-base font-light text-justify">
              Barcelona is a vibrant Mediterranean city, the capital of
              Catalonia, and a major cultural and commercial center in Spain.
              It's known for its unique blend of history, art, culture, and
              modern life.
            </p>
          </div>
        </SwiperSlide>

        {/* Valencia */}
        <SwiperSlide className="relative flex justify-center items-center rounded-2xl">
          <img
            src="./images/cities/valencia/valencia1.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-0 bottom-5 bg-black/60 p-4 text-start">
            <p className="text-2xl font-[Aladin] text-white mb-2">
              Valencia es muy elegante!
            </p>
            <p className="text-white text-sm md:text-base font-light text-justify">
              Valencia is a vibrant and historic Spanish city, located on the
              Mediterranean coast and known for its rich cultural heritage and
              modern attractions.
            </p>
          </div>
        </SwiperSlide>

        {/* Sevilla */}
        <SwiperSlide className="relative flex justify-center items-center rounded-2xl">
          <img
            src="./images/cities/sevilla/sevilla1.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-0 bottom-5 bg-black/60 p-4 text-start">
            <p className="text-2xl font-[Aladin] text-white mb-2">
              Ahora Sevilla!
            </p>
            <p className="text-white text-sm md:text-base font-light text-justify">
              Seville, also known as Sevilla in Spanish, is a vibrant city in
              Andalusia, Spain. It's the capital of Andalusia and the
              fourth-largest city in Spain.
            </p>
          </div>
        </SwiperSlide>

        {/* Zaragoza */}
        <SwiperSlide className="relative flex justify-center items-center rounded-2xl">
          <img
            src="./images/cities/zaragoza/zaragoza3.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute left-0 bottom-5 bg-black/60 p-4 text-start">
            <p className="text-2xl font-[Aladin] text-white mb-2">
              Zaragoza, Magnifica!
            </p>
            <p className="text-white text-sm md:text-base font-light text-justify">
              Zaragoza, a city with over 2,000 years of history, stands as a
              crossroads of cultures and a dynamic, modern metropolis in Spain.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
