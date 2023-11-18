import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema()
export class HotelRoom {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
