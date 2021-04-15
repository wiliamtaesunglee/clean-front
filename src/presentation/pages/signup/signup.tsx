import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Authentication, SaveAccessToken } from '~/domain/usecases'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '~/presentation/components'
import Context from '~/presentation/contexts/form/form-context'
import { Validation } from '~/presentation/protocols/validation'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }: Props) => {
  const [disabled, setDisabled] = useState(false)
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    name: '',
    password: '',
    passwordConfirmation: ''
  })
  const [errorState, setErrorState] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    errorMessage: ''
  })

  useEffect(() => {
    setErrorState({
      ...errorState,
      name: validation.validate('name', state.name),
      email: validation.validate('name', state.email),
      password: validation.validate('password', state.password),
      passwordConfirmation: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  useEffect(() => {
    setDisabled(Object.values(errorState).some(error => Boolean(error)))
  }, [errorState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState(prev => ({
      ...prev,
      isLoading: true
    }))
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider
      value={{ state, errorState, setState }}
      >
        <form
          className={Styles.form}
          aria-label="form"
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha" />
          <button
            disabled={disabled}
            data-testid="submit"
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
