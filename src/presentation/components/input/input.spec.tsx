import React from 'react'
import { render } from '@testing-library/react'
import Input from './input'
import Context from '~/presentation/contexts/form/form-context'

describe('input Component', () => {
  test('Should begin width readOnly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {}, errorState: {} }}>
        <Input name="field" />
      </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBeTruthy()
  })
})
