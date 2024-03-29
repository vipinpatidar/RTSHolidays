export type MyHotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdate: Date;
  bookings?: BookingType[];
};

export type HotelsResponseType = {
  data: MyHotelType[];
  pagination: {
    totalHotels: number;
    page: number;
    totalPages: number;
  };
};

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  refreshToken: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type paymentIntentType = {
  clientSecret: string;
  paymentIntentId: string;
  totalCost: number;
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};
