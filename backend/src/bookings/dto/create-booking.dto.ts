import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { HotelRoom } from 'src/hotel-rooms/schemas/hotel-room.schema';
import { Guest } from '../schemas/guest.schema';
import { Booker } from '../schemas/booker.schema';

export class CreateBookingDto {
  @IsNotEmpty({ message: 'Booking type must be selected' })
  @IsString()
  bookingType: string;

  @IsNotEmpty({ message: 'Hotel must be selected' })
  hotelId: string;

  @IsNotEmpty({ message: 'Hotel room must be selected' })
  rooms: HotelRoom[];

  @IsNotEmpty({ message: 'Check in date must be selected' })
  @IsDateString()
  checkInDate: Date;

  @IsNotEmpty({ message: 'Check out date must be selected' })
  @IsDateString()
  checkOutDate: Date;

  @IsNotEmpty({ message: 'Hotel package must be selected' })
  hotelPackageId: string;

  @IsNotEmpty({ message: 'Guests cannot be empty' })
  peopleCount: { adults: number; children: number; infants: number };

  @IsOptional()
  addons: {
    name: string;
    price: number;
  }[];

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
    hotelId: string,
    rooms: HotelRoom[],
    checkInDate: Date,
    checkOutDate: Date,
    hotelPackageId: string,
    addons: {
      name: string;
      price: number;
    }[],
    peopleCount: { adults: number; children: number; infants: number },
    guest: Guest,
    termsAccepted: boolean,
    price: number,
    booker?: Booker,
    comment?: string,
    discount?: number,
  ) {
    this.bookingType = bookingType;
    this.hotelId = hotelId;
    this.rooms = rooms;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.hotelPackageId = hotelPackageId;
    this.addons = addons;
    this.peopleCount = peopleCount;
    this.guest = guest;
    this.price = price;
    this.termsAccepted = termsAccepted;
    this.discount = discount;
    this.booker = booker;
    this.comment = comment;
  }
}
