import { MyHotelType } from "../types/types";
import Button from "../ui/Button";

type SearchResultCardType = {
  hotel: MyHotelType;
};

const SearchResultCard = ({ hotel }: SearchResultCardType) => {
  const {
    _id,
    city,
    country,
    starRating,
    imageUrls,
    description,
    facilities,
    name,
    pricePerNight,
    type,
    adultCount,
    childCount,
  } = hotel;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-3 gap-4 ">
      <div className="w-full h-[200px] lg:h-full">
        <img
          src={imageUrls[0]}
          alt="hotel image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_1.3fr_1fr] gap-3 py-1 ">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex items-center mb-1">
              {Array.from({ length: starRating }).map(() => {
                return "⭐";
              })}
            </span>
            <span className="font-medium text-gray-600 mb-1 text-sm">
              ( {type} )
            </span>
          </div>
          <Button
            to={`/hotel-details/${_id}`}
            className="text-xl font-semibold text-gray-900"
          >
            {name}
          </Button>
          <p className="text-sm capitalize">
            {city}, {country}
          </p>
        </div>
        <div>
          <p className="font-medium text-base text-gray-700 line-clamp-4">
            {description}
          </p>
        </div>
        <div className="flex items-end justify-between whitespace-nowrap">
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              (<p>Adult {adultCount}</p>
              <p>Children {childCount}</p>)
            </div>
            <div className="flex items-center gap-1 justify-start">
              {facilities.slice(0, 2).map((facility) => (
                <span
                  className="bg-gray-300 font-medium px-3 py-[6px] text-sm"
                  key={facility}
                >
                  {facility}
                </span>
              ))}{" "}
              {facilities.length > 2 && (
                <span className="text-sm">+{facilities.length - 2} More</span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium mb-2">
              <span className="text-xl">₹{pricePerNight}</span> per night
            </p>
            <Button
              to={`/hotel-details/${_id}`}
              className="bg-hero hover:bg-hover text-white h-full px-5 py-[8px] text-sm  w-max uppercase"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
