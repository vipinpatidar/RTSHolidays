type HeroPropType = {
  img: string;
  pera: string;
  heading: string;
};

const Hero = ({ img, pera, heading }: HeroPropType) => {
  return (
    <div className="heroSlider h-[800px] lg:h-[640px] ">
      <div className="h-full relative flex justify-center items-center ">
        <div className="z-20 text-white text-center mb-7">
          <div className="uppercase font-tertiary tracking-[6px] mb-5">
            {pera}
          </div>
          <h1 className="text-[32px] font-primary uppercase tracking-[2px] max-w-[920px] lg:text-[60px] leading-tight mb-6 mx-auto">
            {heading}
          </h1>
        </div>
        <div className="absolute top-0 w-full h-full">
          <img
            className="object-cover h-full w-full"
            src={img}
            alt="img slider"
          />
        </div>
        {/* overlay */}
        <div className="absolute top-0 w-full h-full bg-black/60"></div>
      </div>
    </div>
  );
};

export default Hero;
