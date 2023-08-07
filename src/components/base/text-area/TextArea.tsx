import type { TextAreaProps } from '../../../types'

const TextArea = ({name, value, onChange, cols, rows}: TextAreaProps) => {

  return (
    <textarea 
      name={name}
      value={value}
      onChange={onChange}
      cols={cols}
      rows={rows}
    ></textarea>
  )

}

export default TextArea