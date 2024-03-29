import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);
  const errorStatus = error.statusCode || 500;
  const errorMsg = error.message || "Something went wrong";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMsg,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};

export default errorHandler;
