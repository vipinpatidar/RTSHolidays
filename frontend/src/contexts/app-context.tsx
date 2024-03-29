import { type ReactNode, createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContextValue = {
  isLoggedIn: { accessToken: string } | null;
  setToken: React.Dispatch<
    React.SetStateAction<{ accessToken: string } | null>
  >;
  userData: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    refreshToken: string;
  };
  token: { accessToken: string } | null;
  stripePromise: Promise<Stripe | null>;
};

export const AppContext = createContext<AppContextValue | null>(null);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [token, setToken] = useState<{ accessToken: string } | null>(
    JSON.parse(sessionStorage.getItem("user") as string) || null
  );

  // console.log(token);

  const { data } = useQuery({
    queryKey: ["validateToken", token],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/get-loggedIn-user`,
        {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!token?.accessToken,
    retry: 0,
    throwOnError: false,
  });

  // console.log(data?.responseData);
  // console.log(token);

  const context: AppContextValue = {
    isLoggedIn: token,
    setToken,
    userData: data && data?.responseData,
    token,
    stripePromise,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

//eslint ignore next-line
export default AppContextProvider;
