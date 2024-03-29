import { useNavigate } from "react-router-dom";
import FormAddHotel, {
  HotelSendData,
} from "../components/ManageAddHotelForm/FormAddHotel";
import { useToastContext } from "../contexts/toast-context";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

const AddHotel = () => {
  const makePrivateRequest = useAxiosPrivateRequest();
  const { showToastMsg } = useToastContext();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: HotelSendData) => {
      return makePrivateRequest.post("/my-hotels/create", formData);
    },
    onSuccess: () => {
      showToastMsg({
        message: "Your Hotel Successfully Created.",
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

  return (
    <div>
      <FormAddHotel
        saveHandler={saveHotelHandler}
        isPending={isPending}
        id=""
        hotel=""
      />
    </div>
  );
};

export default AddHotel;
