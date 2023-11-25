import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelOfferDocument = HydratedDocument<HotelOffer>;

@Schema()
export class HotelOffer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tag: string;

  @Prop()
  image: string;

  @Prop()
  href: string;
}

export const HotelOfferSchema = SchemaFactory.createForClass(HotelOffer);
