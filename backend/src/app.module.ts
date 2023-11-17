import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { PackagesModule } from './packages/packages.module';
import { HotelOffersModule } from './hotel-offers/hotel-offers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/comwell'),
    AuthModule,
    HotelsModule,
    UsersModule,
    PackagesModule,
    HotelOffersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
