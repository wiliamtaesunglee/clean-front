import faker from 'faker'

import { RequiredFieldError } from '~/validation/error'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (field): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is emty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  describe('Should return false if field is not empty', () => {
    test('Should return error if field is emty', () => {
      const field = faker.database.column()
      const sut = makeSut(field)
      const error = sut.validate({ [field]: faker.random.word() })
      expect(error).toBeFalsy()
    })
  })
})
