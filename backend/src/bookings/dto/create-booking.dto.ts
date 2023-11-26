import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { HotelPackage } from 'src/hotel-packages/schemas/package.schema';
import { HotelRoom } from 'src/hotel-rooms/schemas/hotel-room.schema';
import { Hotel } from 'src/hotels/schemas/hotel.schema';
import { Guest } from '../schemas/guest.schema';
import { Booker } from '../schemas/booker.schema';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'Booking type must be selected' })
  @IsString()
  bookingType: string;

  @IsNotEmpty({ message: 'Hotel must be selected' })
  hotel: Hotel;

  @IsNotEmpty({ message: 'Hotel room must be selected' })
  rooms: HotelRoom[];

  @IsNotEmpty({ message: 'Check in date must be selected' })
  @IsDate()
  checkInDate: Date;

  @IsNotEmpty({ message: 'Check out date must be selected' })
  @IsDate()
  checkOutDate: Date;

  @IsNotEmpty({ message: 'Hotel package must be selected' })
  hotelPackage: HotelPackage;

  @IsOptional()
  addons: {
    name: string;
    price: number;
  };

  @IsNotEmpty({ message: 'Guest information must be provided' })
  guest: Guest;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsBoolean()
  termsAccepted: boolean;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsOptional()
  booker: Booker;

  @IsOptional()
  comment: string;

  constructor(
    bookingType: string,
    hotel: Hotel,
    rooms: HotelRoom[],
    checkInDate: Date,
    checkOutDate: Date,
    hotelPackage: HotelPackage,
    addons: {
      name: string;
      price: number;
    },
    guest: Guest,
    termsAccepted: boolean,
    price: number,
    booker?: Booker,
    comment?: string,
    discount?: number,
  ) {
    this.bookingType = bookingType;
    this.hotel = hotel;
    this.rooms = rooms;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.hotelPackage = hotelPackage;
    this.addons = addons;
    this.guest = guest;
    this.price = price;
    this.termsAccepted = termsAccepted;
    this.discount = discount;
    this.booker = booker;
    this.comment = comment;
  }
}
