import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePackageDto {
  @IsNotEmpty({ message: 'Package name must be provided' })
  name: string;

  type: string;
  tags: string[];
  description: string;
  image: string;

  @IsNotEmpty({ message: 'Package price must be provided' })
  price: number;

  @IsOptional()
  discount: number;

  constructor(
    name: string,
    type: string,
    tags: string[],
    description: string,
    image: string,
    price: number,
    discount?: number,
  ) {
    this.name = name;
    this.type = type;
    this.tags = tags;
    this.description = description;
    this.image = image;
    this.price = price;
    this.discount = discount;
  }
}
