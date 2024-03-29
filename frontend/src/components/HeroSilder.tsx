import { Swiper, SwiperSlide } from "swiper/react";
//Swiper style
import "swiper/css";
import "swiper/css/effect-fade";
//required modules
import { Autoplay, EffectFade } from "swiper/modules";
//images
import img1 from "../assets/11.jpg";
import img2 from "../assets/22.jpg";
import img3 from "../assets/7.jpg";
import img4 from "../assets/44.jpg";
import img5 from "../assets/8.jpg";
//Link
// import { Link } from "react-router-dom";

// slider object

const slides = [
  {
    title: "Hotels For Vacation",
    bg: img1,
    btnText: "See Our Rooms",
  },
  {
    title: "Hotels For Vacation",
    bg: img2,
    btnText: "See Our Rooms",
  },
  {
    title: "Hotels For Vacation",
    bg: img3,
    btnText: "See Our Rooms",
  },
  {
    title: "Hotels For Vacation",
    bg: img4,
    btnText: "See Our Rooms",
  },
  {
    title: "Hotels For Vacation",
    bg: img5,
    btnText: "See Our Rooms",
  },
];

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider h-[800px] lg:h-[650px]"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide
          className="h-full relative flex justify-center items-center"
          key={idx}
        >
          <div className="z-20 text-white text-center px-3 mb-7">
            <div className="uppercase font-tertiary tracking-[6px] mb-4">
              Take It From Us. You're In Good Hands
            </div>
            <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[56px] leading-tight mb-6 mx-auto">
              {slide.title}
            </h1>
            {/* <Link to="/contact">
              <button className="btn btn-lg btn-primary mx-auto">
                Contact Us
              </button>
            </Link> */}
          </div>
          <div className="absolute top-0 w-full h-full">
            <img
              className="object-cover h-full w-full"
              src={slide.bg}
              alt="img slider"
            />
          </div>
          {/* overlay */}
          <div className="absolute top-0 w-full h-full bg-black/70"></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
