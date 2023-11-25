import { Area } from "./Area.types";
import { HotelRoom } from "./HotelRoom.types";
import { HotelPackage } from "./HotelPackage.types";
import { Offer } from "./Offer.types";
import { Region } from "./Region.types";

export type Hotel = {
  _id: string;

  name: string;

  location: Area;

  region: Region;

  description: string;

  image: string;

  addons: {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }[];

  packages: HotelPackage[];

  offers: Offer[];

  rooms: HotelRoom[];

  roomsDescription: string;

  isHotel: boolean;

  isConferenceCenter: boolean;

  isBanquet: boolean;
};
