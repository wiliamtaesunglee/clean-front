import React from 'react'
import { Login } from '~/presentation/pages'
import { makeRemoteAuthentication } from '~/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-facotry'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  )
}
