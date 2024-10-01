import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { MyHotelType, MyHotel } from "../models/my-hotels.model";
import { constructSearchQuery } from "../utils/getQuery";

export const getSearchHotel = asyncHandler(async (req, res, next) => {
  const { page } = req.query;
  const query = constructSearchQuery(req.query);

  // console.log(query);

  let sortOptions = {};

  switch (req.query.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;

    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;

    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const pageSize = 3;
  const pageNumber = parseInt(page ? page.toString() : "1");

  //hotel to skip according to page number
  const skip = (pageNumber - 1) * pageSize;

  const hotels = await MyHotel.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

  const totalHotels = await MyHotel.countDocuments(query);

  const response = {
    data: hotels,
    pagination: {
      totalHotels,
      page: pageNumber,
      totalPages: Math.ceil(totalHotels / pageSize),
    },
  };

  res
    .status(200)
    .json(new ApiResponse(200, response, "Hotels Fetch successfully."));
});

/* ================== GET SINGLE HOTEL DETAILS =================== */

export const getSingleHotelDetails = asyncHandler(async (req, res, next) => {
  const { hotelId } = req.params;

  if (!hotelId) {
    throw new ApiError(404, "Hotel identity is required.");
  }

  const hotel = await MyHotel.findById({ _id: hotelId });

  if (!hotel) {
    throw new ApiError(404, "Hotel not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, hotel, "Hotel Fetch successfully."));
});

/*================== GET LAST UPDATE HOTELS ==================== */

export const getLastUpdateHotels = asyncHandler(async (req, res, next) => {
  const hotels = await MyHotel.find().sort("-lastUpdate");

  res
    .status(200)
    .json(
      new ApiResponse(200, hotels, "Fetched hotels according to last updates.")
    );
});
