import Input from "../../ui/Input";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./FormAddHotel";
import Button from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { openRequest } from "../../utils/axios";

const FormImagesSection = ({ hotelId }: { hotelId: string }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImagesUrls = watch("imageUrls");

  // console.log(hotelId);

  const { mutate } = useMutation({
    mutationFn: (data: { hotelId: string; imageUrl: string }) => {
      return openRequest.post("/upload/delete-image", data);
    },
  });

  // console.log(existingImagesUrls);

  const imageUrlDeleteHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      existingImagesUrls?.filter((url) => url !== imageUrl)
    );
    mutate({
      hotelId: hotelId,
      imageUrl: imageUrl,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Images</h2>

      {existingImagesUrls && existingImagesUrls.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {existingImagesUrls.map((imageUrl) => (
            <div key={imageUrl} className="relative group w-32 ">
              <img className="object-cover" src={imageUrl} alt="hotel Images" />
              <Button
                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100"
                onClick={(event) => imageUrlDeleteHandler(event, imageUrl)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      <Input
        label="Add Hotel Images"
        id="images"
        type="file"
        multiple
        accept="image/*"
        {...register("images", {
          validate: (images) => {
            const totalLength =
              images.length + (existingImagesUrls?.length || 0);

            if (totalLength === 0) {
              return "Please Add At Least One Hotel Image.";
            }

            if (totalLength > 6) {
              return "Only 5 images are allowed.";
            }

            return true;
          },
        })}
        errors={errors}
      />
    </div>
  );
};

export default FormImagesSection;
