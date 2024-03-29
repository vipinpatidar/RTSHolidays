import { Router } from "express";
import {
  getSearchHotel,
  getSingleHotelDetails,
  getLastUpdateHotels,
} from "../controllers/hotel.controller";

export const hotelRoutes = Router();

hotelRoutes.route("/search-hotel").get(getSearchHotel);
hotelRoutes.route("/get-hotels").get(getLastUpdateHotels);

hotelRoutes.route("/:hotelId").get(getSingleHotelDetails);
