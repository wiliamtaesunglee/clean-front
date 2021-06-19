import React from 'react'

type Props = {
  text: string
  disabled: boolean
}

const SubmitButton: React.FC<Props> = ({ text, disabled }: Props) => {
  return (
    <button
      data-testid="submit"
      disabled={disabled}
      type="submit"
    >
      { text }
    </button>
  )
}

export default SubmitButton
