export enum bookingType {
  accomodation = "accomodation",
  conference = "conference",
  banquet = "banquet",
}

export enum region {
  all = "all",
  zealand = "zealand",
  funen = "funen",
  jutland = "jutland",
}

export interface RoomDetails {
  roomType: string;
  roomCount: number;
  personCount: number;
}

interface AddonDetails {
  addonType: string;
  addonCount: number;
}

export interface People {
  adults: number;
  children: number;
  toddlers: number;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BookerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVC: string;
}

// State structure for the booking form
export interface BookingFormState {
  bookingType: bookingType;
  selectedHotel: string | null;
  roomCount: number;
  personCount: object;
  startDate: Date | null;
  endDate: Date | null;
  rooms: People[];
  package: string | null;
  price: number | null;
  addons: Array<AddonDetails>;
  guestInfo: GuestInfo;
  bookerInfo: BookerInfo;
  address: string | null;
  comment: string | null;
  paymentDetails: PaymentDetails;
  termsChecked: boolean;
}
