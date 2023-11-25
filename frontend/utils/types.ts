export type Hotel = {
  id: number;
  name: string;
  location: string;
  region: string;
  description: string;
  image: string;
  addons: Array<Addon>;
  packages: Array<Package>;
  //   offers: Array<Offer>;
  rooms: Array<Room>;
  roomsDescription: string;
  isHotel: boolean;
  isConferenceCenter: boolean;
  isBanquet: boolean;
};

type Addon = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

type Package = {
  id: number;
  name: string;
  type: string;
  tags: Array<string>;
  description: string;
  price: number;
  image: string;
  discount: number;
};

type Room = {
  id: number;
  name: string;
  size: number;
  description: string;
  image: string;
  price: number;
};
