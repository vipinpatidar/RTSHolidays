import { useParams } from "react-router-dom";
import { openRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";
import { MyHotelType } from "./MyHotels";
import GuestInfoForm from "../components/GuestInfoForm";

export type HotelApiResponseType = {
  success: boolean;
  responseData: MyHotelType;
  statusCode: number;
  message: string;
};

const HotelDetails = () => {
  const { hotelId } = useParams();
  //   console.log(hotelId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: async (): Promise<HotelApiResponseType> => {
      const response = await openRequest.get(`/hotels/${hotelId}`);
      return response.data;
    },
    enabled: !!hotelId,
  });

  const hotelInfo = !isLoading && !error && data && data.responseData;
  //   console.log(hotelInfo);

  return (
    <div className="my-6">
      {hotelInfo && (
        <>
          <div>
            <p className="flex items-center gap-2 mb-2">
              <span className="flex items-center">
                {Array.from({ length: hotelInfo.starRating }).map(() => "⭐")}
              </span>
              <span className="font-medium">( {hotelInfo.type} )</span>
            </p>
            <div className="flex flex-row  gap-2 items-end  justify-between md:justify-normal">
              <div className="flex flex-col md:flex-row gap-2 md:gap-3 md:items-end">
                <h1 className="text-3xl font-semibold">{hotelInfo.name}</h1>
                <div className="flex items-center gap-3 ">
                  <span className="font-medium capitalize">
                    🌏 {hotelInfo.city}, {hotelInfo.country}
                  </span>
                  <div className="flex items-center gap-2 font-medium capitalize">
                    <p>👨‍👩‍👧‍👦 Adult {hotelInfo.adultCount}</p>
                    <p>Children {hotelInfo.childCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-2 grid-cols-1 md:grid-cols-[1fr_1fr] rounded-2xl overflow-hidden relative mt-6">
            <div className="row-span-full">
              {hotelInfo.imageUrls?.[0] && (
                <img
                  className="h-full hover:opacity-[0.95] cursor-pointer"
                  src={`${hotelInfo.imageUrls[0]}`}
                  alt="place photo"
                />
              )}
            </div>
            <div className="row-span-1 hidden md:block">
              {hotelInfo.imageUrls?.[1] && (
                <img
                  className="h-full hover:opacity-[0.95] cursor-pointer"
                  src={`${hotelInfo.imageUrls[1]}`}
                  alt="place photo"
                />
              )}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {hotelInfo.facilities.map((facility) => (
                <div
                  className="border border-slate-300 rounded-sm p-3"
                  key={facility}
                >
                  {facility}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 relative">
              <div className="whitespace-pre-line">{hotelInfo.description}</div>
              <div className="h-fit sticky top-8 lg:mt-8">
                <GuestInfoForm
                  pricePerNight={hotelInfo.pricePerNight}
                  hotelId={hotelInfo._id}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HotelDetails;
