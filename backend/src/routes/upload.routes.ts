import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { verifyJwtToken } from "../middlewares/verifyToken";
import {
  deleteImage,
  postUploadImages,
} from "../controllers/upload.controller";

export const uploadImages = Router();

// uploadImages.use(verifyJwtToken);

uploadImages.post("/images", upload.array("images", 5), postUploadImages);
uploadImages.post("/delete-image", deleteImage);
