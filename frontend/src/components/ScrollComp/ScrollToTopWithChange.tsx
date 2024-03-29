import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, [pathname]);

  return <></>;
};

export default ScrollToTop;
