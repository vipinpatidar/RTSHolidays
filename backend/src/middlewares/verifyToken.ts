import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const verifyJwtToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized action.");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    if (!decodedToken) {
      throw new ApiError(401, "Unauthorized action.");
    }
    // console.log(decodedToken);
    req.userId = decodedToken._id;

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
};
