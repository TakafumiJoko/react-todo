import { OptionProps } from '../../../types'

const Option = ({value, title}: OptionProps) => {
  return (
    <option value={value}>{title}</option>
  )
}

export default Option