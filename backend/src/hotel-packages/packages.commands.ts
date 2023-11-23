import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { HotelsService } from 'src/hotels/hotels.service';

@Injectable()
export class PackagesCommand {
  constructor(
    private readonly packagesService: PackagesService,
    private readonly hotelsService: HotelsService,
  ) {}

  // DB seed service
  // npx nestjs-command create:packages
  @Command({
    command: 'create:packages',
    describe: 'creates experience packages',
  })
  async create() {
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

    const package1 = await this.packagesService.create(
      new CreatePackageDto(
        'Overnight stay with breakfast buffet',
        'Gastronomy',
        ['2-course dinner/buffet', 'Accomodation', 'Breakfast Buffet'],
        'Enjoy an overnight stay with a 2 course dinner at selected Comwell Hotels.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20221_rs17728_comwell-kongebrogaarden-2018-019-original.jpg/2b695bb53aa5a89d509123e77bc8ab65.jpg`,
        1.2,
        0,
      ),
    );

    const package2 = await this.packagesService.create(
      new CreatePackageDto(
        'Blissful Break',
        'Gastronomy',
        ['Coffee and cake', 'Welcome drink', '3 course dinner/buffet'],
        'Cosy afternoon coffee with cake - and later 3-course dinner',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cbo/restaurant/comwell-borupgaard-restaurant-skaldyrsaften-01.jpg/23b9c51a7c7c4814eaa67769d713f2e1.jpg`,
        1.25,
        0,
      ),
    );

    const package3 = await this.packagesService.create(
      new CreatePackageDto(
        'Spadelight at Comwell-hotels',
        'SPA',
        ['AquaSpa', 'Fitness room', 'Spa towel'],
        'Enjoy a spa stay at one of our two spa hotels in Denmark. This stay is including free AquaSpa access, 3-course dinner, accommodation and breakfast buffet.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cbo/spa/comwell-borupgaard-spa-01.jpg/460861ac2f394f0d17c5ffac6049099b.webp`,
        1.45,
        0,
      ),
    );

    await this.hotelsService.addPackage(aarhus._id.toString(), package1);
    await this.hotelsService.addPackage(aarhus._id.toString(), package2);
    await this.hotelsService.addPackage(aarhus._id.toString(), package3);

    await this.hotelsService.addPackage(portside._id.toString(), package1);
    await this.hotelsService.addPackage(portside._id.toString(), package2);
    await this.hotelsService.addPackage(portside._id.toString(), package3);

    await this.hotelsService.addPackage(kolding._id.toString(), package1);
    await this.hotelsService.addPackage(kolding._id.toString(), package2);

    await this.hotelsService.addPackage(holte._id.toString(), package1);
    await this.hotelsService.addPackage(holte._id.toString(), package3);

    await this.hotelsService.addPackage(
      kongebrogaarden._id.toString(),
      package2,
    );
    await this.hotelsService.addPackage(
      kongebrogaarden._id.toString(),
      package3,
    );

    if (package1 && package2 && package3) {
      console.log('Package seeding finished successfully.');
    }
  }
}
