import { RequiredFieldError } from '~/presentation/validation/error'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is emty', () => {
    const sut = new RequiredFieldValidation('emails')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
