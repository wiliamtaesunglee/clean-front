import { ValidationComposite } from '~/validation/validators'
import { ValidationBuilder as Builder } from '~/validation/validators/builder/validation-builder'
import { makeSignUpValidation } from './signup-validation-facotry'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').min(5).build()
    ]))
  })
})
