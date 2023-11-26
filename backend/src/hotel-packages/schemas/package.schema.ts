import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelPackageDocument = HydratedDocument<HotelPackage>;

@Schema()
export class HotelPackage {
  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  price: number;
  // price per person

  @Prop()
  image: string;

  @Prop({ default: 0 })
  discount: number;
}

export const PackageSchema = SchemaFactory.createForClass(HotelPackage);
