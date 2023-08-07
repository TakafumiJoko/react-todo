import { LiProps } from '../../../types'

const Li = ({ children, todo }: LiProps) => {

  return (
    <li style={{ backgroundColor: todo.backgroundColor }}>
      {children}
    </li>
  )
}

export default Li