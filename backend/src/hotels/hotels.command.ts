import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';

import { HotelsService } from './hotels.service';

@Injectable()
export class HotelsCommand {
  constructor(private readonly hotelsService: HotelsService) {}

  //DB seed service
  @Command({
    command: 'create:hotels',
    describe: 'creates hotels',
  })
  async create() {
    console.log('whatever');
    const testHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Test hotel',
        'Aarhus',
        'Zealand',
        'Whatever descriptiong',
        'room desc',
        true,
        false,
        false,
      ),
    );
    console.log(testHotel);
  }
}
