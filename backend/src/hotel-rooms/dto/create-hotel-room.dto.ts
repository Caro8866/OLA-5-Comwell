import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHotelRoomDto {
  @IsNotEmpty({ message: 'Room name must be provided' })
  name: string;

  description: string;
  size: number;

  @IsOptional()
  image: string;

  constructor(name: string, description: string, size: number, image?: string) {
    this.name = name;
    this.description = description;
    this.size = size;
    this.image = image;
  }
}
