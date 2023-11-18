import { Test, TestingModule } from '@nestjs/testing';
import { HotelOffersService } from './hotel-offers.service';

describe('HotelOffersService', () => {
  let service: HotelOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelOffersService],
    }).compile();

    service = module.get<HotelOffersService>(HotelOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
