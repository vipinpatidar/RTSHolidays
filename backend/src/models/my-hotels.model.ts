import mongoose, { ObjectId, Schema } from "mongoose";

export type MyHotelType = {
  _id: string;
  userId: ObjectId;
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
  bookings: BookingType[];
  _doc: any;
};

export type BookingType = {
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

const bookingSchema = new Schema<BookingType>({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  adultCount: { type: Number, default: 1, required: true },
  childCount: { type: Number, default: 0, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalCost: { type: Number, required: true },
});

const myHotelsSchema = new Schema<MyHotelType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    adultCount: {
      type: Number,
      required: true,
    },
    childCount: {
      type: Number,
      required: true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    facilities: {
      type: [String],
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    lastUpdate: Date,

    bookings: [bookingSchema],
  },
  {
    timestamps: true,
  }
);

export const MyHotel = mongoose.model<MyHotelType>("MyHotel", myHotelsSchema);
