import { Router } from "express";
import {
  deleteHotel,
  getAHotelData,
  getAllOwnerHotels,
  postCreateMyHotel,
  putUpdateHotel,
} from "../controllers/my-hotels.controller";
import { schemaValidatorMid } from "../middlewares/schemaValidator";
import { myHotelSchema } from "../validator/schemas";
import { verifyJwtToken } from "../middlewares/verifyToken";

export const myHotelsRoutes = Router();

myHotelsRoutes.use(verifyJwtToken);

myHotelsRoutes
  .route("/create")
  .post(schemaValidatorMid(myHotelSchema), postCreateMyHotel);

myHotelsRoutes.route("/get-all-hotels").get(getAllOwnerHotels);

myHotelsRoutes.route("/:hotelId").get(getAHotelData);

myHotelsRoutes.route("/update-hotel/:hotelId").put(putUpdateHotel);

myHotelsRoutes.route("/delete-hotel/:hotelId").delete(deleteHotel);
