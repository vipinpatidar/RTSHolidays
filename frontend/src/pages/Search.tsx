import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/hotels.context";
import { openRequest } from "../utils/axios";

import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/Filters/StarRatingFilter";
import HotelTypesFilter from "../components/Filters/HotelTypesFilter";
import FacilitiesFilter from "../components/Filters/FacilitiesFilter";
import PriceFilter from "../components/Filters/PriceFilter";
import Button from "../ui/Button";
import { MdFilterList } from "react-icons/md";
import { HotelsResponseType } from "../types/types";

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

type SearchApiResponseType = {
  success: boolean;
  message: string;
  responseData: HotelsResponseType;
  statusCode: number;
};

const Search = () => {
  const searchedValues = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(1000000000);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("");

  const filterSearchValues = {
    destination: searchedValues.destination,
    checkIn: searchedValues.checkIn,
    checkOut: searchedValues.checkOut,
    adultCount: searchedValues.adultCount,
    childCount: searchedValues.childCount,
    page: page,
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedMaxPrice,
    sortOption: sortOption,
  };

  const starChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevState) =>
      event.target.checked
        ? [...prevState, starRating]
        : prevState.filter((star) => star !== starRating)
    );
  };
  const hotelTypesChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevState) =>
      event.target.checked
        ? [...prevState, hotelType]
        : prevState.filter((type) => type !== hotelType)
    );
  };

  const facilitiesChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilityType = event.target.value;

    setSelectedFacilities((prevState) =>
      event.target.checked
        ? [...prevState, facilityType]
        : prevState.filter((facility) => facility !== facilityType)
    );
  };

  const makPriceChangeHandler = (value: number | undefined) => {
    if (value) {
      setSelectedMaxPrice(value);
    }
  };

  //   console.log(searchedValues);

  const { data, isLoading, error } = useQuery({
    queryKey: ["hotels", filterSearchValues],
    queryFn: async (): Promise<SearchApiResponseType> => {
      const searchParams = new URLSearchParams();
      searchParams.append("destination", filterSearchValues.destination || "");
      searchParams.append(
        "checkIn",
        filterSearchValues.checkIn.toString() || ""
      );
      searchParams.append(
        "checkOut",
        filterSearchValues.checkOut.toString() || ""
      );
      searchParams.append(
        "adultCount",
        filterSearchValues.adultCount.toString() || ""
      );
      searchParams.append(
        "childCount",
        filterSearchValues.childCount.toString() || ""
      );
      searchParams.append("page", filterSearchValues.page.toString() || "");
      filterSearchValues.stars?.forEach((star) =>
        searchParams.append("stars", star)
      );
      filterSearchValues.types?.forEach((type) =>
        searchParams.append("types", type)
      );
      filterSearchValues.facilities?.forEach((facility) =>
        searchParams.append("facilities", facility)
      );

      searchParams.append(
        "maxPrice",
        filterSearchValues.maxPrice.toString() || ""
      );
      searchParams.append(
        "sortOption",
        filterSearchValues.sortOption.toString() || ""
      );

      const response = await openRequest.get(
        `/hotels/search-hotel?${searchParams}`
      );
      return response.data;
    },
  });

  const responseInfo = !isLoading && !error && data && data.responseData;
  // console.log(responseInfo);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 my-6">
      {/* Left Side */}
      <div className="rounded-lg overflow-hidden border border-slate-300 h-fit sticky top-2 lg:top-10 shadow-md lg:shadow-none bg-white ">
        <div className="pt-4 pb-4 text-center w-full border-b border-slate-300 flex items-center px-4">
          <div className="ml-auto lg:mx-auto flex items-center gap-2">
            <MdFilterList className="text-2xl text-gray-600" />
            <h3 className="text-lg font-semibold text-[#0575e6]">Filter By</h3>
          </div>
          <Button
            className="flex items-center text-white px-6 font-semibold bg-hero hover:bg-hover outline-none border-none py-[7px] ml-auto lg:hidden rounded-full"
            onClick={() => setIsFiltersOpen((prev) => !prev)}
          >
            {isFiltersOpen ? "Close Filter" : "Open Filters"}
          </Button>
        </div>
        {/*TODO: Filters */}

        <div
          className={`overflow-auto lg:overflow-hidden flex-row lg:flex-col gap-8 lg:gap-2 mt-4 p-4 ${
            isFiltersOpen ? "lg:flex flex" : "hidden lg:flex"
          }`}
        >
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={starChangeHandler}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={hotelTypesChangeHandler}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={facilitiesChangeHandler}
          />
          <PriceFilter
            selectedPrice={selectedMaxPrice}
            onChange={makPriceChangeHandler}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center mt-4 flex-wrap gap-y-3">
          {responseInfo && responseInfo.pagination.totalHotels > 0 ? (
            <span className="text-xl font-semibold">
              {responseInfo.pagination.totalHotels} Hotels Found{" "}
              {searchedValues.destination
                ? `in ${searchedValues.destination}`
                : ""}
            </span>
          ) : (
            <span className="text-xl font-semibold"></span>
          )}
          {/* TODO: Sort options*/}

          <select
            className="p-2 border rounded-md w-max outline-none"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (Low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (High to low)
            </option>
          </select>
        </div>
        <div className="flex flex-col gap-5 justify-center mt-2">
          {isLoading && !error && (
            <div className="text-center w-max mx-auto mt-12">
              <h2 className="text-2xl">Loading...</h2>
            </div>
          )}

          {responseInfo && responseInfo.data.length > 0
            ? responseInfo.data.map((hotel) => (
                <SearchResultCard hotel={hotel} key={hotel._id} />
              ))
            : !isLoading && (
                <div className="px-8 py-2 text-center w-max mx-auto bg-blue-300 mt-12 rounded-full">
                  <p className="">No hotel found. Try other search options</p>
                </div>
              )}
        </div>
        <div className="mt-8">
          {responseInfo && responseInfo.pagination.totalPages > 1 && (
            <Pagination
              page={responseInfo.pagination.page}
              pages={responseInfo.pagination.totalPages}
              onPageNumChange={(num: number) => {
                setPage(num);
                window.scrollTo(0, 600);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
