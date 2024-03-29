import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

type HandlerType = (req: Request, res: Response, next: NextFunction) => void;

export const asyncHandler = (requestHandler: HandlerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      // throw new ApiError(error?.statusCode, error.message);
      next(error);
    });
  };
};
