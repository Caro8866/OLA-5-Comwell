import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelRoomDto } from './create-hotel-room.dto';

export class UpdateHotelRoomDto extends PartialType(CreateHotelRoomDto) {}
