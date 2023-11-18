import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelOfferDto } from './create-hotel-offer.dto';

export class UpdateHotelOfferDto extends PartialType(CreateHotelOfferDto) {
  id: string;
}
