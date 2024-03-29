import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import { HotelFormData } from "./FormAddHotel";

const FormDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Hotel Name"
        type="text"
        placeholder="Enter Your Hotel Name"
        {...register("name", { required: "Hotel name is required." })}
        errors={errors}
      />
      <div className="flex flex-col md:flex-row gap-5">
        <Input
          id="city"
          label="City"
          type="text"
          placeholder="Enter City Name"
          {...register("city", { required: "City name is required." })}
          errors={errors}
        />
        <Input
          id="country"
          label="Country"
          type="text"
          placeholder="Enter Country Name"
          {...register("country", { required: "Country name is required." })}
          errors={errors}
        />
      </div>
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-semibold uppercase text-gray-700 text-sm">
          Description
        </label>
        <textarea
          className="outline-none border rounded w-full py-[6px] px-3 placeholder:text-gray-400"
          placeholder="Enter Hotel Description"
          rows={4}
          {...register("description", {
            required: "Hotel Description is required.",
          })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>
      <Input
        id="pricePerNight"
        label="Price Per Night"
        type="number"
        min={1}
        placeholder="Enter Per Night Price"
        {...register("pricePerNight", {
          required: "Price per night is required.",
        })}
        errors={errors}
      />
      <div className="flex flex-col gap-[6px] w-full">
        <label className="font-semibold uppercase text-gray-700 text-sm">
          Star Rating
        </label>
        <select
          id="starRating"
          {...register("starRating", {
            required: "Hotel Rating is required.",
          })}
          className="outline-none border rounded w-full py-[6px] px-3 placeholder:text-gray-400"
        >
          <option value="" className="text-sm font-semibold">
            Select Hotel Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="font-semibold">
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </div>
    </div>
  );
};

export default FormDetailsSection;
