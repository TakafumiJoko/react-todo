import type { TodosButtonProps } from '../../../types'

const TodosButton = ({ value, onClick, title }: TodosButtonProps) => {

  return (
    <button value={value} onClick={onClick}>{title}</button>
  )
} 

export default TodosButton