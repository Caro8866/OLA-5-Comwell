import { BookingFormState, bookingType } from "@/types/bookingFormState";
import React, { createContext, useState, useContext } from "react";

const BookingFormContext = createContext<[BookingFormState, (state: BookingFormState) => void] | undefined>(undefined);

// Helper function to add days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const today = new Date();
const tomorrow = addDays(today, 1);

// Initial state based on the BookingFormState interface
const initialBookingFormState: BookingFormState = {
  bookingType: bookingType.hotel,
  selectedHotel: null,
  roomCount: 1,
  personCount: 1,
  startDate: today,
  endDate: tomorrow,
  rooms: [],
  package: null,
  price: null,
  addons: [],
  guestInfo: {
    firstName: "",
    lastName: "",
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
  children: React.ReactNode;
}

export const BookingFormProvider: React.FC<BookingFormProviderProps> = ({ children }) => {
  const [state, setState] = useState<BookingFormState>(initialBookingFormState);

  return <BookingFormContext.Provider value={[state, setState]}>{children}</BookingFormContext.Provider>;
};

export const useBookingForm = () => {
  const context = useContext(BookingFormContext);
  if (!context) {
    throw new Error("useBookingForm must be used within a BookingFormProvider component");
  }
  return context;
};
