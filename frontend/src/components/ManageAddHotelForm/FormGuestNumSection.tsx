import { useFormContext } from "react-hook-form";
import Input from "../../ui/Input";
import { HotelFormData } from "./FormAddHotel";

const FormGuestNumSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-5">Guests</h2>
      <div className="flex flex-col md:flex-row gap-4 bg-gray-300 px-4 py-4">
        <Input
          id="adultCount"
          label="Adult Counts"
          type="number"
          min={1}
          placeholder="Enter Number Of Adult Counts"
          {...register("adultCount", {
            required: "Number Of Adult Count is required.",
          })}
          errors={errors}
        />
        <Input
          id="childCount"
          label="Child Counts"
          type="number"
          min={0}
          placeholder="Enter Number Of Child Counts"
          {...register("childCount", {
            required: "Number Of Child Counts is required.",
          })}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default FormGuestNumSection;
