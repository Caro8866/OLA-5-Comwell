import { IsNotEmpty, IsEmail, Validate } from 'class-validator';
import { CustomPasswordValidator } from './validators/CustomPasswordValidator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @Validate(CustomPasswordValidator, {
    message:
      'Password must be at least 6 characters long and contain at least one uppercase letter and one number.',
  })
  password: string;
}
