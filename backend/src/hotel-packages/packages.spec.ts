import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TestModule } from '../test.module';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';

describe('HotelsController', () => {
  let app: INestApplication;
  let pService: PackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    pService = module.get<PackagesService>(PackagesService);

    await app.init();
    // remove all hotels to ensure clean tests
    await pService.removeAll();
  });

  afterEach(async () => {
    // Clean up resources after each test
    await app.close();
  });

  describe('/packages', () => {
    it('should insert a hotel package', async () => {
      // Arrange
      const newPackage = new CreatePackageDto(
        'Overnight stay with breakfast buffet',
        'Gastronomy',
        ['2-course dinner/buffet', 'Accomodation', 'Breakfast Buffet'],
        'Enjoy an overnight stay with a 2 course dinner at selected Comwell Hotels.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20221_rs17728_comwell-kongebrogaarden-2018-019-original.jpg/2b695bb53aa5a89d509123e77bc8ab65.jpg`,
        1.15,
        0,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/packages')
        .send(newPackage)
        .expect(201);

      const createdPackage = response.body;

      // ASSERT
      expect(createdPackage.name).toEqual(newPackage.name);
      expect(createdPackage._id).toBeDefined();
    });
    it('should fetch a hotel package', async () => {
      // Arrange
      const newPackage = new CreatePackageDto(
        'Overnight stay with breakfast buffet',
        'Gastronomy',
        ['2-course dinner/buffet', 'Accomodation', 'Breakfast Buffet'],
        'Enjoy an overnight stay with a 2 course dinner at selected Comwell Hotels.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20221_rs17728_comwell-kongebrogaarden-2018-019-original.jpg/2b695bb53aa5a89d509123e77bc8ab65.jpg`,
        1.15,
        0,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/packages')
        .send(newPackage)
        .expect(201);

      const createdPackage = response.body;

      const fetch = await request(app.getHttpServer())
        .get(`/packages/${createdPackage._id}`)
        .send()
        .expect(200);

      const fetchedPackage = fetch.body;

      // ASSERT
      expect(fetchedPackage._id).toEqual(createdPackage._id);
    });
    it('should update a hotel package', async () => {
      // Arrange
      const newPackage = new CreatePackageDto(
        'Overnight stay with breakfast buffet',
        'Gastronomy',
        ['2-course dinner/buffet', 'Accomodation', 'Breakfast Buffet'],
        'Enjoy an overnight stay with a 2 course dinner at selected Comwell Hotels.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20221_rs17728_comwell-kongebrogaarden-2018-019-original.jpg/2b695bb53aa5a89d509123e77bc8ab65.jpg`,
        1.15,
        0,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/packages')
        .send(newPackage)
        .expect(201);

      const createdPackage = response.body;
      newPackage.name = 'New name';

      await request(app.getHttpServer())
        .put(`/packages/${createdPackage._id}`)
        .send(newPackage)
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/packages/${createdPackage._id}`)
        .send()
        .expect(200);

      const fetchedPackage = fetch.body;

      // ASSERT
      expect(fetchedPackage.name).toEqual('New name');
    });
    it('should fetch a hotel package', async () => {
      // Arrange
      const newPackage = new CreatePackageDto(
        'Overnight stay with breakfast buffet',
        'Gastronomy',
        ['2-course dinner/buffet', 'Accomodation', 'Breakfast Buffet'],
        'Enjoy an overnight stay with a 2 course dinner at selected Comwell Hotels.',
        `https://cdn.dwarf.dk/comwell-cms-production/img/containers/main/hoteller/ckg/rs20221_rs17728_comwell-kongebrogaarden-2018-019-original.jpg/2b695bb53aa5a89d509123e77bc8ab65.jpg`,
        1.15,
        0,
      );

      // ACT
      const response = await request(app.getHttpServer())
        .post('/packages')
        .send(newPackage)
        .expect(201);

      const createdPackage = response.body;

      await request(app.getHttpServer())
        .get(`/packages/${createdPackage._id}`)
        .send()
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/packages/${createdPackage._id}`)
        .send()
        .expect(200);

      const fetch = await request(app.getHttpServer())
        .get(`/packages/${createdPackage._id}`)
        .send()
        .expect(200);
      const fetchedPackage = fetch.body;

      // ASSERT
      expect(fetchedPackage._id).toEqual(undefined);
    });
  });
});
