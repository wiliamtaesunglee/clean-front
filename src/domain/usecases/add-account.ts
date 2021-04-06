import { AccountModel } from '~/domain/models'

export type AuthenticationParams = {
  name: string
  email: string
  password: string
  passwrodConfirmation: string
}
export interface Authentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
