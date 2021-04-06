import { AccountModel } from '~/domain/models'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwrodConfirmation: string
}
export interface AddAccount {
  add: (params: AddAccountParams) => Promise<AccountModel>
}
