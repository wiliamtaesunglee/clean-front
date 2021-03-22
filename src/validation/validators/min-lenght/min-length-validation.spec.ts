import { InvalidFieldError } from '~/validation/error'
import { MinLeghtValidation } from './min-length.validation'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLeghtValidation('field', 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
