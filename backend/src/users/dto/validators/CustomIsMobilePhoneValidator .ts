import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customIsMobilePhone', async: false })
export class CustomIsMobilePhoneValidator
  implements ValidatorConstraintInterface
{
  validate(phoneNumber: string, args: ValidationArguments) {
    // Regular expressions for valid phone numbers in different country codes
    const phoneRegexMap: { [key: string]: RegExp } = {
      // Example: US phone numbers (country code: +1)
      US: /^(?:\+1)?[0-9]{10}$/,

      // Example: UK phone numbers (country code: +44)
      UK: /^(?:\+44)?[0-9]{10,12}$/,

      // Add more country codes and corresponding regular expressions as needed
    };

    // Get the country code from the DTO property (args.property)
    const countryCode = args.object[args.property + 'CountryCode'];

    // Validate the phone number based on the provided country code
    const regex = phoneRegexMap[countryCode];
    return regex && regex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid phone number for the specified country code.`;
  }
}
