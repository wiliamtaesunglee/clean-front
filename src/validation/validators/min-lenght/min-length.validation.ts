import { InvalidFieldError } from '~/validation/error'
import { FieldValidation } from '~/validation/protocols'

export class MinLeghtValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
