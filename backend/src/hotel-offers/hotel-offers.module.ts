import { Module } from '@nestjs/common';
import { HotelOffersService } from './hotel-offers.service';
import { HotelOffersController } from './hotel-offers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelOfferSchema, HotelOffer } from './schemas/hotel-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelOffer.name, schema: HotelOfferSchema },
    ]),
  ],
  controllers: [HotelOffersController],
  providers: [HotelOffersService],
})
export class HotelOffersModule {}
