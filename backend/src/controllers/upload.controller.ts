import fs from "node:fs";
import { ApiError } from "../utils/ApiError";
import { deleteOnCloudinary, uploadOnCloudinary } from "../uploads/cloudinary";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { MyHotel } from "../models/my-hotels.model";

export const postUploadImages = asyncHandler(async (req, res, next) => {
  const images = req.files as Express.Multer.File[];
  //   console.log(images);
  const { refreshToken } = req.body;
  // console.log(refreshToken);

  const user = await User.findOne({ refreshToken: refreshToken });

  if (!user) {
    throw new ApiError(401, "Unauthorized action.");
  }

  if (!images || !images?.length) {
    images?.map((image) => fs.unlinkSync(image?.path));
    throw new ApiError(400, "Please provide at least one image");
  }

  const uploadedPromises = images.map(async (image) => {
    //if we used multer.memoryStorage() then
    //const b64 = Buffer.from(image.buffer).toString("base64");
    //const dataURL = "data:" + image.mimetype + ";base64," + b64;
    // now dataURL as path
    const response = await uploadOnCloudinary(image?.path);
    return response?.url;
  });

  const imageURLs = await Promise.all(uploadedPromises);

  if (!imageURLs || !imageURLs?.length || !imageURLs[0]) {
    images.map((image) => fs.unlinkSync(image?.path));
    throw new ApiError(400, "Image upload failed");
  }

  res.status(200).json(imageURLs);
});

export const deleteImage = asyncHandler(async (req, res, next) => {
  const { hotelId, imageUrl } = req.body;

  // console.log(hotelId, imageUrl);

  const hotel = await MyHotel.findById({ _id: hotelId });
  if (!hotel) {
    throw new ApiError(404, "Hotel not found.");
  }

  hotel.imageUrls = hotel?.imageUrls.filter((url) => url !== imageUrl);

  await hotel?.save();

  await deleteOnCloudinary(imageUrl);

  res.status(200).json({ message: "Image deleted." });
});
