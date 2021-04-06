import { AccountModel } from '~/domain/models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwrodConfirmation: string
}
export interface AddAccount {
  auth: (params: AddAccountParams) => Promise<AccountModel>
}
