import { AddAccount, AuthenticationParams } from '~/domain/usecases'
import { AccountModel } from '~/domain/models'
import { mockAccountModel } from '~/domain/test'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AuthenticationParams

  async add (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
