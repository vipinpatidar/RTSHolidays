import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import { AxiosError } from "axios";
import RouteProtector from "./layouts/RouteProtector.tsx";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import AppContextProvider from "./contexts/app-context.tsx";

import { useToastContext } from "./contexts/toast-context.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";

import AddHotel from "./pages/AddHotel.tsx";
import MyHotels from "./pages/MyHotels.tsx";
import EditHotel from "./pages/EditHotel.tsx";
import SearchContextProvider from "./contexts/hotels.context.tsx";
import Search from "./pages/Search.tsx";
import HotelDetails from "./pages/HotelDetails.tsx";
import MyBookings from "./pages/MyBooking.tsx";
import Booking from "./pages/Booking.tsx";

import MyHotelImg from "./assets/5.jpg";
import contactImg from "./assets/66.jpg";
import Contact from "./pages/Contact.tsx";
// import PersistLogin from "./layouts/PersistLogin.tsx";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

// Type guard to check if value has a 'message' property
const hasMessageProperty = (data: unknown): data is { message: string } => {
  return typeof data === "object" && data !== null && "message" in data;
};

function App() {
  const { showToastMsg } = useToastContext();

  // Create a client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            // console.log(error);
            if (query?.state?.data === undefined) {
              // const err =
              //   (error?.response?.data as { message: string })?.message ||
              //   "Opps! Something went wrong.";
              const errorMessage = hasMessageProperty(error?.response?.data)
                ? error.response.data.message || error?.message
                : "Opps! Something went wrong.";
              console.log(errorMessage);
              showToastMsg({ message: errorMessage, type: "ERROR" });
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <Layout
                    isHomePage={true}
                    showSearchBar={true}
                    img=""
                    pera=""
                    heading=""
                  >
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/search"
                element={
                  <Layout
                    isHomePage={false}
                    showSearchBar={true}
                    img={MyHotelImg}
                    pera="Search or Filter hotels according to your personal preferences."
                    heading="Hotels & Search"
                  >
                    <Search />
                  </Layout>
                }
              />
              <Route
                path="/hotel-details/:hotelId"
                element={
                  <Layout
                    isHomePage={false}
                    showSearchBar={false}
                    img={MyHotelImg}
                    pera="Name, location, description, facilities, booking form all are there."
                    heading="Full Hotel Details"
                  >
                    <HotelDetails />
                  </Layout>
                }
              />

              <Route
                path="/register"
                element={
                  <Layout
                    isHomePage={false}
                    showSearchBar={false}
                    img={MyHotelImg}
                    pera="Register your personal information to use this platform."
                    heading="Register Your Account"
                  >
                    <Register />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout
                    isHomePage={false}
                    showSearchBar={false}
                    img={MyHotelImg}
                    pera="Please enter your details to login."
                    heading="Welcome Back :)"
                  >
                    <Login />
                  </Layout>
                }
              />

              {/* Private Routes */}

              {/* <Route element={<PersistLogin />}> */}
              <Route
                path="/add-hotel"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={false}
                      img={MyHotelImg}
                      pera="Add Your own Hotel according to given parameters and generate money."
                      heading="Add An Hotel"
                    >
                      <AddHotel />
                    </Layout>
                  </RouteProtector>
                }
              />
              <Route
                path="/edit-hotel/:hotelId"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={false}
                      img={MyHotelImg}
                      pera="Update all information about your hotel according to your preferences."
                      heading="Edit Your Hotel"
                    >
                      <EditHotel />
                    </Layout>
                  </RouteProtector>
                }
              />
              <Route
                path="/contact"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={false}
                      img={contactImg}
                      pera="Have a comment, suggestion, or feedback? Let us know."
                      heading="Contact Us"
                    >
                      <Contact />
                    </Layout>
                  </RouteProtector>
                }
              />
              <Route
                path="/booking/:hotelId"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={false}
                      img={MyHotelImg}
                      pera="Pay amount and book hotel to enjoy your vacation experience with us."
                      heading="Pay & Book Hotel "
                    >
                      <Booking />
                    </Layout>
                  </RouteProtector>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={true}
                      img={MyHotelImg}
                      pera="All your booking details are available here."
                      heading="My Bookings"
                    >
                      <MyBookings />
                    </Layout>
                  </RouteProtector>
                }
              />
              <Route
                path="/my-hotels"
                element={
                  <RouteProtector>
                    <Layout
                      isHomePage={false}
                      showSearchBar={true}
                      img={MyHotelImg}
                      pera="Add, Edit and Delete your own hotels services."
                      heading="MY Hotels"
                    >
                      <MyHotels />
                    </Layout>
                  </RouteProtector>
                }
              />
              {/* </Route> */}
              {/* Catch all */}
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  );
}

export default App;
