import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { HotelOffersCommand } from 'src/hotel-offers/hotel-offers.command';
import { HotelOffersService } from 'src/hotel-offers/hotel-offers.service';
import {
  HotelOffer,
  HotelOfferSchema,
} from 'src/hotel-offers/schemas/hotel-offer.schema';
import { PackagesCommand } from 'src/hotel-packages/packages.commands';
import { PackagesService } from 'src/hotel-packages/packages.service';
import {
  HotelPackage,
  PackageSchema,
} from 'src/hotel-packages/schemas/package.schema';
import { HotelRoomsCommand } from 'src/hotel-rooms/hotel-rooms.command';
import { HotelRoomsService } from 'src/hotel-rooms/hotel-rooms.service';
import {
  HotelRoom,
  HotelRoomSchema,
} from 'src/hotel-rooms/schemas/hotel-room.schema';
import { HotelsCommand } from 'src/hotels/hotels.command';
import { HotelsService } from 'src/hotels/hotels.service';
import { Hotel, HotelSchema } from 'src/hotels/schemas/hotel.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
    MongooseModule.forFeature([
      { name: HotelPackage.name, schema: PackageSchema },
    ]),
    MongooseModule.forFeature([
      { name: HotelOffer.name, schema: HotelOfferSchema },
    ]),
  ],
  providers: [
    HotelsCommand,
    HotelsService,
    HotelRoomsCommand,
    HotelRoomsService,
    PackagesCommand,
    PackagesService,
    HotelOffersCommand,
    HotelOffersService,
  ],
  exports: [HotelsCommand, HotelRoomsCommand, PackagesCommand],
})
export class SeedsModule {}
