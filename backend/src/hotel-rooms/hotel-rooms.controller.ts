import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';

@Controller('hotel-rooms')
export class HotelRoomsController {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  @Post()
  create(@Body() createHotelRoomDto: CreateHotelRoomDto) {
    return this.hotelRoomsService.create(createHotelRoomDto);
  }

  @Get()
  findAll() {
    return this.hotelRoomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelRoomsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    return this.hotelRoomsService.update(id, updateHotelRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelRoomsService.remove(id);
  }
}
