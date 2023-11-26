import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
    fullName: string;
    zipCode: number;
    phone: number;
    gender: 'Male' | 'Female' | 'Prefer not to say' | 'Other';
    dateOfBirth: string;
  }) {
    return {
      userId: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
      zipCode: payload.zipCode,
      phone: payload.phone,
      gender: payload.gender,
      birthday: payload.dateOfBirth,
    };
  }
}
