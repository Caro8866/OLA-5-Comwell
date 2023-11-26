import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookingDocument = HydratedDocument<Guest>;

@Schema()
export class Guest {
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  phone: number;
  @Prop()
  address: string;
  @Prop()
  zipcode: number;
  @Prop()
  city: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
