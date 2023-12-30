import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../test.module';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

describe('HotelsController', () => {
  let app: INestApplication;
  let hService: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    hService = module.get<HotelsService>(HotelsService);

    await app.init();
    // remove all hotels to ensure clean tests
    await hService.removeAll();
  });

  afterEach(async () => {
    // Clean up resources after each test
    await app.close();
  });

  describe('/hotels', () => {
    it('should insert a hotel', async () => {
      // Arrange
      const addons = [
        {
          name: 'Baby cot',
          price: 150,
          description: 'Price is for the complete stay',
          image:
            'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
        },
      ];

      const newHotel = new CreateHotelDto(
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
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel)
        .expect(201);

      const createdHotel = response.body;

      // ASSERT (expect)
      expect(createdHotel.name).toEqual(newHotel.name);
      expect(createdHotel._id).toBeDefined();
      expect(createdHotel.location).toEqual(newHotel.location);
    });
    it('should retrieve a hotel', async () => {
      // Arrange
      const addons = [
        {
          name: 'Baby cot',
          price: 150,
          description: 'Price is for the complete stay',
          image:
            'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
        },
      ];

      const newHotel = new CreateHotelDto(
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
      );

      // ACT
      // mock data
      const insertion = await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/hotels/${insertion.body._id}`)
        .send()
        .expect(200);
      // ASSERT (expect)
      expect(response.body._id).toEqual(insertion.body._id);
    });
    it('should update a hotel', async () => {
      // Arrange
      const addons = [
        {
          name: 'Baby cot',
          price: 150,
          description: 'Price is for the complete stay',
          image:
            'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
        },
      ];

      const newHotel = new CreateHotelDto(
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
      );

      // ACT
      // mock data
      const insertion = await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel)
        .expect(201);

      newHotel.name = 'Updated Name';

      await request(app.getHttpServer())
        .put(`/hotels/${insertion.body._id}`)
        .send(newHotel)
        .expect(200);

      const response = await request(app.getHttpServer())
        .get(`/hotels/${insertion.body._id}`)
        .send()
        .expect(200);
      // ASSERT (expect)
      expect(response.body.name).toEqual('Updated Name');
    });
    it('should retrieve all hotels', async () => {
      // Arrange
      const addons = [
        {
          name: 'Baby cot',
          price: 150,
          description: 'Price is for the complete stay',
          image:
            'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
        },
      ];

      const newHotel1 = new CreateHotelDto(
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
      );

      const newHotel2 = new CreateHotelDto(
        'Test Hotel',
        'Copenhagen',
        'Zealand',
        `Step inside the lobby of Comwell Copenhagen Portside and be blown away by the lively atmosphere. Here you'll find a mix of locals stopping by for a fresh cup of coffee, freelancers working in the open Co-Work area, and international guests meeting over a cocktail. A Nordic version of a lively Italian square. Raw. Refined and incomparable. We are located in the heart of the booming Nordhavn surrounded by water and with amazing access to everything a port city has to offer - just 20 minutes from Copenhagen Airport and 10 minutes from the Copenhagen Central Station.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/comwell-portside-06.jpg/6a816480ae65dd072c336e45366d915e.webp`,
        `At Comwell Copenhagen Portside we have 484 rooms`,
        true,
        true,
        true,
        addons,
      );

      // ACT
      // mock data
      await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel1)
        .expect(201);

      await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel2)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get(`/hotels`)
        .send()
        .expect(200);

      // ASSERT (expect)
      expect(response.body.length).toEqual(2);
    });
    it('should remove one hotel', async () => {
      // Arrange
      const addons = [
        {
          name: 'Baby cot',
          price: 150,
          description: 'Price is for the complete stay',
          image:
            'https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/familie.jpg/c8981acfb16ccd6df98bb3ec5b92912e.webp',
        },
      ];

      const newHotel1 = new CreateHotelDto(
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
      );

      const newHotel2 = new CreateHotelDto(
        'Test Hotel',
        'Copenhagen',
        'Zealand',
        `Step inside the lobby of Comwell Copenhagen Portside and be blown away by the lively atmosphere. Here you'll find a mix of locals stopping by for a fresh cup of coffee, freelancers working in the open Co-Work area, and international guests meeting over a cocktail. A Nordic version of a lively Italian square. Raw. Refined and incomparable. We are located in the heart of the booming Nordhavn surrounded by water and with amazing access to everything a port city has to offer - just 20 minutes from Copenhagen Airport and 10 minutes from the Copenhagen Central Station.`,
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ccp/comwell-portside-06.jpg/6a816480ae65dd072c336e45366d915e.webp`,
        `At Comwell Copenhagen Portside we have 484 rooms`,
        true,
        true,
        true,
        addons,
      );

      // ACT
      // mock data
      const hotel1 = await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel1)
        .expect(201);

      const hotel2 = await request(app.getHttpServer())
        .post('/hotels')
        .send(newHotel2)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/hotels/${hotel1.body._id}`)
        .send()
        .expect(200);

      const fetch1 = await request(app.getHttpServer())
        .get(`/hotels/${hotel1.body._id}`)
        .send()
        .expect(200);

      const fetch2 = await request(app.getHttpServer())
        .get(`/hotels/${hotel2.body._id}`)
        .send()
        .expect(200);

      const fetchAll = await request(app.getHttpServer())
        .get(`/hotels`)
        .send()
        .expect(200);

      // ASSERT (expect)
      expect(fetch1.body._id).toEqual(undefined);
      expect(fetch2.body._id).toEqual(hotel2.body._id);
      expect(fetchAll.body.length).toEqual(1);
    });
  });
});
