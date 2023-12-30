import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { HotelRoom } from './schemas/hotel-room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

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

  findOne(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      return this.hotelRoomModel
        .findById(new mongoose.Types.ObjectId(id))
        .exec();
    }
  }

  update(id: string, updateHotelRoomDto: UpdateHotelRoomDto) {
    return this.hotelRoomModel.findByIdAndUpdate(id, updateHotelRoomDto).exec();
  }

  async remove(id: string) {
    const deletedRoom = await this.hotelRoomModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();
    return deletedRoom;
  }

  async removeAll() {
    return this.hotelRoomModel.deleteMany({}).exec();
  }
}
