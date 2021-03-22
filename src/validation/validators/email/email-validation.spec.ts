import { InvalidFieldError } from '~/validation/error'
import { EmailValidation } from './email-validation'
import faker from 'faker'

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.random.word())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})