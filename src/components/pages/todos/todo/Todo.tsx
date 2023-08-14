import * as Types from '../../../../types'
import { backgroundColor } from '../../../../functions/todo'
import { Select, MenuItem, SelectChangeEvent, Button } from '@mui/material'

const Todo = ({todos, todo, setTodos, setIsEditable, setEditId, setNewTitle, setNewContent, setNewDeadline}: Types.TodoProps) => {

  const handleDeleteTodo = (targetTodo: Types.Todo): void => {
    setTodos(todos.filter((todo: Types.Todo) => todo.id !== targetTodo.id))
  }

  const handleOpenEditForm = ({ id, title, content, deadline }: Types.Todo): void => {
    setIsEditable(true)
    setEditId(id)
    setNewTitle(title)
    setNewContent(content)
    setNewDeadline(deadline)
  }

  const handleStatusChange = (e: SelectChangeEvent<any>, targetTodo: Types.Todo): void => {
    const newArray = todos.map((todo: Types.Todo) => {
      return todo.id === targetTodo.id ? {...todo, status: e.target.value, backgroundColor: backgroundColor(e.target.value)} : todo
    })
    setTodos((newArray))
  }

  return (
    <tr>
      <td>
        {todo.title}
      </td>
      <td>
        {todo.content}
      </td>
      <td>
        <Select
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            m: 2,
            p: 0,
          }}
          defaultValue="未着手"
          value={todo.status}
          onChange={(e: SelectChangeEvent<any>) => handleStatusChange(e, todo)}
        >
          <MenuItem value='notStarted'>未着手</MenuItem>
          <MenuItem value='inProgress'>作業中</MenuItem>
          <MenuItem value='done'>完了</MenuItem>   
        </Select>
      </td>
      <td>
        {todo.created}
      </td>
      <td>
        {todo.updated}
      </td>
      <td>
        {todo.deadline}
      </td>
      <td>
        <Button 
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            m: 2,
            p: 1,
          }}
          onClick={() => handleOpenEditForm(todo)} 
        >
          編集
        </Button>
      </td>
      <td>
        <Button
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            m: 2,
            p: 1,
          }}
          onClick={() => handleDeleteTodo(todo)} 
        >
          削除
        </Button>
      </td>
    </tr>
  )
}

export default Todo