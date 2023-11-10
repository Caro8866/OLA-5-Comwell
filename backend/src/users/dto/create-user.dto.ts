import { IsNotEmpty, IsEmail, Validate, IsInt, IsIn } from 'class-validator';
import { CustomPasswordValidator } from './validators/CustomPasswordValidator';
import { IsDateOfBirthValid } from './validators/isDateOfBirthValid';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Please enter a name.' })
  fullName: string;

  @IsNotEmpty({ message: 'Email cannot be empty.' })
  @IsEmail()
  email: string;

  @IsInt()
  zipCode: number;

  @IsInt()
  phone: number;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @Validate(CustomPasswordValidator, {
    message:
      'Password must be at least 6 characters long and contain at least one uppercase letter and one number.',
  })
  password: string;

  @IsNotEmpty({ message: 'Gender cannot be empty.' })
  @IsIn(['Prefer not to say', 'Male', 'Female', 'Other'], {
    message:
      'Invalid gender. Allowed values are "Prefer not to say", "Male", "Female" or ""Other.',
  })
  gender: string;

  // @IsDate({ message: 'Invalid date of birth.' })
  @Validate(IsDateOfBirthValid, {
    message: 'The person must be at least 18 years old.',
  })
  dateOfBirth: Date;
}
