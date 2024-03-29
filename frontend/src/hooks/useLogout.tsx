import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";
import { openRequest } from "../utils/axios";

const useLogout = () => {
  const { setToken } = useAppContext();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      setToken(null);
      sessionStorage.removeItem("user");
      const response = await openRequest.post("/auth/logout");
      console.log(response?.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return logoutHandler;
};

export default useLogout;
