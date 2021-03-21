import faker from 'faker'

import { RequiredFieldError } from '~/presentation/validation/error'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column())

describe('RequiredFieldValidation', () => {
  test('Should return error if field is emty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  describe('Should return false if field is not empty', () => {
    test('Should return error if field is emty', () => {
      const sut = makeSut()
      const error = sut.validate(faker.random.word())
      expect(error).toBeFalsy()
    })
  })
})
