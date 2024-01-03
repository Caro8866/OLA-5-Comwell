import {
  Body,
  Controller,
  Get,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/roles.decorator';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneId(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
