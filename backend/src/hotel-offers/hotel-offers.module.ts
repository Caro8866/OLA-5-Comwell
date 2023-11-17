import { Module } from '@nestjs/common';
import { HotelOffersService } from './hotel-offers.service';
import { HotelOffersController } from './hotel-offers.controller';

@Module({
  controllers: [HotelOffersController],
  providers: [HotelOffersService],
})
export class HotelOffersModule {}
