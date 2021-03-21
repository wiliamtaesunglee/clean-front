import { FieldValidation } from '~/presentation/validation/protocols'
import { RequiredFieldError } from '~/presentation/validation/error'

export class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}
