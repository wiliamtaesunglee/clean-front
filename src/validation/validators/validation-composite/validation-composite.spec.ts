import faker from 'faker'

import { FieldValidationSpy } from '~/validation/test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.random.word()
    const { sut, fieldValidationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.word()
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.word())
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if validation pass', () => {
    const fieldName = faker.random.word()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
