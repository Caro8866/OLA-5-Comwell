import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

enum Gender {
  Male = 'Male',
  Female = 'Female',
  'Prefer not to say' = 'Prefer not to say',
  Other = 'Other',
}

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  zipCode: number;

  @Prop()
  phone: number;

  @Prop()
  password: string;

  @Prop({ type: String, enum: Object.values(Gender) })
  gender: Gender;

  @Prop()
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
