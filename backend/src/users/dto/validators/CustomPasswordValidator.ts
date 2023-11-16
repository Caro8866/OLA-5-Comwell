import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPasswordValidator implements ValidatorConstraintInterface {
  validate(password: string) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // At least one uppercase letter, one number, and 6 characters long
    return regex.test(password);
  }

  defaultMessage() {
    return `Password must be at least 6 characters long and contain at least one uppercase letter and one number.`;
  }
}
