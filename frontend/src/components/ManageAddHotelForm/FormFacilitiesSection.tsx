import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./FormAddHotel";
import { hotelFacilities } from "../../utils/hotel-type-options";

const FormFacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-5">Facilities</h2>
      <div className="grid  grid-cols-[repeat(auto-fit,minmax(160px,_1fr))] gap-2">
        {hotelFacilities.map((facility) => (
          <label
            htmlFor={facility}
            key={facility}
            className={`capitalize rounded-full cursor-pointer flex gap-2 items-center`}
          >
            <input
              type="checkbox"
              value={facility}
              id={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Please provide at least one hotel facility.";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FormFacilitiesSection;
