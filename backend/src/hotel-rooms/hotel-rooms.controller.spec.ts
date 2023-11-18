import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomsController } from './hotel-rooms.controller';
import { HotelRoomsService } from './hotel-rooms.service';

describe('HotelRoomsController', () => {
  let controller: HotelRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelRoomsController],
      providers: [HotelRoomsService],
    }).compile();

    controller = module.get<HotelRoomsController>(HotelRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
