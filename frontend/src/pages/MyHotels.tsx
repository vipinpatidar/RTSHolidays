import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import Button from "../ui/Button";
import { useToastContext } from "../contexts/toast-context";
import { MdDelete, MdEditDocument } from "react-icons/md";

export type MyHotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdate: Date;
};

type HotelsComingDataType = Promise<{
  success: boolean;
  message: string;
  statusCode: number;
  responseData: MyHotelType[];
}>;

const MyHotels = () => {
  const makePrivateRequest = useAxiosPrivateRequest();
  const { showToastMsg } = useToastContext();
  const queryClient = useQueryClient();

  //GET all hotel of loggedIn user
  const { data, isLoading, error } = useQuery({
    queryKey: ["myHotels"],
    queryFn: async (): HotelsComingDataType => {
      const response = await makePrivateRequest.get(
        "/my-hotels/get-all-hotels"
      );

      return response.data;
    },
  });

  const hotels = !isLoading && !error && data && data.responseData;
  //   console.log(hotels);

  //DELETE Hotel of loggedIn User
  const { mutate } = useMutation({
    mutationFn: (hotelId: string) => {
      return makePrivateRequest.delete(`/my-hotels/delete-hotel/${hotelId}`);
    },
    onSuccess: () => {
      showToastMsg({
        message: "Your Hotel Successfully Deleted.",
        type: "SUCCESS",
      });
      queryClient.invalidateQueries({
        queryKey: ["myHotels"],
      });
    },
    onError: (error) => {
      console.log(error);
      showToastMsg({
        message:
          (error.response?.data as { message: string })?.message ||
          error.message ||
          "Opps! Something went wrong.",
        type: "ERROR",
      });
    },
  });

  return (
    <div className="mt-4">
      <div className="flex items-center justify-center mb-16">
        <Button
          to={"/add-hotel"}
          className="flex items-center text-white px-6 font-semibold bg-hero hover:bg-hover outline-none border-none py-[12px]"
        >
          ADD YOUR HOTELS
        </Button>
      </div>

      {isLoading && !error && (
        <div>
          <h2 className="my-6 text-center text-2xl font-semibold">
            Loading...
          </h2>
        </div>
      )}
      {hotels && hotels.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,_1fr))] gap-6 justify-items-center">
          {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="flex flex-col gap-4 border border-slate-300 rounded p-4 max-w-[550px]"
            >
              <h2 className="text-2xl font-semibold">{hotel.name}</h2>
              <p className="whitespace-pre-line">
                {hotel.description.slice(0, 260)}...
              </p>
              <div className="flex gap-4 flex-wrap ">
                <div className="border rounded flex items-center gap-3 py-2 px-3">
                  <p className="capitalize">🏙️ {hotel.city},</p>
                  <p className="capitalize">🌏 {hotel.country}</p>
                </div>
                <div className="border rounded flex items-center gap-3 py-2 px-3">
                  <p className="capitalize">🛌 {hotel.type}</p>
                </div>
                <div className="border rounded flex items-center gap-3 py-2 px-3">
                  <p className="capitalize">
                    💵 ₹{hotel.pricePerNight} Per Night
                  </p>
                </div>

                <div className="border rounded flex items-center gap-3 py-2 px-3">
                  <p className="capitalize">
                    ⭐ {hotel.starRating} Star Rating{" "}
                  </p>
                </div>
                <div className="border rounded flex items-center gap-3 py-2 px-3">
                  <p className="capitalize">👨‍👩‍👧‍👦 {hotel.adultCount} Adult,</p>
                  <p className="capitalize">🧒 {hotel.childCount} Children</p>
                </div>
              </div>
              <div className="flex justify-between items-center my-2 px-6">
                <Button onClick={() => mutate(hotel._id)}>
                  <MdDelete className="text-2xl text-red-500 hover:text-red-600 cursor-pointer" />
                </Button>
                <Button to={`/edit-hotel/${hotel._id}`}>
                  <MdEditDocument className="text-2xl text-blue-500 hover:text-blue-600 cursor-pointer" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading &&
        !error && (
          <div className="mt-20 mb-6 bg-blue-200 px-8 py-2 rounded-full text-center w-max mx-auto">
            <span className="font-semibold">
              No Hotels Found. Please Add Your Own Hotel.
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default MyHotels;
