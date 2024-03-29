import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary.
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    // console.log("file is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilePath); // remove local file after upload on cloudinary completes
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file as the upload failed
    return null;
  }
};

const deleteOnCloudinary = async (url: string) => {
  try {
    // Getting public id of image
    const urlArr = url.split("/");
    const urlPublicId = urlArr[urlArr.length - 1].split(".")[0];

    // console.log(urlPublicId);

    // delete the image

    const deleteRes = await cloudinary.api.delete_resources([urlPublicId], {
      type: "upload",
      resource_type: "image",
    });

    console.log(deleteRes?.deleted);

    return;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
