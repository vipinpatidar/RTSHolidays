import Stripe from "stripe";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { BookingType, MyHotel } from "../models/my-hotels.model";

/*=================== STRIPE PAYMENT INTENT  ================= */

const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string);

export const postPaymentIntent = asyncHandler(async (req, res, next) => {
  //1. total cost 2. hotelId 3. userId
  const { hotelId } = req.params;
  const { numberOfNights } = req.body;

  // console.log(numberOfNights, hotelId);

  const userId = req.userId;

  const hotel = await MyHotel.findById({ _id: hotelId });

  if (!hotel) {
    throw new ApiError(400, "Hotel Is Required.");
  }

  const totalCost = hotel?.pricePerNight * +numberOfNights;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "inr",
    metadata: {
      hotelId,
      userId: userId,
    },
  });

  if (!paymentIntent.client_secret) {
    throw new ApiError(500, "Error while creating payment intent.");
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.status(200).json(response);
});

/*=================== ADD USER BOOKING TO HOTELS ================= */

export const postAddBookingsToHotels = asyncHandler(async (req, res, next) => {
  //1. total cost 2. hotelId 3. userId
  const { hotelId } = req.params;

  const {
    paymentIntentId,
    firstName,
    lastName,
    email,
    adultCount,
    checkIn,
    checkOut,
    childCount,
    totalCost,
  } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    paymentIntentId as string
  );

  if (!paymentIntent) {
    throw new ApiError(400, "Invalid Payment Intent");
  }

  if (
    paymentIntent.metadata.hotelId !== hotelId ||
    paymentIntent.metadata.userId !== req.userId
  ) {
    throw new ApiError(400, "Payment intent mismatch.");
  }

  if (paymentIntent.status !== "succeeded") {
    throw new ApiError(
      400,
      `The transaction is not successful. Current status : ${paymentIntent.status}`
    );
  }

  const newBooking: BookingType = {
    userId: req.userId,
    firstName: firstName,
    lastName,
    email,
    adultCount,
    childCount,
    checkIn,
    checkOut,
    totalCost,
  };

  const hotel = await MyHotel.findByIdAndUpdate(
    { _id: hotelId },
    {
      $push: { bookings: newBooking },
    }
  );

  if (!hotel) {
    throw new ApiError(404, "Hotel not found for booking");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully created a booking"));
});

/*=================== GET LOGGED USER BOOKINGS ================= */

export const getLoggedInUsersBookings = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const hotels = await MyHotel.find({
    bookings: { $elemMatch: { userId: userId } },
  });

  // Same booked hotel should not appear twice only get booking information and add to new bookings array

  const result = hotels.map((hotel) => {
    const userBookings = hotel.bookings.filter(
      (booking) => booking.userId === userId
    );

    const hotelWithUserBookings = {
      ...hotel.toObject(),
      bookings: userBookings,
    };

    return hotelWithUserBookings;
  });

  res
    .status(200)
    .json(new ApiResponse(200, result, "Booked Hotels fetched successfully."));
});
