// import axios, { AxiosResponse } from "axios";
import { openRequest } from "../utils/axios";
import { useState } from "react";
import { useAppContext } from "./useAppContext";

const useImagesUploader = (): [
  boolean,
  (imageFiles: FileList) => Promise<string[]>
] => {
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useAppContext();
  //   console.log(userData?.refreshToken);

  async function callUploadImages(imageFiles: FileList) {
    try {
      setIsLoading(true);
      const formData = new FormData();
      Array.from(imageFiles).forEach((file) => {
        formData.append("images", file);
      });

      formData.append("refreshToken", userData?.refreshToken);
      const response = await openRequest.post("/upload/images", formData);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return [isLoading, callUploadImages];
};

export default useImagesUploader;
