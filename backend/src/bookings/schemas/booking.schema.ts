import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HotelPackage } from 'src/hotel-packages/schemas/package.schema';
import { HotelRoom } from 'src/hotel-rooms/schemas/hotel-room.schema';
import { Hotel } from 'src/hotels/schemas/hotel.schema';
import { Booker } from 'src/utils/Booker';
import { Guest } from 'src/utils/Guest';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ required: true })
  bookingType: string;

  @Prop({ required: true })
  hotel: Hotel;

  @Prop({ required: true })
  rooms: HotelRoom[];

  @Prop({ required: true })
  checkInDate: Date;

  @Prop({ required: true })
  checkOutDate: Date;

  @Prop({ required: true })
  package: HotelPackage;

  // addons tbd not required
  @Prop()
  guest: Guest;

  @Prop()
  booker: Booker;

  @Prop()
  comment: string;

  @Prop()
  termsAccepted: boolean;

  @Prop()
  discount: number;

  @Prop()
  price: number;
}

export const PackageSchema = SchemaFactory.createForClass(Booking);
