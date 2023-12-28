import { HotelRoom } from "./HotelRoom.types";

export type HotelBooking = {
  _id: string;
  addons: {
    description: string;
    image: string;
    name: string;
    price: number;
  }[];
  booker: {
    _id: string;
    email: string;
    fullName: string;
    phone: number;
  };
  bookingType: string;
  checkInDate: string;
  checkOutDate: string;
  comment: string;
  discount: number;
  guest: {
    _id: string;
    email: string;
    fullName: string;
    phone: number;
    address: string;
  };
  hotelId: string;
  hotelPackageId: string;
  peopleCount: {
    adults: number;
    children: number;
    infants: number;
  };
  price: number;
  rooms: HotelRoom[];
  termsAccepted: boolean;
};
