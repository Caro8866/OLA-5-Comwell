import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelPackage, PackageSchema } from './schemas/package.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelPackage.name, schema: PackageSchema },
    ]),
  ],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
