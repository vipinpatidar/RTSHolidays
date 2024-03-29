import { useAppContext } from "../hooks/useAppContext";
import Button from "../ui/Button";
import useAxiosPrivateRequest from "../hooks/useMakeAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/hotels.context";
import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { isLoggedIn, token } = useAppContext();
  const makePrivateRequest = useAxiosPrivateRequest();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchValues = useSearchContext();
  const logout = useLogout();
  const [header, setHeader] = useState(false);
  const [isDown, setIsDown] = useState(
    "bg-transparent text-gray-100 py-4 translate-y-0"
  );
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        if (window.scrollY < lastPosition) {
          setIsDown("bg-white text-gray-800 py-5 shadow-lg translate-y-0");
        } else if (window.scrollY > lastPosition) {
          setIsDown("bg-white text-gray-800 py-5 shadow-lg -translate-y-full ");
        }
        setHeader(true);
      } else {
        setIsDown("bg-transparent py-4 text-gray-100 translate-y-0");
        setHeader(false);
      }
      setLastPosition(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [header, lastPosition]);

  const { data, isLoading } = useQuery({
    queryKey: ["userInfos"],
    queryFn: async () => {
      const response = await makePrivateRequest.get(`/auth/get-loggedIn-user`);
      return response.data;
    },
    enabled: !!token?.accessToken,
  });

  const user = !isLoading && data && data.responseData;

  const logoutHandler = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  const onHotelsClick = () => {
    searchValues.saveSearchedValues("", new Date(), new Date(), 1, 0);
  };

  return (
    <div className={`${isDown} fixed top-0 left-0 right-0 z-30 transition-all`}>
      <div className="max-w-[1200px] px-4 mx-auto flex justify-between">
        <span className="text-2xl font-semibold tracking-tight gap-2 flex items-center">
          <Button to={"/"}>RTSHolidays.com</Button>
          {user && isLoggedIn && (
            <span className="capitalize font-normal text-sm">
              ( {user?.firstName} {user?.lastName} )
            </span>
          )}
        </span>

        <div
          className="bg-hero px-2 py-2 lg:hidden rounded-full flex items-center justify-center cursor-pointer relative text-gray-100 hover:bg-hover"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          {isMenuOpen && (
            <div className="flex flex-col top-full w-[200px] absolute items-center bg-white shadow-md right-[60%] text-bl">
              {isLoggedIn && (
                <>
                  <Button
                    to={"/"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    Home
                  </Button>
                  <Button
                    to={"/search"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                    onClick={onHotelsClick}
                  >
                    Hotels & Search
                  </Button>
                  <Button
                    to={"/my-bookings"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    My Booking
                  </Button>
                  <Button
                    to={"/my-hotels"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    My Hotels
                  </Button>
                  <Button
                    to={"/contact"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    Contact Us
                  </Button>
                  <div className="py-2 border-b border-slate-300 hover:bg-gray-100">
                    <Button
                      className="text-white px-4 bg-hero hover:bg-hover outline-none border-none py-[8px] uppercase text-sm "
                      onClick={logoutHandler}
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              )}
              {!isLoggedIn && (
                <div className="flex flex-col top-full w-[200px] items-center bg-white shadow-md right-[60%] text-bl">
                  <Button
                    to={"/"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    Home
                  </Button>
                  <Button
                    to={"/search"}
                    className="font-semibold text-gray-800 py-3 border-b border-slate-300 w-full text-center hover:text-[#0575e6]"
                  >
                    Hotels & Search
                  </Button>

                  <div className="py-3 border-b border-slate-300 hover:bg-gray-100">
                    <Button
                      to={"/login"}
                      className="text-white px-4 bg-hero hover:bg-hover outline-none border-none py-[8px] uppercase text-sm "
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="hidden lg:flex items-center gap-6 space-x-2 ">
          {isLoggedIn && (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/search"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
                onClick={onHotelsClick}
              >
                Hotels & Search
              </NavLink>
              <NavLink
                to={"/my-bookings"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                My Booking
              </NavLink>
              <NavLink
                to={"/my-hotels"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                My Hotels
              </NavLink>
              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                Contact Us
              </NavLink>

              <Button
                className="text-white px-4 bg-hero hover:bg-hover outline-none border-none py-[8px] uppercase text-sm "
                onClick={logoutHandler}
              >
                Sign out
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/search"}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold  text-[#0575e6] border-b border-b-blue-600"
                    : "font-semibold  hover:text-[#0575e6] "
                }
              >
                Hotels & Search
              </NavLink>
              <Button
                to={"/login"}
                className="text-white px-4 bg-hero hover:bg-hover outline-none border-none py-[8px] uppercase text-sm "
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
