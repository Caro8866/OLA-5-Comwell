import {
  Body,
  ConflictException,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  Get,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/roles.decorator';
import { RolesGuard } from './roles.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = (
      await this.authService.signIn(signInDto.email, signInDto.password)
    ).access_token;
    if (token) {
      response.cookie('token', token, { secure: true, sameSite: 'none' });
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  @Roles(Role.Admin)
  getAdmin(@Request() req) {
    return req.user;
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('logout')
  logout(@Res() response: Response) {
    this.authService.signOut(response);
  }
}
