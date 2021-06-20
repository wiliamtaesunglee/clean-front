import { InvalidFieldError } from '~/validation/error'
import { FieldValidation } from '~/validation/protocols'

export class MinLeghtValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: object): Error {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null
  }
}
