import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    const createdNewBooking = new this.bookingModel(createBookingDto);
    return createdNewBooking.save();
  }

  findAll() {
    return this.bookingModel.find().exec();
  }

  findOne(id: number) {
    return this.bookingModel.findById(id).exec();
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto);
  }

  remove(id: number) {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
