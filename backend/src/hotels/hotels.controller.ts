import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreatePackageDto } from 'src/packages/dto/create-package.dto';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelOfferDto } from 'src/hotel-offers/dto/create-hotel-offer.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Get()
  findAll() {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }

  @Post(':id/packages')
  addPackage(
    @Param('id') id: string,
    @Body() pkg: CreatePackageDto,
  ): Promise<Hotel> {
    return this.hotelsService.addPackage(id, pkg);
  }

  @Delete(':id/packages/:pkgId')
  deletePackage(
    @Param('id') id: string,
    @Param('pkgId') pkgId: string,
  ): Promise<Hotel> {
    // console.log('package ID', pkgId);
    // console.log('hotel ID', id);

    return this.hotelsService.deletePackage(id, pkgId);
  }

  @Post(':id/offers')
  addOffer(
    @Param('id') id: string,
    @Body() offer: CreateHotelOfferDto,
  ): Promise<Hotel> {
    return this.hotelsService.addOffer(id, offer);
  }

  @Delete(':id/offers/:offId')
  deleteOffer(
    @Param('id') id: string,
    @Param('pkgId') offerId: string,
  ): Promise<Hotel> {
    // console.log('Offer ID', offerId);
    // console.log('hotel ID', id);

    return this.hotelsService.deleteOffer(id, offerId);
  }
}
