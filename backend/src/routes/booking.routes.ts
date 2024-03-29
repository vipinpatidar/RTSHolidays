import { Router } from "express";
import { verifyJwtToken } from "../middlewares/verifyToken";
import {
  getLoggedInUsersBookings,
  postAddBookingsToHotels,
  postPaymentIntent,
} from "../controllers/booking.controller";

export const bookingRoutes = Router();

bookingRoutes.use(verifyJwtToken);

bookingRoutes.route("/payment-intent/:hotelId").post(postPaymentIntent);

bookingRoutes.route("/hotelBookings/:hotelId").post(postAddBookingsToHotels);

bookingRoutes.route("/bookedHotels").get(getLoggedInUsersBookings);
