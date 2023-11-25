import { HotelRoom } from "./HotelRoom.types";
import { Offer } from "./offer.types";
import { Package } from "./package.types";

export type Hotel = {
  id: number;
  name: string;
  location: string;
  region: string;
  description: string;
  image: string;
  addons: {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }[];
  packages: Array<Package>;
  offers: Array<Offer>;
  rooms: Array<HotelRoom>;
  roomsDescription: string;
  isHotel: boolean;
  isConferenceCenter: boolean;
  isBanquet: boolean;
};
