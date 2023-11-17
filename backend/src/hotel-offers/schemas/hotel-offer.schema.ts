import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelOfferDocument = HydratedDocument<HotelOffer>;

@Schema()
export class HotelOffer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  icon: string;
  // will be a 'magic string later' so it can easily be used in FE
}

export const HotelOfferSchema = SchemaFactory.createForClass(HotelOffer);
