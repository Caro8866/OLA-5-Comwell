import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { HotelRoomsService } from './hotel-rooms.service';

@Injectable()
export class HotelsCommand {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  // DB seed service
  // npx nestjs-command create:hotels
  @Command({
    command: 'create:hotel-rooms',
    describe: 'creates hotel rooms',
  })
  async create() {
    console.log('Inserting Hotel rooms');
    await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard',
        'Simple and functionally furnished room with a double bed, bathroom with toilet, flatscreen TV and workspace.',
        20,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-standard-vaerelse.jpg/6327646511e4529ac4c8adfe35cb6700.webp`,
      ),
    );
    await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Plus',
        'Simple and functionally furnished Standard Plus room with a double bed, bathroom with toilet, flatscreen TV, work space and tea/coffee-making facilities. The rooms overlook the near surroundings.',
        20,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-standard-plus-vaerelse.jpg/5374ff12053a017328660cb7dc5d79f2.webp`,
      ),
    );
    await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Junior Suite',
        'Our Junior Suites are large and spacious rooms with a big double bed and a small lounge area. It has a lovely bathroom with a separate toilet.',
        33,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-junior-suite.jpg/bad88b250312d9ed807b65d1a38e0cbc.webp`,
      ),
    );
    await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Suite',
        'We have two suites that are divided into two rooms with a partition wall/door. One room features a large double bed and the other a larger seating arrangement.',
        33,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-suite.jpg/ed47c954f70412332c50006defef7742.webp`,
      ),
    );
  }
}
