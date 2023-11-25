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
  image: string;

  @IsOptional()
  addons: {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }[];

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
    image: string,
    roomsDescription?: string,
    isHotel?: boolean,
    isConferenceCenter?: boolean,
    isBanquet?: boolean,
    addons?: {
      name: string;
      price: number;
      description?: string;
      image?: string;
    }[],
  ) {
    this.name = name;
    this.location = location;
    this.region = region;
    this.description = description;
    this.image = image;
    this.addons = addons;
    this.roomsDescription = roomsDescription;
    this.isHotel = isHotel;
    this.isConferenceCenter = isConferenceCenter;
    this.isBanquet = isBanquet;
  }
}
