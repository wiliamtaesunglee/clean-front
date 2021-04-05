import { SetStorage } from '~/data/protocols/cache/set-storage'
import faker from 'faker'
import 'jest-localstorage-mock'

class LocalStorageAdapter implements SetStorage {
  async set (key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
