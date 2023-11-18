import { Module } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms.controller';

@Module({
  controllers: [HotelRoomsController],
  providers: [HotelRoomsService],
})
export class HotelRoomsModule {}
