import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './schemas/hotel.schema';
import { Model } from 'mongoose';
import { CreatePackageDto } from 'src/hotel-packages/dto/create-package.dto';
import { CreateHotelOfferDto } from 'src/hotel-offers/dto/create-hotel-offer.dto';
import { CreateHotelRoomDto } from 'src/hotel-rooms/dto/create-hotel-room.dto';
@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const createdNewHotel = new this.hotelModel(createHotelDto);
    return createdNewHotel.save();
  }

  findAll() {
    return this.hotelModel.find().populate('packages').populate('offers');
  }

  findOne(id: number) {
    return this.hotelModel.findById(id).populate('packages').populate('offers');
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelModel.findByIdAndUpdate(id, updateHotelDto);
  }

  remove(id: number) {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }

  /* --- PACKAGES --- */

  async addPackage(id: string, pkg: CreatePackageDto) {
    const updateHotel = await this.hotelModel.findById(id);
    updateHotel.packages.push(pkg);

    return updateHotel.save();
  }

  async deletePackage(id: string, pkgId: string) {
    const updateHotel = await this.hotelModel.findById(id);

    const filteredPkgs = updateHotel.packages.filter((pkg: any) => {
      return pkg.toString() !== pkgId;
    });
    updateHotel.packages = filteredPkgs;

    return updateHotel.save();
  }

  /* --- OFFERS --- */

  async addOffer(id: string, offer: CreateHotelOfferDto) {
    const updateHotel = await this.hotelModel.findById(id);
    updateHotel.offers.push(offer);

    return updateHotel.save();
  }

  async deleteOffer(id: string, offId: string) {
    const updateHotel = await this.hotelModel.findById(id);

    const filteredOffers = updateHotel.offers.filter((offer: any) => {
      return offer.toString() !== offId;
    });
    updateHotel.offers = filteredOffers;

    return updateHotel.save();
  }

  /* --- ROOMS --- */

  async addRoom(id: string, room: CreateHotelRoomDto) {
    const updateHotel = await this.hotelModel.findById(id);
    updateHotel.rooms.push(room);

    return updateHotel.save();
  }

  async deleteRoom(id: string, roomId: string) {
    const updateHotel = await this.hotelModel.findById(id);

    const filteredRooms = updateHotel.rooms.filter((room: any) => {
      return room.toString() !== roomId;
    });
    updateHotel.rooms = filteredRooms;

    return updateHotel.save();
  }
}
