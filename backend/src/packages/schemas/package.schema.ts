import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Transform } from 'class-transformer';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop({ unique: true })
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

  @Prop({ default: 0 })
  discount: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
