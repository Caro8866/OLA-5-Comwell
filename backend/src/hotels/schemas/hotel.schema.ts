import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HotelPackage } from '../../hotel-packages/schemas/package.schema';
import { Area } from '../../utils/Area';
import { Region } from '../../utils/Region';
import * as mongoose from 'mongoose';
import { HotelOffer } from '../../hotel-offers/schemas/hotel-offer.schema';
import { HotelRoom } from '../../hotel-rooms/schemas/hotel-room.schema';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: Area;

  @Prop()
  region: Region;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  addons: {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: HotelPackage.name }],
  })
  packages: HotelPackage[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: HotelOffer.name }],
  })
  offers: HotelOffer[];
  // Info cards with icon, headline and description

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: HotelRoom.name }],
  })
  rooms: HotelRoom[];

  @Prop()
  roomsDescription: string;

  @Prop({ default: true })
  isHotel: boolean;

  @Prop({ default: false })
  isConferenceCenter: boolean;

  @Prop({ default: false })
  isBanquet: boolean;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
