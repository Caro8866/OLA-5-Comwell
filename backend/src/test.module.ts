import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
      `mongodb://${process.env.DB_HOST}:27017/comwell_test`,
    ),
    HotelsModule,
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
export class TestModule {}
