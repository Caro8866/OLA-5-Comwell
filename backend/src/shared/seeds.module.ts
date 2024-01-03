import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { HotelOffersCommand } from '../hotel-offers/hotel-offers.command';
import { HotelOffersService } from '../hotel-offers/hotel-offers.service';
import {
  HotelOffer,
  HotelOfferSchema,
} from '../hotel-offers/schemas/hotel-offer.schema';
import { PackagesCommand } from '../hotel-packages/packages.commands';
import { PackagesService } from '../hotel-packages/packages.service';
import {
  HotelPackage,
  PackageSchema,
} from '../hotel-packages/schemas/package.schema';
import { HotelRoomsCommand } from '../hotel-rooms/hotel-rooms.command';
import { HotelRoomsService } from '../hotel-rooms/hotel-rooms.service';
import {
  HotelRoom,
  HotelRoomSchema,
} from '../hotel-rooms/schemas/hotel-room.schema';
import { HotelsCommand } from '../hotels/hotels.command';
import { HotelsService } from '../hotels/hotels.service';
import { Hotel, HotelSchema } from '../hotels/schemas/hotel.schema';
import { UsersCommand } from '../users/users.command';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';

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
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
    UsersCommand,
    UsersService,
  ],
  exports: [
    HotelsCommand,
    HotelRoomsCommand,
    PackagesCommand,
    HotelOffersCommand,
    UsersCommand,
  ],
})
export class SeedsModule {}
