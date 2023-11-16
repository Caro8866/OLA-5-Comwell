import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/comwell'),
    AuthModule,
    HotelsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
