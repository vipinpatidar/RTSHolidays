import joi, { ObjectSchema } from "joi";
import { MyHotelType } from "../models/my-hotels.model";

const registerSchema = joi.object().keys({
  firstName: joi.string().min(2).max(40).required(),
  lastName: joi.string().min(2).max(40).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const myHotelSchema = joi.object().keys({
  name: joi
    .string()
    .required()
    .min(3)
    .messages({ "string.required": "Hotel name is required." }),
  city: joi.string().required().min(3),
  country: joi.string().required().min(3),
  description: joi.string().required().min(3),
  type: joi.string().required().min(3),
  adultCount: joi.number().integer().positive().greater(0).required(),
  childCount: joi.number().integer().positive().greater(0).required(),
  facilities: joi.array().items(joi.string()).min(1).required(),
  pricePerNight: joi.number().integer().positive().greater(0).required(),
  starRating: joi.number().integer().positive().min(1).max(5).required(),
  imageUrls: joi.array().items(joi.string()).min(1),
});

export { registerSchema, loginSchema, myHotelSchema };
