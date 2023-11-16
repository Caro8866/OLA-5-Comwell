import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateOfBirthValid', async: false })
export class IsDateOfBirthValid implements ValidatorConstraintInterface {
  validate(dateOfBirth: Date) {
    // Calculate the age based on the provided date of birth
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the person is 18 years old or older
    return age >= 18;
  }

  defaultMessage() {
    return `The person must be at least 18 years old.`;
  }
}
