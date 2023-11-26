import { Hotel } from "@/utils/Hotel.types";
import { HotelPackage } from "@/utils/HotelPackage.types";
import { HotelRoom } from "@/utils/HotelRoom.types";
import React, { createContext, useState } from "react";

// context shape
export type BookingContextType = {
  bookingData: {
    hotel?: Hotel;
    peopleCount: { adults: number; children: number; infants: number };
    roomCount: number;
    startDate: Date | null;
    endDate: Date | null;
    selectedRoom: HotelRoom;
    selectedPackage: HotelPackage;
    selectedAddons: { name: string; price: number; description?: string; image?: string }[];
    guestInformation: {
      fullName: string;
      email: string;
      phone: string;
      address: string; // add zip code and city
    };
    comment: string;
  };
  setBookingData: (data: BookingContextType["bookingData"]) => void;
};

// context with default values
export const BookingContext = createContext<BookingContextType>({
  bookingData: {
    hotel: {
      _id: "",
      name: "",
      location: "",
      region: "",
      description: "",
      image: "",
      addons: [],
      packages: [],
      offers: [],
      rooms: [],
      roomsDescription: "",
      isHotel: true,
      isConferenceCenter: false,
      isBanquet: false,
    },
    peopleCount: { adults: 1, children: 0, infants: 0 },
    roomCount: 1,
    startDate: null,
    endDate: null,
    selectedRoom: {
      name: "",
      size: 0,
      description: "",
      image: "",
      price: 0,
    },
    selectedPackage: {
      name: "",
      type: "",
      tags: [],
      description: "",
      price: 0,
      image: "",
      discount: 0,
      _id: "",
    },
    selectedAddons: [],
    guestInformation: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    comment: "",
  },
  setBookingData: () => {},
});

// context provider
export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingContextType["bookingData"]>({
    hotel: {
      _id: "",
      name: "",
      location: "",
      region: "",
      description: "",
      image: "",
      addons: [],
      packages: [],
      offers: [],
      rooms: [],
      roomsDescription: "",
      isHotel: true,
      isConferenceCenter: false,
      isBanquet: false,
    },
    peopleCount: { adults: 1, children: 0, infants: 0 },
    roomCount: 1,
    startDate: null,
    endDate: null,
    selectedRoom: {
      name: "",
      size: 0,
      description: "",
      image: "",
      price: 0,
    },
    selectedPackage: {
      name: "",
      type: "",
      tags: [],
      description: "",
      price: 0,
      image: "",
      discount: 0,
      _id: "",
    },
    selectedAddons: [],
    guestInformation: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    comment: "",
  });

  return <BookingContext.Provider value={{ bookingData, setBookingData }}>{children}</BookingContext.Provider>;
};
