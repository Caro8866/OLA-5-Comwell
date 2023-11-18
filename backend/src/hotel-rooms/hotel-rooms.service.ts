import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoom } from './schemas/hotel-room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoom>,
  ) {}

  create(createHotelRoomDto: CreateHotelRoomDto) {
    const createdHotelRoom = new this.hotelRoomModel(createHotelRoomDto);
    return createdHotelRoom.save();
  }

  findAll() {
    return this.hotelRoomModel.find().exec();
  }

  findOne(id: number) {
    return this.hotelRoomModel.findById({ id }).exec();
  }

  update(id: number, updateHotelRoomDto: UpdateHotelRoomDto) {
    return this.hotelRoomModel.findByIdAndUpdate(id, updateHotelRoomDto).exec();
  }

  remove(id: number) {
    return this.hotelRoomModel.findByIdAndRemove(id).exec();
  }
}
