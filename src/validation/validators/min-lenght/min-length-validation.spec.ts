import faker from 'faker'

import { InvalidFieldError } from '~/validation/error'
import { MinLeghtValidation } from './min-length.validation'

const makeSut = (): MinLeghtValidation =>
  new MinLeghtValidation(faker.database.column(), 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
