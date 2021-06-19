import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { AddAccount, SaveAccessToken } from '~/domain/usecases'

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton
} from '~/presentation/components'
import Context from '~/presentation/contexts/form/form-context'
import { Validation } from '~/presentation/protocols/validation'
import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
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
    try {
      if (state.isLoading || disabled) return
      setState(prev => ({
        ...prev,
        isLoading: true
      }))
      const { name, email, password, passwordConfirmation } = state
      const account = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (err) {
      setErrorState(prev => ({
        ...prev,
        errorMessage: err.message
      }))
      setState(prev => ({
        ...prev,
        isLoading: false
      }))
    }
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
          <SubmitButton
            text="Entrar"
            disabled={disabled}
          />
          <Link data-testid="login" replace to="/login" className={Styles.link}>Voltar para Login</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
