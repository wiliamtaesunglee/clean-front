import { InvalidFieldError } from '~/validation/error'
import { FieldValidation } from '~/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: object): Error {
    return input[this.field] === input[this.fieldToCompare]
      ? null
      : new InvalidFieldError()
  }
}
