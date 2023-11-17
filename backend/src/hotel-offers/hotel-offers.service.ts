import { Injectable } from '@nestjs/common';
import { CreateHotelOfferDto } from './dto/create-hotel-offer.dto';
import { UpdateHotelOfferDto } from './dto/update-hotel-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HotelOffer } from './schemas/hotel-offer.schema';
import { Model } from 'mongoose';

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

  findOne(id: number) {
    return this.hotelOfferModel.findById({ id }).exec();
  }

  update(id: number, updateHotelOfferDto: UpdateHotelOfferDto) {
    return this.hotelOfferModel.findByIdAndUpdate(id, updateHotelOfferDto);
  }

  remove(id: number) {
    return this.hotelOfferModel.findByIdAndDelete(id).exec();
  }
}
