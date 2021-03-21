import { FieldValidation } from '~/presentation/validation/protocols'
import { InvalidFieldError } from '~/presentation/validation/error'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
