import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { HotelOffersService } from './hotel-offers.service';
import { CreateHotelOfferDto } from './dto/create-hotel-offer.dto';

@Injectable()
export class HotelOffersCommand {
  constructor(private readonly hotelOffersService: HotelOffersService) {}

  // DB seed service
  // npx nestjs-command create:offers
  @Command({
    command: 'create:offers',
    describe: 'creates offers visible on homepage',
  })
  async create() {
    const offer1 = await this.hotelOffersService.create(
      new CreateHotelOfferDto(
        'Some other deal',
        'Amazing description',
        'Even more amazing tag',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
        'amazing-link',
      ),
    );
    const offer2 = await this.hotelOffersService.create(
      new CreateHotelOfferDto(
        'The Black Weekend is on!',
        'Get 30% off stays and 20% added value on giftcards',
        'Hot deals',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/cro/events/comwell-roskilde-selskaber-fest-03.jpg/cd2338f549a479e738d42e58755fa896.jpg ',
        'hot-deals',
      ),
    );
    const offer3 = await this.hotelOffersService.create(
      new CreateHotelOfferDto(
        'Let us help with your next meeting',
        'We offer meeting space, catering and professional meeting place',
        'See Venues and meeting packages',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
        'meeting-and-conference',
      ),
    );
    const offer4 = await this.hotelOffersService.create(
      new CreateHotelOfferDto(
        'Christmas party with food and music',
        `Ready for your company's christmas party? Check out the hotels' Christmas deals`,
        'Mark your calendar',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/jul/jul-paa-hotellerne/comwell-centralvaerkstedet-julestemning.jpg/f9928fca562ac0bf77f27dc396273146.jpg`,
        'christmas',
      ),
    );

    if (offer1 && offer2 && offer3 && offer4) {
      console.log('Offer seeding finished successfully.');
    }
  }
}
