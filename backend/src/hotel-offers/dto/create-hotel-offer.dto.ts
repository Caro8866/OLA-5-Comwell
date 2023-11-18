import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHotelOfferDto {
  @IsNotEmpty({ message: 'Hptel offer name must be provided' })
  name: string;

  description: string;

  @IsOptional()
  icon: string;

  constructor(name: string, description: string, icon?: string) {
    this.name = name;
    this.description = description;
    this.icon = icon;
  }
}
