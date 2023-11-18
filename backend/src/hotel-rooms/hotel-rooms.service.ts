import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';

@Injectable()
export class HotelRoomsService {
  create(createHotelRoomDto: CreateHotelRoomDto) {
    return 'This action adds a new hotelRoom';
  }

  findAll() {
    return `This action returns all hotelRooms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelRoom`;
  }

  update(id: number, updateHotelRoomDto: UpdateHotelRoomDto) {
    return `This action updates a #${id} hotelRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelRoom`;
  }
}
