import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelOffersService } from './hotel-offers.service';
import { CreateHotelOfferDto } from './dto/create-hotel-offer.dto';
import { UpdateHotelOfferDto } from './dto/update-hotel-offer.dto';

@Controller('hotel-offers')
export class HotelOffersController {
  constructor(private readonly hotelOffersService: HotelOffersService) {}

  @Post()
  create(@Body() createHotelOfferDto: CreateHotelOfferDto) {
    return this.hotelOffersService.create(createHotelOfferDto);
  }

  @Get()
  findAll() {
    return this.hotelOffersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelOffersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHotelOfferDto: UpdateHotelOfferDto,
  ) {
    return this.hotelOffersService.update(id, updateHotelOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelOffersService.remove(id);
  }
}
