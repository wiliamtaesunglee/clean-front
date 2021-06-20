import faker from 'faker'

import { InvalidFieldError } from '~/validation/error'
import { MinLeghtValidation } from './min-length.validation'

const makeSut = (field: string): MinLeghtValidation =>
  new MinLeghtValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return false if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return false if fileld does not exist on schema', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
