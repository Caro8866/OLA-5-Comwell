import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
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
  ],
  providers: [
    HotelsCommand,
    HotelsService,
    HotelRoomsCommand,
    HotelRoomsService,
    PackagesCommand,
    PackagesService,
  ],
  exports: [HotelsCommand, HotelRoomsCommand, PackagesCommand],
})
export class SeedsModule {}
