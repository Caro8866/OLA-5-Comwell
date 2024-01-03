import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
}
