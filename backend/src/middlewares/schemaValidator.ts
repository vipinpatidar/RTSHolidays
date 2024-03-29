import { RequestHandler } from "express";
import joi, { ObjectSchema } from "joi";
import { ApiError } from "../utils/ApiError";

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

export const schemaValidatorMid = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details, stack } = error;
      const message = details
        .map((detail) => detail.message.replace(/['"]/g, ""))
        .join(", ");

      throw new ApiError(422, message, [error], stack);
    }
    next();
  };
};
