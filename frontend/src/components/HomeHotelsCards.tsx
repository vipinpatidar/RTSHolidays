import { BsPeople } from "react-icons/bs";
import { MyHotelType } from "../pages/MyHotels";
import { Link } from "react-router-dom";
import { FaChildren } from "react-icons/fa6";
import Button from "../ui/Button";
type HomeHotelsCardsProps = {
  hotel: MyHotelType;
};

const HomeHotelsCards = ({ hotel }: HomeHotelsCardsProps) => {
  const {
    imageUrls,
    adultCount,
    childCount,
    _id,
    name,
    description,
    pricePerNight,
    type,
    city,
    country,
  } = hotel;

  return (
    <div className="bg-white border border-slate-300  min-h-[500px] group w-[340px]">
      {/* image */}
      <div className="overflow-hidden">
        <img
          className="group-hover:scale-110 transition-all duration-300 w-full h-[250px]"
          src={imageUrls[0]}
          alt="room img "
        />
      </div>
      {/* details */}
      <div className="bg-white shadow-md max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
        <div className="flex justify-between items-center w-[85%]">
          {/* people size */}
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <BsPeople className="text-[18px] text-gray-600" />
            </div>
            <div className="flex gap-x-1">
              <div className="text-gray-600">Adults</div>
              <div>{adultCount}</div>
            </div>
          </div>
          {/* room cpacity */}
          <div className="flex items-center gap-x-2">
            <div className="text-accent">
              <FaChildren className="text-[18px] text-gray-600" />
            </div>
            <div className="flex gap-x-1">
              <div className="text-gray-600">Children</div>
              <div>{childCount}</div>
            </div>
          </div>
        </div>
      </div>
      {/* name, desciption */}
      <div className="text-center -mt-2">
        <Link to={`/hotel-details/${_id}`}>
          <h3 className="text-2xl font-medium">{name}</h3>
          <p className="text-sm font-medium text-gray-600">( {type} )</p>
        </Link>
        <div className="flex items-center gap-2 justify-center mt-2 font-semibold">
          <p>{city},</p>
          <p>{country}</p>
        </div>
        <p className="mx-auto mb-3 lg:mb-6 max-w-[300px]">
          {description.slice(0, 68)}...
        </p>
      </div>
      {/* button */}
      <div className="flex items-center justify-center mb-6">
        <Button
          to={`/hotel-details/${_id}`}
          className="bg-hero hover:bg-hover  py-[12px] px-6 text-white  mx-auto"
        >
          Book now form ₹{pricePerNight} <span className="text-xs">P/N</span>
        </Button>
      </div>
    </div>
  );
};

export default HomeHotelsCards;
