import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/comwell'),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
