import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { useAppContext } from "../hooks/useAppContext";
import { useSearchContext } from "../contexts/hotels.context";
import { useParams } from "react-router-dom";
import { HotelApiResponseType } from "./HotelDetails";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "../components/BookingForm";
import { useToastContext } from "../contexts/toast-context";

const Booking = () => {
  const makePrivateRequest = useAxiosPrivateRequest();
  const { token, stripePromise } = useAppContext();
  const searchValues = useSearchContext();
  const { hotelId } = useParams();
  const { showToastMsg } = useToastContext();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (searchValues.checkIn && searchValues.checkOut) {
      const nights =
        Math.abs(
          searchValues.checkOut.getTime() - searchValues.checkIn.getTime()
        ) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [searchValues.checkIn, searchValues.checkOut]);

  // GET Payment Intent
  const {
    mutate,
    data: paymentIntent,
    isPending: isIntentLoading,
  } = useMutation({
    mutationFn: (numberOfNights: number) => {
      return makePrivateRequest.request({
        url: `/bookings/payment-intent/${hotelId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          numberOfNights,
        },
      });
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

  useEffect(() => {
    if (hotelId && numberOfNights > 0) {
      mutate(numberOfNights);
    }
  }, [numberOfNights, hotelId, mutate]);

  //GET Booking Hotel
  const {
    data: hotel,
    isLoading: isHotelLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: async (): Promise<HotelApiResponseType> => {
      const response = await makePrivateRequest.get(`/hotels/${hotelId}`);
      return response.data;
    },
    enabled: !!hotelId,
  });

  //GET LoggedIn User
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await makePrivateRequest.get(`/auth/get-loggedIn-user`);
      return response.data;
    },
    enabled: !!token?.accessToken,
  });

  const user = !isLoading && data && data.responseData;

  const hotelInfo = !isHotelLoading && !error && hotel && hotel.responseData;
  const paymentIntentData = paymentIntent && paymentIntent.data;

  // console.log(user);
  // console.log(hotelInfo);

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-5 my-6">
      {hotelInfo && (
        <BookingDetailsSummary
          checkIn={searchValues.checkIn}
          checkOut={searchValues.checkOut}
          adultCount={searchValues.adultCount}
          childCount={searchValues.childCount}
          numberOfNights={numberOfNights}
          hotel={hotelInfo}
        />
      )}

      {user && !isIntentLoading && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm currentUser={user} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
