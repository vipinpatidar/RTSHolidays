import axios, { AxiosError } from "axios";
import { useAppContext } from "./useAppContext";
import { useToastContext } from "../contexts/toast-context";
import { useQueryClient } from "@tanstack/react-query";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const { userData, setToken } = useAppContext();
  const { showToastMsg } = useToastContext();
  const queryClient = useQueryClient();
  const logout = useLogout();

  const fetchRefreshToken = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/v1/auth/new-token`,
        userData?.refreshToken
      );

      const { accessToken } = response.data.responseData;

      // console.log(accessToken, "useRefreshToken");
      sessionStorage.removeItem("user");
      sessionStorage.setItem(
        "user",
        JSON.stringify({ accessToken: accessToken })
      );
      setToken({ accessToken });

      await queryClient.invalidateQueries({
        queryKey: ["validateToken"],
      });

      return accessToken;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log((error.response?.data as { message: string })?.message);
        if (
          (error.response?.data as { message: string })?.message ===
            "unauthorized request." ||
          (error.response?.data as { message: string })?.message ===
            "Refresh token is expired or invalid."
        ) {
          logout();
        }

        showToastMsg({
          message: (error.response?.data as { message: string })?.message,
          type: "ERROR",
        });
      }
    }
  };
  return fetchRefreshToken;
};

export default useRefreshToken;
