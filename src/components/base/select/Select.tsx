import { SelectProps } from '../../../types'
import Option  from '../option/Option'

const Select = ({ children, name, value, onChange }: SelectProps) => {
  
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
    >
      {
        children.map((option) => (
          <Option value={option.value} title={option.title}></Option>
        ))
      }
    </select>
  )
}

export default Select