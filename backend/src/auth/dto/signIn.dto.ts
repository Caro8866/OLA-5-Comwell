import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'Please enter an email.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;
}
