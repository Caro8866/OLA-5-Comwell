import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.signup(createUserDto);
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }
}
