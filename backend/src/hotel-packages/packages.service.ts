import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { HotelPackage } from './schemas/package.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(HotelPackage.name) private packageModel: Model<HotelPackage>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    const createdNewPackage = new this.packageModel(createPackageDto);
    return createdNewPackage.save();
  }

  findAll() {
    return this.packageModel.find().exec();
  }

  findOne(id: string) {
    return this.packageModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  update(id: string, updatePackageDto: UpdatePackageDto) {
    return this.packageModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      updatePackageDto,
    );
  }

  remove(id: string) {
    return this.packageModel
      .findByIdAndDelete(new mongoose.Types.ObjectId(id))
      .exec();
  }
}
