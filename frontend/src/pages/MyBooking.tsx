import { useQuery } from "@tanstack/react-query";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { MyHotelType } from "../types/types";
// import { MyHotelType } from "./MyHotels";

type MyBookingResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  responseData: MyHotelType[];
};

const MyBookings = () => {
  const makePrivateRequest = useAxiosPrivateRequest();

  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBooking"],
    queryFn: async (): Promise<MyBookingResponse> => {
      const response = await makePrivateRequest.get("/bookings/bookedHotels");
      return response.data;
    },
  });

  const hotelsData = !isLoading && !error && hotels && hotels.responseData;

  // console.log(hotelsData);

  return (
    <div className="my-6">
      {isLoading && (
        <div className="text-center">
          <h2 className="font-semibold text-lg">Loading...</h2>
        </div>
      )}

      {hotelsData && hotelsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(330px,max-content))] gap-4 place-items-center lg:place-items-start w-full">
          {hotelsData.map((hotelsData) => (
            <div
              className="grid grid-cols-1 border border-slate-300 rounded-lg p-3 gap-4 max-w-[330px] "
              key={hotelsData._id}
            >
              <div className="lg:w-full lg:h-[250px]">
                <img
                  src={hotelsData.imageUrls[0]}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{hotelsData.name}</h2>
                  <p className="text-sm font-medium">
                    🌏 {hotelsData.city}, {hotelsData.country}
                  </p>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[90px]">
                  {hotelsData.bookings &&
                    hotelsData.bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border-b pb-4 last:pb-0 last:border-none"
                      >
                        <div>
                          <span className="font-semibold mr-2">Dates:</span>
                          <span className="font-medium text-sm text-gray-600">
                            {new Date(booking.checkIn).toDateString()} -
                            {new Date(booking.checkOut).toDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold mr-2">Guests:</span>
                          <span className="font-medium text-sm text-gray-600">
                            {booking.adultCount} Adults, {booking.childCount}{" "}
                            Children
                          </span>
                        </div>
                        <div className="flex items-center gap-1 justify-center mt-2">
                          <span className=" text-2xl font-medium ">
                            ₹{booking.totalCost}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            total price
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading &&
        !error && (
          <div className="mt-10 mb-6 bg-blue-200 px-8 py-2 rounded-full text-center w-max mx-auto">
            <span className="font-semibold">
              No Bookings Found. Book A Hotel :)
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default MyBookings;
