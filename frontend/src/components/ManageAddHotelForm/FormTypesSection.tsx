import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./FormAddHotel";
import { hotelTypes } from "../../utils/hotel-type-options";

const FormTypesSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const selectedType = watch("type");
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-5">Type</h2>
      <div className="grid  grid-cols-[repeat(auto-fit,minmax(130px,_1fr))] gap-2">
        {hotelTypes.map((type) => (
          <label
            htmlFor={type}
            key={type}
            className={`capitalize rounded-full  px-2 py-[10px] text-center cursor-pointer ${
              selectedType === type ? "bg-blue-300" : "bg-gray-300"
            }`}
          >
            <input
              className="hidden"
              type="radio"
              value={type}
              id={type}
              {...register("type", {
                required: "Please Select Hotel Type.",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default FormTypesSection;
