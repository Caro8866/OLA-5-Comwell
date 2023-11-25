import { Hotel } from "@/utils/Hotel.types";
import { HotelRoom } from "@/utils/HotelRoom.types";
import React, { createContext, useState } from "react";

// context shape
type BookingContextType = {
  bookingData: {
    hotel: Hotel;
    peopleCount: { adults: number; children: number; infants: number };
    roomCount: number;
    startDate: Date | null;
    endDate: Date | null;
    selectedRoom: HotelRoom;
  };
  setBookingData: (data: BookingContextType["bookingData"]) => void;
};

// context with default values
export const BookingContext = createContext<BookingContextType>({
  bookingData: {
    hotel: {
      id: 0,
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
  },
  setBookingData: () => {},
});

// context provider
export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingContextType["bookingData"]>({
    hotel: {
      id: 0,
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
  });

  return <BookingContext.Provider value={{ bookingData, setBookingData }}>{children}</BookingContext.Provider>;
};
