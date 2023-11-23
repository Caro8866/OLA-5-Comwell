import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
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
  ],
  providers: [
    HotelsCommand,
    HotelRoomsCommand,
    HotelRoomsService,
    HotelsService,
  ],
  exports: [HotelsCommand, HotelRoomsCommand],
})
export class SeedsModule {}
