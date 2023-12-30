import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../test.module';
import { HotelOffersService } from './hotel-offers.service';
import { CreateHotelOfferDto } from './dto/create-hotel-offer.dto';

describe('HotelsController', () => {
  let app: INestApplication;
  let pService: HotelOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    pService = module.get<HotelOffersService>(HotelOffersService);

    await app.init();
    // remove all hotels to ensure clean tests
    await pService.removeAll();
  });

  afterEach(async () => {
    // Clean up resources after each test
    await app.close();
  });

  describe('/hotel-offers', () => {
    it('should insert a hotel package', async () => {
      // Arrange
      const newOffer = new CreateHotelOfferDto(
        'Some other deal',
        'Amazing description',
        'Even more amazing tag',
        'amazing-link',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-offers')
        .send(newOffer)
        .expect(201);

      const createdOffer = response.body;

      // ASSERT
      expect(createdOffer.name).toEqual(newOffer.name);
      expect(createdOffer._id).toBeDefined();
    });
    it('should fetch a hotel package', async () => {
      // Arrange
      const newOffer = new CreateHotelOfferDto(
        'Some other deal',
        'Amazing description',
        'Even more amazing tag',
        'amazing-link',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-offers')
        .send(newOffer)
        .expect(201);

      const createdOffer = response.body;

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-offers/${createdOffer._id}`)
        .send()
        .expect(200);

      const fetchedOffer = fetch.body;

      // ASSERT
      expect(fetchedOffer._id).toEqual(createdOffer._id);
    });
    it('should update a hotel package', async () => {
      // Arrange
      const newOffer = new CreateHotelOfferDto(
        'Some other deal',
        'Amazing description',
        'Even more amazing tag',
        'amazing-link',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-offers')
        .send(newOffer)
        .expect(201);

      const createdOffer = response.body;
      newOffer.name = 'New name';

      await request(app.getHttpServer())
        .put(`/hotel-offers/${createdOffer._id}`)
        .send(newOffer)
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-offers/${createdOffer._id}`)
        .send()
        .expect(200);

      const fetchedOffer = fetch.body;

      // ASSERT
      expect(fetchedOffer.name).toEqual('New name');
    });
    it('should fetch a hotel package', async () => {
      // Arrange
      const newOffer = new CreateHotelOfferDto(
        'Some other deal',
        'Amazing description',
        'Even more amazing tag',
        'amazing-link',
        'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/kampagner/b2b_efter%C3%A5r2023/b2b_kampagnefoto.jpg/dbae97959cf98e2e185d005176d3dc58.jpg',
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotel-offers')
        .send(newOffer)
        .expect(201);

      const createdOffer = response.body;

      await request(app.getHttpServer())
        .get(`/hotel-offers/${createdOffer._id}`)
        .send()
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/hotel-offers/${createdOffer._id}`)
        .send()
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/hotel-offers/${createdOffer._id}`)
        .send()
        .expect(200);
      const fetchedOffer = fetch.body;

      // ASSERT
      expect(fetchedOffer._id).toEqual(undefined);
    });
  });
});
