import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Authentication, SaveAccessToken } from '~/domain/usecases'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton
} from '~/presentation/components'
import Context from '~/presentation/contexts/form/form-context'
import { Validation } from '~/presentation/protocols/validation'
import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken
}: Props) => {
  const history = useHistory()
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
    const { email, password } = state
    const formData = {
      email,
      password
    }
    setErrorState({
      ...errorState,
      email: validation.validate('email', formData),
      password: validation.validate('password', formData)
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
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
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
          <SubmitButton
            text="Entrar"
            disabled={!!errorState.email || !!errorState.password || state.isLoading}
          />
          <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
