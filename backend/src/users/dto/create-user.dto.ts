import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be Empty.' })
  @MinLength(6, { message: 'Password must be 6 characters.' })
  @MaxLength(128, { message: 'Password must be less than 128.' })
  password: string;
}
