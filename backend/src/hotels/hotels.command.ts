import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';

import { HotelsService } from './hotels.service';

@Injectable()
export class HotelsCommand {
  constructor(private readonly hotelsService: HotelsService) {}

  // DB seed service
  // npx nestjs-command create:hotels
  @Command({
    command: 'create:hotels',
    describe: 'creates hotels',
  })
  async create() {
    const addons = [
      {
        name: 'Baby cot',
        price: 150,
        description: 'Price is for the complete stay',
        image:
          'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
      },
      {
        name: 'Early check-in',
        price: 200,
        description:
          'With early check-in, you will be able to arrive earlier than the usual check-in. Subject to availability and specific time will be confirmed by the hotel',
        image:
          'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/generisk-vaerelse.jpg/76c7f48299e3c216c11de067b73952e0.webp',
      },
      {
        name: 'Late departure',
        price: 200,
        description:
          'With late departure you can extend your stay for a few hours. Subject to availability and time will be confirmed by the hotel.',
        image:
          'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/generisk-vaerelse.jpg/76c7f48299e3c216c11de067b73952e0.webp',
      },
    ];

    const aarhusHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Aarhus',
        'Aarhus',
        'Jutland',
        `Comwell Aarhus welcomes you to a world of design, quality and well-being with the city's best view of the harbour, forest and beach. A hotel stay in Aarhus welcomes you with endless possibilities for entertainment and unique experiences.The hotel is located at one of the city's most central addresses close to the centrum and the station.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/caa/udefra/comwell-aarhus-bygning.jpg/c4677c907569793b5e2e89ef52b55da4.webp`,
        `We have 240 rooms divided into five categories, all of which have a beautiful view. The rooms are decorated in collaboration with the Danish design company HAY and feature the necessary amenities. Free WiFi is available in all rooms. There are free coffee stations on the 6th and 7th floor.`,
        true,
        false,
        false,
        addons,
      ),
    );

    const portsideHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Copenhagen Portside',
        'Copenhagen',
        'Zealand',
        `Step inside the lobby of Comwell Copenhagen Portside and be blown away by the lively atmosphere. Here you'll find a mix of locals stopping by for a fresh cup of coffee, freelancers working in the open Co-Work area, and international guests meeting over a cocktail. A Nordic version of a lively Italian square. Raw. Refined and incomparable. We are located in the heart of the booming Nordhavn surrounded by water and with amazing access to everything a port city has to offer - just 20 minutes from Copenhagen Airport and 10 minutes from the Copenhagen Central Station.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/comwell-portside-06.jpg/6a816480ae65dd072c336e45366d915e.webp`,
        `At Comwell Copenhagen Portside we have 484 rooms`,
        true,
        true,
        true,
        addons,
      ),
    );

    const holteHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Holte',
        'Holte',
        'Zealand',
        `Our hotel is located in the beautiful surroundings of Vaserne and Rude Forest in North Zealand - only 15 minutes drive from the centre of Copenhagen. The many beautiful green areas around the hotel make Comwell Holte perfect for both team building and team development activities.

        The beautiful location, the Fireplace Bar, Restaurant Brasseriet, and the large terrace make it an attractive place to meet - both for private and business guests.
        
        The hotel is spread across various buildings and is beautifully located on a slope. This means that there are stairs to all rooms, and the hotel is therefore not suitable for guests with limited mobility or disabilities.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cho/udendoers/comwell-holte-061.jpg/3db33078ba1088c86ef0ea90a140b4f9.jpg`,
        `Our rooms are furnished with all modern conveniences and in the Nordic style. The appearance varies and not all rooms look exactly like the picture. We have 112 rooms in total - 6 junior suites, 34 superior rooms, 45 standard rooms with a double bed and 32 standard rooms with two single beds (these rooms are located on the hotel's top level in the annexe). `,
        true,
        true,
        false,
        addons,
      ),
    );

    const kongebrogaardenHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Kongebrogaarden',
        'Middelfart',
        'Funen',
        `Kongebrogaarden is a very special place with peace, aesthetics and atmosphere.

        From 1584 the place functioned as a service/crossing/shipping point for King Frederik II. Since then, the King's son, the well-known Christian IV, also used the place. From 1812 Kongebrogaarden became an inn and later a restaurant.
        
        Just a few days after the start of World War I, Danish soldiers were lodged at Kongebrogaarden and all the way up the coast they took in boat refugees - young men from Southern Jutland, who fled from the German war service. During World War II, the place was a popular establishment for the Nazis living there.
        
        In 2011, Comwell Hotels took ownership of Kongebrogaarden, and in 2018 the hotel was voted for 'Best Luxury Hotel of the Year'`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs23582_kongebrogaarden-026-original.jpg/94c4aea04a8a530f444572fbc53f31c9.webp`,
        `We have 62 well-appointed rooms, including 18 suites. All our rooms have a balcony or a terrace with a view over the water, forest or the atrium. The rooms have just got a thorough renovation and are furnished with classic and modern furniture and genuine art.`,
        true,
        true,
        false,
        addons,
      ),
    );

    const koldingHotel = await this.hotelsService.create(
      new CreateHotelDto(
        'Kolding',
        'Kolding',
        'Jutland',
        `Comwell Hotel Kolding is centrally situated in the centre of Denmark and has a beautiful view of Kolding city and fjord. We are a specialised conference hotel that offers a unique range of flexible meeting and conference facilities, but we also have facilities for many other occasions such as weddings or company parties.

        Our central location provides easy access, and we are located near a number of famous attractions, making it ideal whether you need a conference hotel, need accommodation for sightseeing or for a weekend trip with your partner.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cko/comwell_kolding_facade-aften.jpg/2ed818c0d2936281b9f250ee74a05972.webp`,
        `We have 180 double rooms, all of which were renovated in 2019 and have new beds and furnishings. They are all decorated in a modern style with all the conveniences and plenty of natural light. Among these rooms, we offer four different categories.`,
        true,
        false,
        false,
        addons,
      ),
    );
    if (
      koldingHotel &&
      kongebrogaardenHotel &&
      aarhusHotel &&
      portsideHotel &&
      holteHotel
    ) {
      console.log('Hotel seeding finished successfully.');
    }
  }
}
