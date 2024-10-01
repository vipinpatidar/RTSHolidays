import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../contexts/hotels.context";
import { useAppContext } from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "../contexts/toast-context";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  street: string;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const searchValues = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const { showToastMsg } = useToastContext();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: searchValues.checkIn,
      checkOut: searchValues.checkOut,
      adultCount: searchValues.adultCount,
      childCount: searchValues.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const isDateSelected = checkIn.getTime() < checkOut.getTime();

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    searchValues.saveSearchedValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/login");
  };

  const onSubmit = (data: GuestInfoFormData) => {
    if (!isDateSelected) {
      showToastMsg({
        type: "ERROR",
        message: "Please select check-in and check-out dates",
      });
      return;
    }

    searchValues.saveSearchedValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/booking/${hotelId}`, {
      state: {
        address: {
          city: data?.city,
          country: data?.country,
          state: data?.state,
          postalCode: data?.postalCode,
          street: data?.street,
        },
      },
    });
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="text-md font-semibold text-xl">
        ${pricePerNight} <span className="text-sm">P/N</span>
      </h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-medium text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isDateSelected && (
            <div>
              <div className="flex flex-col gap-3 mb-3">
                <label className="items-center flex gap-2 bg-white px-2 py-1 w-full">
                  Street
                  <input
                    className="w-full p-1 focus:outline-none font-bold bg-gray-50"
                    type="text"
                    {...register("street", {
                      required: "Please enter your street name",
                    })}
                  />
                </label>
                <label className="items-center flex gap-2 bg-white px-2 py-1 w-full">
                  City
                  <input
                    className="w-full p-1 focus:outline-none font-bold bg-gray-50"
                    type="text"
                    {...register("city", {
                      required: "Please enter your city name",
                    })}
                  />
                </label>
                <label className="items-center flex gap-2 bg-white px-2 py-1 w-full">
                  State
                  <input
                    className="w-full p-1 focus:outline-none font-bold bg-gray-50"
                    type="text"
                    {...register("state", {
                      required: "Please enter your state name",
                    })}
                  />
                </label>
                {errors.street && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.street.message}
                  </span>
                )}
                {errors.city && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.city.message}
                  </span>
                )}
                {errors.state && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.state.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label className="items-center flex gap-2 bg-white px-2 py-1 w-full">
                  Country
                  <input
                    className="w-full p-1 focus:outline-none font-bold bg-gray-50"
                    type="text"
                    {...register("country", {
                      required: "Please enter your country name",
                    })}
                  />
                </label>
                <label className="items-center flex gap-2 bg-white px-2 py-1 w-full">
                  postalCode
                  <input
                    className="w-full p-1 focus:outline-none font-bold bg-gray-50"
                    type="text"
                    {...register("postalCode", {
                      required: "Please enter your postal code",
                    })}
                  />
                </label>
                {errors.country && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.country.message}
                  </span>
                )}
                {errors.postalCode && (
                  <span className="text-red-500 font-medium text-sm">
                    {errors.postalCode.message}
                  </span>
                )}
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <button className="bg-hero text-white h-full py-[10px] px-4  font-semibold hover:bg-hover text-lg">
              Book Now
            </button>
          ) : (
            <button className="bg-hero text-white h-full py-[10px] px-4 font-semibold hover:bg-hover text-lg">
              Login to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
