import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Input from './input'
import Context from '~/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {}, errorState: {} }}>
      <Input name="field" />
    </Context.Provider>
  )
}

describe('input Component', () => {
  test('Should begin width readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })
})
