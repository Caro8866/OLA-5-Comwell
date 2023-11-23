import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelsService } from 'src/hotels/hotels.service';

@Injectable()
export class HotelRoomsCommand {
  constructor(
    private readonly hotelRoomsService: HotelRoomsService,
    private readonly hotelsService: HotelsService,
  ) {}

  // DB seed service
  // npx nestjs-command create:hotel-rooms
  @Command({
    command: 'create:hotel-rooms',
    describe: 'creates hotel rooms',
  })
  async create() {
    // Hotels needed to associate rooms with them
    const allHotels = await this.hotelsService.findAll();
    const aarhus = allHotels.filter((hotel) => hotel.name === 'Aarhus')[0];
    const portside = allHotels.filter(
      (hotel) => hotel.name === 'Copenhagen Portside',
    )[0];
    const kolding = allHotels.filter((hotel) => hotel.name === 'Kolding')[0];
    const holte = allHotels.filter((hotel) => hotel.name === 'Holte')[0];
    const kongebrogaarden = allHotels.filter(
      (hotel) => hotel.name === 'Kongebrogaarden',
    )[0];

    const kolding1 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard',
        'Simple and functionally furnished room with a double bed, bathroom with toilet, flatscreen TV and workspace.',
        20,
        831,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-standard-vaerelse.jpg/6327646511e4529ac4c8adfe35cb6700.webp`,
      ),
    );
    const kolding2 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Plus',
        'Simple and functionally furnished Standard Plus room with a double bed, bathroom with toilet, flatscreen TV, work space and tea/coffee-making facilities. The rooms overlook the near surroundings.',
        20,
        831,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-standard-plus-vaerelse.jpg/5374ff12053a017328660cb7dc5d79f2.webp`,
      ),
    );
    const kolding3 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Junior Suite',
        'Our Junior Suites are large and spacious rooms with a big double bed and a small lounge area. It has a lovely bathroom with a separate toilet.',
        33,
        1465,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-junior-suite.jpg/bad88b250312d9ed807b65d1a38e0cbc.webp`,
      ),
    );
    const kolding4 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Suite',
        'We have two suites that are divided into two rooms with a partition wall/door. One room features a large double bed and the other a larger seating arrangement.',
        33,
        1466,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/vaerelser/comwell-kolding-suite.jpg/ed47c954f70412332c50006defef7742.webp`,
      ),
    );

    await this.hotelsService.addRoom(kolding._id.toString(), kolding1);
    await this.hotelsService.addRoom(kolding._id.toString(), kolding2);
    await this.hotelsService.addRoom(kolding._id.toString(), kolding3);
    await this.hotelsService.addRoom(kolding._id.toString(), kolding4);

    const aarhus1 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Single',
        'These rooms are all on the 3rd - 9th floors and either have a bed measuring 120 x 200 cm or 140 x 200 cm. The bed is elevated, so the edge of it is level with the windowsill, enabling you to lie and enjoy the lovely view from your bed.',
        16,
        1544,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/caa/vaerelser/comwell-aarhus-standard-single.jpg/768e472280e825d265519065a42002b5.jpg`,
      ),
    );

    const aarhus2 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard',
        'Our standard rooms are decorated in a modern style and feature all amenities. The rooms have a double bed measuring 180 x 200 cm. The bed consists of two mattresses, so the bed can be split into two with 20 cm between each mattress.',
        20,
        1544,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/caa/vaerelser/comwell-aarhus-standard-vaerelse.jpg/6fdb5efc3331cb9ea9d3f6eeadff1c3b.webp`,
      ),
    );

    const aarhus3 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Business Double',
        'Luxurious rooms with great views of the city or Aarhus Harbor. As a guest in our Business Class rooms, you will have access to our Business Lounge on the 12th floor, where you can help yourself to snacks and beverages free of charge during your stay.',
        24,
        1844,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/caa/vaerelser/comwell-aarhus-double-room.jpg/e6073b9905e0c5141b07148fd2eb194e.jpg`,
      ),
    );

    await this.hotelsService.addRoom(aarhus._id.toString(), aarhus1);
    await this.hotelsService.addRoom(aarhus._id.toString(), aarhus2);
    await this.hotelsService.addRoom(aarhus._id.toString(), aarhus3);

    const portside1 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Small',
        'Make your visit memorable in our thoughtfully designed non-smoking Standard Small that features an awe-inspiring space with 1 Double bed (or 2 Twin beds upon request) with sumptuous linens as well as a work area and a modern bathroom with a shower.',
        12,
        1044,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/rs25047_ccp_room_sscp,2-fit-1685548107.jpg/9d1a2bbc7c8d000b2ead02bc9328f6c4.webp`,
      ),
    );

    const portside2 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Double',
        'Our cosy Standard Double room is beautifully furnished with Danish furniture and a double bed (or two single beds upon request) with quality linens. The bathroom is modernly equipped with a shower or bathtub.',
        19,
        1644,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-copenhagen-portside-standard-double.jpg/63d0f6b4b16a4fe70b1e6cb0a318ef13.webp`,
      ),
    );

    const portside3 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Superior Double',
        'Make your stay memorable in our Superior Double room with a double bed (or two single beds upon request) with quality linens and allergy-friendly pillows and duvets. The room features a small work and lounge area and a beautifully appointed bathroom with a shower or bathtub.',
        21,
        1444,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/vaerelser/comwell-copenhagen-portside-superior-double.jpg/d5dc6fef8208f07986e07aab6e9131a5.webp`,
      ),
    );

    await this.hotelsService.addRoom(portside._id.toString(), portside1);
    await this.hotelsService.addRoom(portside._id.toString(), portside2);
    await this.hotelsService.addRoom(portside._id.toString(), portside3);

    const holte1 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard Double',
        `Our standard rooms are relatively small and cosy. The vast majority of these rooms are located in the hotel's main building on different floors, where a few are located at the top level in the annexe.`,
        18,
        1044,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cho/vaerelser/comwell-holte-standard-dobbelt.jpg/ad7f05b5c8d5f7ca6682a8fb90ba3d0f.jpg`,
      ),
    );

    const holte2 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Junior Suite',
        `Our standard rooms are relatively small and cosy. The vast majority of these rooms are located in the hotel's main building on different floors, where a few are located at the top level in the annexe.`,
        44,
        1540,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cho/vaerelser/comwell-holte-junior-suite.jpg/ec841cf907a271dfc0437f972d82a1fc.jpg`,
      ),
    );

    await this.hotelsService.addRoom(holte._id.toString(), holte1);
    await this.hotelsService.addRoom(holte._id.toString(), holte2);

    const kongebrogaarden1 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Standard',
        `Our Standard rooms are furnished in classic Danish design. All rooms have a balcony or terrace with a view overlooking Little Belt, forest, meadows or the atrium courtyard. Our Standard rooms have modern bathrooms with a shower, workspace, flatscreen TV, tea/coffee station and safety deposit box. The room has a quality double bed to guarantee you a good night's sleep.`,
        23,
        1380,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20580_rs18166_kongebrogaarden-vaerelse-1586-original.jpg/f26f41a56d5b3d2ef3bc1060a20c4bff.jpg`,
      ),
    );

    const kongebrogaarden2 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Suite',
        `Our Suites are furnished in Danish design. All rooms have a balcony or terrace with a view overlooking Little Belt, forest, meadows or the atrium courtyard. Our suites have modern bathrooms with showers, workspace, flatscreen TV, tea/coffee station and safety deposit box. The room has two quality beds, which have been pushed together and guarantee you a good night's sleep. The large suite is very spacious and if you are a family with young children, the suite is an ideal way to enable all the family to sleep together during your stay.`,
        37,
        1731,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-0070.jpg/c54ce39bdd41b21bf817c5ddfc4effd6.jpg`,
      ),
    );

    const kongebrogaarden3 = await this.hotelRoomsService.create(
      new CreateHotelRoomDto(
        'Executive Suite',
        `Enjoy a wonderful night's sleep in an Auping bed and wake up to a beautiful sea view as the sun rises over the Little Belt. The King suite is 110m2 and is furnished with furniture from Arne Jakobsen and Poul Kjærholm. The King suite has access to a private terrace, where you can enjoy the morning sun before the delicious breakfast buffet in the restaurant.`,
        110,
        3740,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-1184.jpg/dd73d5e6befbaa7abab8a82eb5d929d2.jpg`,
      ),
    );

    await this.hotelsService.addRoom(
      kongebrogaarden._id.toString(),
      kongebrogaarden1,
    );
    await this.hotelsService.addRoom(
      kongebrogaarden._id.toString(),
      kongebrogaarden2,
    );
    await this.hotelsService.addRoom(
      kongebrogaarden._id.toString(),
      kongebrogaarden3,
    );

    if (
      aarhus1 &&
      aarhus2 &&
      aarhus3 &&
      portside1 &&
      portside2 &&
      portside3 &&
      holte1 &&
      holte2 &&
      kongebrogaarden1 &&
      kongebrogaarden2 &&
      kongebrogaarden3 &&
      kolding1 &&
      kolding2 &&
      kolding3 &&
      kolding4
    ) {
      console.log('Hotel room seeding finished successfully.');
    }
  }
}
