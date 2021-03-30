import { RemoteAuthentication } from '~/data/usecases/authentication'
import { Authentication } from '~/domain/usecases'
import { makeApiUrl } from '~/main/factories/http/api-http-factory'
import { makeAxiosHttpClient } from '~/main/factories/http/axios-http-client-factory'

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl()
  return new RemoteAuthentication(url, makeAxiosHttpClient())
}
