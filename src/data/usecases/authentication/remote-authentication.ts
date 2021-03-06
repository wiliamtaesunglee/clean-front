import { InvalidCredentialsError, UnexpectedError } from '~/domain/errors'
import { AccountModel } from '~/domain/models'
import { AuthenticationParams } from '../../../domain/usecases'
import { HttpPostClient, HttpStatusCode } from '../../protocols/http'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
