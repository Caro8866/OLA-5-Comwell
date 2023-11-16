import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Package } from 'src/packages/schemas/package.schema';
import { Area } from 'src/utils/Area';
import { Region } from 'src/utils/Region';
import * as mongoose from 'mongoose';

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Package.name }] })
  packages: Package[];

  //   @Prop()
  //   offers: HotelOffers[];
  // Info cards with icon, headline and description

  @Prop()
  roomsDescription: string;

  //   @Prop()
  //   rooms: Room[];
  // name, size, image, description,

  @Prop({ default: true })
  isHotel: boolean;

  @Prop({ default: false })
  isConferenceCenter: boolean;

  @Prop({ default: false })
  isBanquet: boolean;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
