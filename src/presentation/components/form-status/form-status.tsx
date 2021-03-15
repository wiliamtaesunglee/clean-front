import React, { useContext } from 'react'

import Context from '~/presentation/contexts/form/form-context'
import Spinner from '~/presentation/components/spinner/spinner'
import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const {
    state: { isLoading },
    errorState: { errorMessage }
  } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      { isLoading && <Spinner />}
      { errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
