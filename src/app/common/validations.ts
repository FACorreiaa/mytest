import { Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms'

const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const siteRegex: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

export class CustomValidators {
  static patternValidator(error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null
      }
      const valid = siteRegex.test('http://' + control.value)

      return valid ? null : error
    }
  }
}

export const EmailValidation = [Validators.required, Validators.pattern(emailRegex)]
export const PasswordValidation = [Validators.required, Validators.minLength(8), Validators.maxLength(50)]

export const ZipCodeValidation = [Validators.required, Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/)]
export const PhoneNumberValidation = [Validators.required, Validators.pattern(/^[0-9]*$/)]
export const PhoneNumberPrefixValidation = [Validators.required, Validators.pattern(/^\+?\d+$/)]
