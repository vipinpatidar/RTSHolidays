import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { MyHotelType, MyHotel } from "../models/my-hotels.model";
import { deleteOnCloudinary } from "../uploads/cloudinary";

/*================== CREATE NEW HOTEL ==================== */

export const postCreateMyHotel = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const {
    name,
    city,
    country,
    childCount,
    adultCount,
    description,
    type,
    facilities,
    pricePerNight,
    starRating,
    imageUrls,
  } = req.body as MyHotelType;

  if (
    [name, city, country, description, type].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const myHotelInputObj = {
    userId: userId,
    name,
    city,
    country,
    childCount,
    adultCount,
    description,
    type,
    facilities,
    pricePerNight,
    starRating,
    imageUrls: imageUrls,
    lastUpdate: new Date(),
  };

  const myHotelObj = new MyHotel(myHotelInputObj);
  await myHotelObj.save();

  res
    .status(201)
    .json(new ApiResponse(200, {}, "A Hotel created successfully!"));
});

/*================== GET ALL HOTELS OF OWNER ==================== */

export const getAllOwnerHotels = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const hotels = await MyHotel.find({ userId: userId });

  res
    .status(200)
    .json(
      new ApiResponse(200, hotels, "Successfully got all Hotels of the User")
    );
});

/*================== GET ONE HOTEL ==================== */

export const getAHotelData = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { hotelId } = req.params;

  const hotel = await MyHotel.findOne({ _id: hotelId, userId: userId });

  if (!hotel) {
    throw new ApiError(404, "Hotel not found.");
  }

  res.status(200).json(new ApiResponse(200, hotel));
});

/*================== EDIT HOTEL ==================== */

export const putUpdateHotel = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { hotelId } = req.params;

  const {
    name,
    city,
    country,
    childCount,
    adultCount,
    description,
    type,
    facilities,
    pricePerNight,
    starRating,
    imageUrls,
  } = req.body as MyHotelType;

  if (
    [name, city, country, description, type].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  const myHotelInputObj = {
    userId: userId,
    name,
    city,
    country,
    childCount,
    adultCount,
    description,
    type,
    facilities,
    pricePerNight,
    starRating,
    lastUpdate: new Date(),
  };

  const hotel = await MyHotel.findByIdAndUpdate(
    {
      _id: hotelId,
      userId: userId,
    },
    myHotelInputObj,
    { new: true }
  );

  if (!hotel) {
    throw new ApiError(404, "Hotel not found.");
  }

  hotel.imageUrls = [...hotel.imageUrls, ...(imageUrls || [])];
  await hotel.save();

  res.status(200).json(new ApiResponse(200, hotel));
});

/*================== DELETE HOTEL ==================== */

export const deleteHotel = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { hotelId } = req.params;

  const hotel = await MyHotel.findByIdAndDelete({
    _id: hotelId,
    userId: userId,
  });

  if (!hotel) {
    throw new ApiError(404, "You can not delete this hotel.");
  }

  hotel?.imageUrls.forEach(async (url) => {
    await deleteOnCloudinary(url);
  });

  // console.log(hotel);

  res.status(200).json("Hotel deleted");
});
