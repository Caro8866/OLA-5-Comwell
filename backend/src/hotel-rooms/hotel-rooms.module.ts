import { Module } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRoom.name, schema: HotelRoomSchema },
    ]),
  ],
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
})
export class HotelRoomsModule {}
