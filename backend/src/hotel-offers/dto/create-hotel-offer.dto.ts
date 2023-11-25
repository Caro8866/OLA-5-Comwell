import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHotelOfferDto {
  @IsNotEmpty({ message: 'Hotel offer name must be provided' })
  name: string;

  description: string;
  tag: string;
  href: string;
  @IsOptional()
  image: string;

  constructor(
    name: string,
    description: string,
    tag: string,
    href: string,
    image: string,
  ) {
    this.name = name;
    this.description = description;
    this.tag = tag;
    this.href = href;
    this.image = image;
  }
}
