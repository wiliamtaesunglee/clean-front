
import axios from 'axios'
import faker from 'faker'

interface mockHttpResponseProps {
  status: number
  data: string
}

export const mockHttpRespose = (): mockHttpResponseProps => ({
  status: faker.random.number(),
  data: faker.random.objectElement()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue(mockHttpRespose)
  return mockedAxios
}
