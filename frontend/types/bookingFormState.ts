export enum bookingType {
  hotel = "hotel",
  conference = "conference",
  banquet = "banquet",
}

interface RoomDetails {
  roomType: string;
  roomCount: number;
  personCount: number;
}

interface AddonDetails {
  addonType: string;
  addonCount: number;
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

export interface BookingFormState {
  bookingType: bookingType;
  selectedHotel: string | null;
  roomCount: number;
  personCount: number;
  startDate: Date | null;
  endDate: Date | null;
  rooms: Array<RoomDetails>;
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
