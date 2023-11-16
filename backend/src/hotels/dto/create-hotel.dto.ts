import { IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Area } from 'src/utils/Area';
import { Region } from 'src/utils/Region';

export class CreateHotelDto {
  @IsNotEmpty({ message: 'Hotel name cannot be empty' })
  @MinLength(4, { message: 'Hotel name must be at least 4 characters' })
  name: string;

  location: Area;
  region: Region;

  @IsNotEmpty({ message: 'Hotel description cannot be empty' })
  description: string;

  @IsOptional()
  roomsDescription: string;
  @IsOptional()
  isHotel: boolean;
  @IsOptional()
  isConferenceCenter: boolean;
  @IsOptional()
  isBanquet: boolean;

  constructor(
    name: string,
    location: Area,
    region: Region,
    description: string,
    roomsDescription?: string,
    isHotel?: boolean,
    isConferenceCenter?: boolean,
    isBanquet?: boolean,
  ) {
    this.name = name;
    this.location = location;
    this.region = region;
    this.description = description;
    this.roomsDescription = roomsDescription;
    this.isHotel = isHotel;
    this.isConferenceCenter = isConferenceCenter;
    this.isBanquet = isBanquet;
  }
}
