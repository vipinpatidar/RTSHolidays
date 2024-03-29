import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { MyHotelType } from "./MyHotels";
import FormAddHotel, {
  HotelSendData,
} from "../components/ManageAddHotelForm/FormAddHotel";
import { useToastContext } from "../contexts/toast-context";

type FetchedDataType = Promise<{
  success: boolean;
  message: string;
  statusCode: number;
  responseData: MyHotelType;
}>;

const EditHotel = () => {
  const { hotelId } = useParams();
  const makePrivateRequest = useAxiosPrivateRequest();

  //Get opened hotel data
  const { data, isLoading, error } = useQuery({
    queryKey: ["editHotel", hotelId],
    queryFn: async (): FetchedDataType => {
      const response = await makePrivateRequest.get(`/my-hotels/${hotelId}`);

      return response.data;
    },
    enabled: !!hotelId,
  });

  // Update hotel
  const { showToastMsg } = useToastContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: HotelSendData) => {
      return makePrivateRequest.put(
        `/my-hotels/update-hotel/${hotelId}`,
        formData
      );
    },
    onSuccess: () => {
      showToastMsg({
        message: "Your Hotel Successfully Updated.",
        type: "SUCCESS",
      });
      navigate("/");
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

  const saveHotelHandler = (formData: HotelSendData) => {
    mutate(formData);
  };

  const hotel = !isLoading && !error && data && data.responseData;
  //   console.log(hotel);

  if (hotel) {
    return (
      <div>
        <FormAddHotel
          hotel={hotel}
          saveHandler={saveHotelHandler}
          isPending={isPending}
          id={hotelId as string}
        />
      </div>
    );
  }
  return;
};

export default EditHotel;
