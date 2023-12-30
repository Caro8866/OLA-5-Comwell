import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

import mongoose from 'mongoose';
@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    // validate if exists
    const createdNewBooking = new this.bookingModel(createBookingDto);
    return createdNewBooking.save();
  }

  findAll() {
    return this.bookingModel.find().exec();
  }

  findOne(id: string) {
    return this.bookingModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.bookingModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      updateBookingDto,
    );
  }

  remove(id: string) {
    return this.bookingModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();
  }
}
