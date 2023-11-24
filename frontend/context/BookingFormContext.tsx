import { BookingFormState, bookingType } from "@/utils/bookingFormState";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Content for managing state of the booking form
export const BookingFormContext = createContext<{ state: BookingFormState; setState: React.Dispatch<React.SetStateAction<BookingFormState>> } | undefined>(undefined);

// Helper function to add days to a date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Creating a initial state based on the BookingFormState interface
const initialBookingFormState: BookingFormState = {
  bookingType: bookingType.accomodation,
  selectedHotel: null,
  roomCount: 1,
  personCount: { adults: 1, children: 0, toddlers: 0 },
  startDate: new Date(),
  endDate: addDays(new Date(), 1),
  rooms: [],
  package: null,
  price: null,
  addons: [],
  guestInfo: {
    fullName: "",
    email: "",
    phone: "",
  },
  bookerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  address: null,
  comment: null,
  paymentDetails: {
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  },
  termsChecked: false,
};

interface BookingFormProviderProps {
  children: ReactNode;
}

// Provider component to provide the booking form state to child components
export const BookingFormProvider: React.FC<BookingFormProviderProps> = ({ children }) => {
  const [state, setState] = useState<BookingFormState>(initialBookingFormState);

  return <BookingFormContext.Provider value={[state, setState]}>{children}</BookingFormContext.Provider>;
};

// Custom hook to access the booking form state
export const useBookingForm = () => {
  const context = useContext(BookingFormContext);
  if (!context) {
    throw new Error("useBookingForm must be used within a BookingFormProvider");
  }
  return context;
};
