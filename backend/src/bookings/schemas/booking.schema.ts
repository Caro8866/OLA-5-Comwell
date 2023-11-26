import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HotelRoom } from 'src/hotel-rooms/schemas/hotel-room.schema';
import { Guest } from './guest.schema';
import { Booker } from './booker.schema';
import { Hotel } from 'src/hotels/schemas/hotel.schema';
import { HotelPackage } from 'src/hotel-packages/schemas/package.schema';
export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop()
  bookingType: string;

  @Prop()
  hotel: Hotel;

  @Prop()
  rooms: HotelRoom[];

  @Prop()
  checkInDate: Date;

  @Prop()
  checkOutDate: Date;

  @Prop()
  hotelPackage: HotelPackage;

  @Prop()
  addons: {
    name: string;
    price: number;
  }[];

  @Prop()
  guest: Guest;

  @Prop()
  price: number;

  @Prop()
  termsAccepted: boolean;

  @Prop({ required: false })
  booker: Booker;

  @Prop()
  comment: string;

  @Prop()
  discount: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
