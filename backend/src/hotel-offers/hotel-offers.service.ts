import { Injectable } from '@nestjs/common';
import { CreateHotelOfferDto } from './dto/create-hotel-offer.dto';
import { UpdateHotelOfferDto } from './dto/update-hotel-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HotelOffer } from './schemas/hotel-offer.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class HotelOffersService {
  constructor(
    @InjectModel(HotelOffer.name) private hotelOfferModel: Model<HotelOffer>,
  ) {}

  create(createHotelOfferDto: CreateHotelOfferDto) {
    const createdHotelOffer = new this.hotelOfferModel(createHotelOfferDto);
    return createdHotelOffer.save();
  }

  findAll() {
    return this.hotelOfferModel.find().exec();
  }

  findOne(id: string) {
    return this.hotelOfferModel
      .findById(new mongoose.Types.ObjectId(id))
      .exec();
  }

  update(id: string, updateHotelOfferDto: UpdateHotelOfferDto) {
    return this.hotelOfferModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      updateHotelOfferDto,
    );
  }

  remove(id: string) {
    return this.hotelOfferModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();
  }

  removeAll() {
    return this.hotelOfferModel.deleteMany({}).exec();
  }
}
