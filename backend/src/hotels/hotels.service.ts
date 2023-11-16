import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './schemas/hotel.schema';
import { Model } from 'mongoose';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
  ) {}

  create(createHotelDto: CreateHotelDto) {
    const createdNewHotel = new this.hotelModel(createHotelDto);
    return createdNewHotel.save();
  }

  findAll() {
    return this.hotelModel.find().exec();
  }

  findOne(id: number) {
    return this.hotelModel.findById(id).exec();
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelDto);
  }

  remove(id: number) {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }
}
