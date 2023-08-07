import type { InputProps } from '../../../types'

const Input = ({ type, value, onChange }: InputProps) => {

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input