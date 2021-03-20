import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    const formError = errorState.email || errorState.password
    try {
      if (state.isLoading || formError) {
        return
      }
      setState({
        ...state,
        isLoading: true
      })
      const { email, password } = state
      const account = await authentication.auth({
        email,
        password
      })
      localStorage.setItem(
        'accessToken',
        account.accessToken
      )
    } catch (error) {
      setState({
        ...state,
        isLoading: false
      })
      setErrorState({
        ...errorState,
        errorMessage: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState, setState }}>
        <form
          data-testid="form"
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
          <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
