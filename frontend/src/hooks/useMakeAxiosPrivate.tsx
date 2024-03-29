import { useEffect } from "react";
import { useAppContext } from "./useAppContext";
import { makePrivateRequest } from "../utils/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivateRequest = () => {
  const { token } = useAppContext();
  const refreshToken = useRefreshToken();

  // console.log(token);

  useEffect(() => {
    // On initial request check and set headers with the jwt token or return config
    const requestIntercepator = makePrivateRequest.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    //  Catching a 401 status if it is then set new token using refreshing token method

    const responseInterceptor = makePrivateRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          const newAccessToken = await refreshToken();
          // console.table({ error, newAccessToken });

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return makePrivateRequest(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      makePrivateRequest.interceptors.request.eject(requestIntercepator);
      makePrivateRequest.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refreshToken]);

  return makePrivateRequest;
};

export default useAxiosPrivateRequest;
