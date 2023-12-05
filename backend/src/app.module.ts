import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { PackagesModule } from './hotel-packages/packages.module';
import { HotelOffersModule } from './hotel-offers/hotel-offers.module';
import { HotelRoomsModule } from './hotel-rooms/hotel-rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { CommandModule } from 'nestjs-command';
import { SeedsModule } from './shared/seeds.module';
import 'dotenv/config';

@Module({
  imports: [
    // get db_host from .env for mongo
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOST}:27017/comwell`,
      {
        authSource: 'admin',
      },
    ),
    AuthModule,
    HotelsModule,
    UsersModule,
    PackagesModule,
    HotelOffersModule,
    HotelRoomsModule,
    BookingsModule,
    CommandModule,
    SeedsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
