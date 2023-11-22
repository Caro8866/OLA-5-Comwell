import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { HotelsCommand } from 'src/hotels/hotels.command';
import { HotelsService } from 'src/hotels/hotels.service';
import { Hotel, HotelSchema } from 'src/hotels/schemas/hotel.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  providers: [HotelsCommand, HotelsService],
  exports: [HotelsCommand],
})
export class SeedsModule {}
