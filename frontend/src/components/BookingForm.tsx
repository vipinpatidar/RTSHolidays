import { useForm } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../contexts/hotels.context";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "../contexts/toast-context";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { UserType, paymentIntentType } from "../types/types";

type Props = {
  currentUser: UserType;
  paymentIntent: paymentIntentType;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const searchValues = useSearchContext();
  const { hotelId } = useParams();

  const { showToastMsg } = useToastContext();
  const makePrivateRequest = useAxiosPrivateRequest();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: (bookingData: BookingFormData) => {
      return makePrivateRequest.post(
        `/bookings/hotelBookings/${hotelId}`,
        bookingData
      );
    },
    onSuccess: () => {
      showToastMsg({
        message: "Your Booking Successfully Saved.",
        type: "SUCCESS",
      });

      queryClient.invalidateQueries({
        queryKey: ["myBooking"],
      });
      setTimeout(() => {
        navigate("/my-bookings");
      }, 1500);
    },
    onError: (error) => {
      console.log(error);
      showToastMsg({
        message:
          (error.response?.data as { message: string })?.message ||
          error.message ||
          "Opps! Something went wrong.",
        type: "ERROR",
      });
    },
  });

  const { totalCost, paymentIntentId, clientSecret } = paymentIntent;

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: searchValues.adultCount,
      childCount: searchValues.childCount,
      checkIn: searchValues.checkIn.toISOString(),
      checkOut: searchValues.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: totalCost,
      paymentIntentId: paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal cursor-not-allowed"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal cursor-not-allowed"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal cursor-not-allowed"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ₹{totalCost?.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isPending}
          type="submit"
          className="bg-hero text-white px-6 py-[10px] font-bold hover:bg-hover text-md disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isPending ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
