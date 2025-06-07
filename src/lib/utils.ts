import { isValidNumber, CountryCode } from 'libphonenumber-js';
import cardValidator from 'card-validator';
import countries from '../data/countries.json';

export const dateDifferenceInDays = (
  startDate: Date,
  endDate: Date
): number => {
  return Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
};

export const validateInput = (
  target: { name: string; value: string | null | undefined },
  formValue: any,
  required: boolean = true,
  maximumLength: number = 0,
  minimumLength: number = 0
): string => {
  const validators = {
    email(value: string) {
      if (required && !value) return 'required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'invalid email address';
      return '';
    },
    password(value: string) {
      if (required && !value) return 'required';
      if (value.length > maximumLength)
        return `password must be less than ${maximumLength} characters`;
      if (value.length < minimumLength)
        return `password must be at least ${minimumLength} characters long`;
      return '';
    },
    confirmPassword(value: string) {
      if (required && !value) return 'required';
      if (value !== formValue.password) return 'passwords do not match';
      return '';
    },
    phone(value: string) {
      if (required && !value) return 'required';
      if (formValue.country) {
        if (
          !isValidNumber(
            value,
            countries[formValue.country as keyof typeof countries]
              .code as CountryCode
          )
        )
          return 'invalid phone number for selected country';
      }
      return '';
    },
    safeInput(value: string) {
      if (required && !value) return 'required';
      if (maximumLength && value.length > maximumLength)
        return `must be less than ${maximumLength} characters`;
      if (minimumLength && value.length < minimumLength)
        return `must be at least ${minimumLength} characters long`;
      if (value && !/^[a-zA-Z0-9\s'-]+$/.test(value))
        return 'must contain only letters, numbers, spaces, hyphens, or apostrophes';
      return '';
    },
    cardHolderName(value: string) {
      if (required && !value) return 'required';
      if (!cardValidator.cardholderName(value).isValid)
        return 'invalid card holder name';
      return '';
    },
    cardNumber(value: string) {
      if (required && !value) return 'required';
      if (!cardValidator.number(value).isValid) return 'invalid card number';
      return '';
    },
    cardExpirationDate(value: string) {
      if (required && !value) return 'required';
      if (!cardValidator.expirationDate(value).isValid)
        return 'invalid expiration date';
      return '';
    },
    cardCvv(value: string) {
      if (required && !value) return 'required';
      if (!cardValidator.cvv(value).isValid) return 'invalid CVV';
      return '';
    },
    mpesaCode(value: string) {
      if (required && !value) return 'required';
      if (minimumLength && value.length < minimumLength)
        return `invalid MPESA code`;
      if (maximumLength && value.length > maximumLength)
        return `invalid MPESA code`;
      if (value && !/^(?=.*[A-Z])(?=.*\d)[A-Z0-9]+$/.test(value))
        return 'invalid MPESA code';
      return '';
    },
    name(value: string) {
      if (required && !value) return 'required';
      if (maximumLength && value.length > maximumLength)
        return `must be less than ${maximumLength} characters`;
      if (minimumLength && value.length < minimumLength)
        return `must be at least ${minimumLength} characters long`;
      if (value && !/^[a-zA-Z\s'-]+$/.test(value))
        return 'must contain only letters, spaces, hyphens, or apostrophes';
      return '';
    },
  };
  return (
    validators[target.name as keyof typeof validators]?.(target.value || '') ||
    ''
  );
};

export const formatStringSpacing = (
  value: string,
  spacing: number = 2,
  spacer: string = '/'
) => {
  const regex = new RegExp(`.{1,${spacing}}`, 'g');
  return removeStringSpacing(value, spacer).match(regex)!.join(spacer) || '';
};

export const removeStringSpacing = (value: string, spacer = '/') => {
  return value.replaceAll(spacer, '');
};

export const redactString = (
  value: string,
  startKeep: number,
  endKeep: number
) => {
  if (!value) return '';
  const start = value.slice(0, startKeep);
  const end = value.slice(-endKeep);
  const middle = '*'.repeat(Math.max(0, value.length - startKeep - endKeep));
  return start + middle + end;
};
