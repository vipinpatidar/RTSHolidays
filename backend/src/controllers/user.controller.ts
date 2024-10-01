import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UserType } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import jwt, { JwtPayload } from "jsonwebtoken";

type RegisterReqBodyType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const generateAccessAndRefreshToken = async (userId: string) => {
  const user = (await User.findById({ _id: userId })) as UserType;

  if (user) {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  }

  throw new ApiError(404, "User not found.");
};

/* ================ REGISTER USER =============== */

const postRegisterUser = asyncHandler(async (req, res, next) => {
  const { email, firstName, lastName, password } =
    req.body as RegisterReqBodyType;

  let user = (await User.findOne({ email: email })) as UserType;

  if (user) {
    throw new ApiError(
      400,
      "This user already exists. Please use other email."
    );
  }

  user = new User({ email, firstName, lastName, password });
  const newUser = await user.save();

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newUser._id
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, {}, "Registered successful."));
});

/* ================ LOGIN USER =============== */

const postLoginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(
      400,
      "This email is not registered. please use other email."
    );
  }

  const isPassMatched = await user.isPasswordCorrect(password);

  if (!isPassMatched) {
    throw new ApiError(400, "Invalid Credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const userInfo = {
    accessToken,
  };

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, userInfo, "Login successful."));
});

/* ================ LOGOUT USER =============== */

const postLogoutUser = asyncHandler(async (req, res, next) => {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logout successfully."));
});

/* ================ VALIDATE TOKEN =============== */
const getLoggedInUser = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById({ _id: userId });

  const { password: pass, ...otherInfo } = user?._doc;

  res
    .status(200)
    .json(new ApiResponse(200, { ...otherInfo }, "Validation Success."));
});
/* ================ NEW ACCESS TOKEN =============== */

const postNewTokensUser = asyncHandler(async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    // console.log(incomingRefreshToken);

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request.");
    }

    const decodedRefreshToken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    if (!decodedRefreshToken) {
      throw new ApiError(401, "unauthorized request.");
    }

    const userId = (decodedRefreshToken as JwtPayload)._id;

    const loginUser = await User.findById({ _id: userId }).select("-password");

    if (!loginUser) {
      throw new ApiError(401, "Invalid refresh token.");
    }

    // console.log(incomingRefreshToken === loginUser?.refreshToken);

    if (incomingRefreshToken !== loginUser?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid.");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access Token refreshed."
        )
      );

    res.status(200);
  } catch (error) {
    if (error instanceof Error) {
      throw new ApiError(401, error?.message || "Invalid refresh token.");
    }
  }
});

export {
  postRegisterUser,
  postLoginUser,
  postLogoutUser,
  postNewTokensUser,
  getLoggedInUser,
};
