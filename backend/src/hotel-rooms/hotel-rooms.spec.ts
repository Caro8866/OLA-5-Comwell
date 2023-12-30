import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../test.module';
import { HotelRoomsService } from './hotel-rooms.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';

describe('HotelsController', () => {
  let app: INestApplication;
  let hrService: HotelRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    hrService = module.get<HotelRoomsService>(HotelRoomsService);

    await app.init();
    // remove all hotels to ensure clean tests
    await hrService.removeAll();
  });

  afterEach(async () => {
    // Clean up resources after each test
    await app.close();
  });

  describe('/hotel-rooms', () => {
    it('should insert a hotel room', async () => {
      // Arrange
      const newRoom = new CreateHotelRoomDto(
        'Executive Suite',
        `Enjoy a wonderful night's sleep in an Auping bed and wake up to a beautiful sea view as the sun rises over the Little Belt. The King suite is 110m2 and is furnished with furniture from Arne Jakobsen and Poul Kjærholm. The King suite has access to a private terrace, where you can enjoy the morning sun before the delicious breakfast buffet in the restaurant.`,
        110,
        3740,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-1184.jpg/dd73d5e6befbaa7abab8a82eb5d929d2.jpg`,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-rooms')
        .send(newRoom)
        .expect(201);

      const createdRoom = response.body;

      // ASSERT
      expect(createdRoom.name).toEqual(newRoom.name);
      expect(createdRoom._id).toBeDefined();
    });
    it('should fetch a hotel room', async () => {
      // Arrange
      const newRoom = new CreateHotelRoomDto(
        'Executive Suite',
        `Enjoy a wonderful night's sleep in an Auping bed and wake up to a beautiful sea view as the sun rises over the Little Belt. The King suite is 110m2 and is furnished with furniture from Arne Jakobsen and Poul Kjærholm. The King suite has access to a private terrace, where you can enjoy the morning sun before the delicious breakfast buffet in the restaurant.`,
        110,
        3740,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-1184.jpg/dd73d5e6befbaa7abab8a82eb5d929d2.jpg`,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-rooms')
        .send(newRoom)
        .expect(201);

      const createdRoom = response.body;

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-rooms/${createdRoom._id}`)
        .send()
        .expect(200);

      const fetchedRoom = fetch.body;

      // ASSERT
      expect(fetchedRoom._id).toEqual(createdRoom._id);
    });
    it('should update a hotel room', async () => {
      // Arrange
      const newRoom = new CreateHotelRoomDto(
        'Executive Suite',
        `Enjoy a wonderful night's sleep in an Auping bed and wake up to a beautiful sea view as the sun rises over the Little Belt. The King suite is 110m2 and is furnished with furniture from Arne Jakobsen and Poul Kjærholm. The King suite has access to a private terrace, where you can enjoy the morning sun before the delicious breakfast buffet in the restaurant.`,
        110,
        3740,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-1184.jpg/dd73d5e6befbaa7abab8a82eb5d929d2.jpg`,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-rooms')
        .send(newRoom)
        .expect(201);

      const createdRoom = response.body;
      newRoom.name = 'New name';

      await request(app.getHttpServer())
        .put(`/hotel-rooms/${createdRoom._id}`)
        .send(newRoom)
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-rooms/${createdRoom._id}`)
        .send()
        .expect(200);

      const fetchedRoom = fetch.body;

      // ASSERT
      expect(fetchedRoom.name).toEqual('New name');
    });
    it('should fetch a hotel room', async () => {
      // Arrange
      const newRoom = new CreateHotelRoomDto(
        'Executive Suite',
        `Enjoy a wonderful night's sleep in an Auping bed and wake up to a beautiful sea view as the sun rises over the Little Belt. The King suite is 110m2 and is furnished with furniture from Arne Jakobsen and Poul Kjærholm. The King suite has access to a private terrace, where you can enjoy the morning sun before the delicious breakfast buffet in the restaurant.`,
        110,
        3740,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/-kongebrogaarden-vaerelse-1184.jpg/dd73d5e6befbaa7abab8a82eb5d929d2.jpg`,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-rooms')
        .send(newRoom)
        .expect(201);

      const createdRoom = response.body;

      await request(app.getHttpServer())
        .get(`/hotel-rooms/${createdRoom._id}`)
        .send()
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/hotel-rooms/${createdRoom._id}`)
        .send()
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-rooms/${createdRoom._id}`)
        .send()
        .expect(200);
      const fetchedRoom = fetch.body;

      // ASSERT
      expect(fetchedRoom._id).toEqual(undefined);
    });
  });
});
