import { FormProvider, useForm } from "react-hook-form";
import FormDetailsSection from "./FormDetailsSection";
import FormTypesSection from "./FormTypesSection";
import FormFacilitiesSection from "./FormFacilitiesSection";
import FormGuestNumSection from "./FormGuestNumSection";
import FormImagesSection from "./FormImagesSection";
import Button from "../../ui/Button";
import { useToastContext } from "../../contexts/toast-context";
import useImagesUploader from "../../hooks/useImageUploader";
import { MyHotelType } from "../../pages/MyHotels";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  images: FileList;
  imageUrls?: string[];
};

export type HotelSendData = Omit<HotelFormData, "images"> & {
  imageUrls: string[];
};

const FormAddHotel = ({
  saveHandler,
  isPending,
  hotel,
  id,
}: {
  hotel: MyHotelType | string;
  saveHandler: (formData: HotelSendData) => void;
  isPending: boolean;
  id: string;
}) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;
  const { showToastMsg } = useToastContext();

  const [isLoading, getImageUrls] = useImagesUploader();

  useEffect(() => {
    if (typeof hotel !== "string") {
      reset(hotel);
    }
  }, [hotel, reset]);

  const saveHotelSubmitHandler = handleSubmit(
    async (dataJson: HotelFormData) => {
      const imageUrls =
        dataJson.images.length > 0 ? await getImageUrls(dataJson.images) : [];
      // console.log(imageUrls);

      if (id === "") {
        if (!imageUrls || imageUrls?.length === 0) {
          showToastMsg({
            message: "Images upload failed. Try again.",
            type: "ERROR",
          });
          return;
        }
      }

      const hotelData: HotelSendData = {
        name: dataJson.name,
        city: dataJson.city,
        country: dataJson.country,
        description: dataJson.description,
        type: dataJson.type,
        adultCount: dataJson.adultCount,
        childCount: dataJson.childCount,
        starRating: dataJson.starRating,
        facilities: dataJson.facilities,
        pricePerNight: dataJson.pricePerNight,
        imageUrls: imageUrls,
      };

      saveHandler(hotelData);
    }
  );

  return (
    <div className="inner-container">
      <h2 className="text-3xl font-semibold mb-6">ADD HOTEL INFO</h2>
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-6" onSubmit={saveHotelSubmitHandler}>
          <FormDetailsSection />
          <FormTypesSection />
          <FormFacilitiesSection />
          <FormGuestNumSection />
          <FormImagesSection hotelId={id} />

          <div className="flex items-center justify-end mt-4">
            <Button
              type="submit"
              className="bg-hero hover:bg-hover  text-white py-[10px] px-5 uppercase disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={isLoading || isPending}
            >
              {isLoading || isPending ? "Loading..." : " Save Hotel"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormAddHotel;
