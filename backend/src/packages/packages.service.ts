import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './schemas/package.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<Package>,
  ) {}

  create(createPackageDto: CreatePackageDto) {
    const createdNewPackage = new this.packageModel(createPackageDto);
    return createdNewPackage.save();
  }

  findAll() {
    return this.packageModel.find().exec();
  }

  findOne(id: number) {
    return this.packageModel.findById(id).exec();
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return this.packageModel.findByIdAndUpdate(id, updatePackageDto);
  }

  remove(id: number) {
    return this.packageModel.findByIdAndDelete(id).exec();
  }
}
