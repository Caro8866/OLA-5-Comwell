import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
  console.log('Server is now live.');
  console.log(
    'If you want to seed the database please check backend/README.md for appropriate commands.',
  );
}
bootstrap();
