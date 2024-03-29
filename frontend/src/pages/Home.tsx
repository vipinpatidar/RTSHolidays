import { useQuery } from "@tanstack/react-query";
import { openRequest } from "../utils/axios";

import { MdOutlineFoodBank, MdOutlineHotel } from "react-icons/md";
import Reviews from "../components/Reviews";
import NewsLetter from "../components/NewsLetter";
import { MyHotelType } from "./MyHotels";
import HomeHotelsCards from "../components/HomeHotelsCards";
import Button from "../ui/Button";
import { useSearchContext } from "../contexts/hotels.context";

export type ApiResponseType = {
  success: boolean;
  statusCode: number;
  responseData: MyHotelType[];
  message: string;
};

const Home = () => {
  const searchValues = useSearchContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["homeHotels"],
    queryFn: async (): Promise<ApiResponseType> => {
      const response = await openRequest.get("/hotels/get-hotels");

      return response.data;
    },
  });

  const onHotelsClick = () => {
    searchValues.saveSearchedValues("", new Date(), new Date(), 1, 0);
  };

  const hotels = !isLoading && !error && data && data.responseData;

  // console.log(hotels);

  return (
    <div className="w-full mt-10">
      <div className="mb-36 max-w-[1300px] mx-auto">
        <h3 className="text-xl font-semibold  tracking-[1px] mb-0 flex gap-x-2 items-center justify-center">
          <span>
            <MdOutlineHotel className="text-gray-600 text-2xl" />
          </span>{" "}
          <span className="text-[#0575e6] uppercase">Hotels</span>
        </h3>
        <h2 className=" text-3xl lg:text-[50px] mt-3  text-center">
          Anytime, Anywhere
        </h2>

        <div className="text-center my-6 lg:mt-10">
          <Button
            to={"/search"}
            className="px-6 py-[10px] bg-hero hover:bg-hover uppercase text-white"
            onClick={onHotelsClick}
          >
            See More HOtels
          </Button>
        </div>
        <div className="mt-16">
          {isLoading && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Loading...</h2>
            </div>
          )}
          {hotels && hotels.length > 0 ? (
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {hotels.slice(0, 6).map((hotel) => (
                <HomeHotelsCards key={hotel._id} hotel={hotel} />
              ))}
            </div>
          ) : (
            !isLoading && (
              <div className="text-center px-10 py-2 bg-blue-200 rounded-full w-max">
                <p>No Hotels.</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* testmonials */}
      <div className="search-container mx-auto overflow-hidden text-center mb-24">
        <h3 className="text-xl font-semibold  tracking-[1px] mb-0 flex gap-x-2 items-center justify-center">
          <span>
            <MdOutlineFoodBank className="text-gray-600 text-2xl" />
          </span>{" "}
          <span className="text-[#0575e6] uppercase">Reviews</span>
        </h3>
        <h2 className=" text-3xl lg:text-[50px] my-4 lg:my-7">
          What Our Clients Says
        </h2>
        <p className="text-lg mb-8 lg:mb-14 lg:px-32">
          Proin consectetur non dolor vitae pulvinar. Pellentesque sollicitudin
          dolor eget neque viverra, sed interdum metus interdum. Cras lobortis
          pulvinar dolor, sit amet ullamcorper dolor iaculis vel
        </p>
        <Reviews />
      </div>
      <NewsLetter />
    </div>
  );
};

export default Home;
