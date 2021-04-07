import { InvalidFieldError } from '~/validation/error'
import { FieldValidation } from '~/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCOmpare: string
  ) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}
