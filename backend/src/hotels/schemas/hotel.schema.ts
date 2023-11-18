import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { HotelPackage } from 'src/hotel-packages/schemas/package.schema';
import { Area } from 'src/utils/Area';
import { Region } from 'src/utils/Region';
import * as mongoose from 'mongoose';
import { HotelOffer } from 'src/hotel-offers/schemas/hotel-offer.schema';
import { HotelRoom } from 'src/hotel-rooms/schemas/hotel-room.schema';

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
