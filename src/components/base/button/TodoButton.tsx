import type { TodoButtonProps } from '../../../types'

const TodoButton = ({ todo, onClick, title }: TodoButtonProps) => {

  return (
    <button onClick={() => onClick(todo)}>{title}</button>
  )
} 

export default TodoButton