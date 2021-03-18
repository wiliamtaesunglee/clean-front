import React from 'react'

import Styles from './spinner-styles.scss'

const Spinner: React.FC = () => (
  <div
    className={Styles.spinner}
    data-testid="spinner"
  >
    <div />
    <div />
    <div />
  </div>
)

export default Spinner
