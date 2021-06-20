import React from 'react'
import { Signup } from '~/presentation/pages'
import { makeSignUpValidation } from './signup-validation-facotry'
import { makeLocalSaveAccessToken } from '~/main/factories/usecases/authentication/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '../../usecases/authentication/remote-add-account-factory'

export const makeSignUp: React.FC = () => {
  return (
    <Signup
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
