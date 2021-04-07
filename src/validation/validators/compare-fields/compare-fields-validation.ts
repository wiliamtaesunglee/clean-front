import { InvalidFieldError } from '~/validation/error'
import { FieldValidation } from '~/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (value: string): Error {
    return value === this.fieldToCompare
      ? null
      : new InvalidFieldError()
  }
}
