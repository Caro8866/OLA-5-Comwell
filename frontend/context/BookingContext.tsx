import React, { createContext, useContext, useState } from "react";

// context shape
type BookingContextType = {
  bookingData: {
    hotel: string;
    peopleCount: { adults: number; children: number; infants: number };
    roomCount: number;
    startDate: Date | null;
    endDate: Date | null;
  };
  setBookingData: (data: BookingContextType["bookingData"]) => void;
};

// context with default values
export const BookingContext = createContext<BookingContextType>({
  bookingData: {
    hotel: "",
    peopleCount: { adults: 1, children: 0, infants: 0 },
    roomCount: 1,
    startDate: null,
    endDate: null,
  },
  setBookingData: () => {},
});

// context provider
export const BookingContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingContextType["bookingData"]>({
    hotel: "",
    peopleCount: { adults: 1, children: 0, infants: 0 },
    roomCount: 1,
    startDate: null,
    endDate: null,
  });

  return <BookingContext.Provider value={{ bookingData, setBookingData }}>{children}</BookingContext.Provider>;
};
