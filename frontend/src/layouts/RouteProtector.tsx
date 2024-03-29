import { ReactNode } from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Navigate, useLocation } from "react-router-dom";

const RouteProtector = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  // console.log(isLoggedIn);

  if (!isLoggedIn) {
    return (
      <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    );
  } else {
    return children;
  }
};

export default RouteProtector;
