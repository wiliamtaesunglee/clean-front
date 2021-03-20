import React, { useEffect, useState } from 'react'
import { Authentication } from '~/domain/usecases'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus
} from '~/presentation/components'
import Context from '~/presentation/contexts/form/form-context'
import { Validation } from '~/presentation/protocols/validation'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: ''
  })
  const [errorState, setErrorState] = useState({
    email: '',
    password: '',
    errorMessage: ''
  })
  useEffect(() => {
    setErrorState({
      ...errorState,
      email: validation.validate('email', state.email),
      password: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading) {
      return
    }
    setState({
      ...state,
      isLoading: true
    })
    const { email, password } = state
    await authentication.auth({
      email,
      password
    })
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button
            data-testid="submit"
            disabled={Boolean(errorState.email || errorState.password)}
            className={Styles.submit}
            type="submit"
          >Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
