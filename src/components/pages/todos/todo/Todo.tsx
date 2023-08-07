import { ChangeEvent } from 'react'
import * as Types from '../../../../types'
import Span from '../../../base/span/Span'
import Select from '../../../base/select/Select'
import TodoButton from '../../../base/button/TodoButton'
import Li from '../../../base/li/Li'
import { backgroundColor } from '../../../../functions/todo'

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

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>, targetTodo: Types.Todo): void => {
    const newArray = todos.map((todo: Types.Todo) => {
      return todo.id === targetTodo.id ? {...todo, status: e.target.value, backgroundColor: backgroundColor(e.target.value)} : todo
    })
    setTodos((newArray))
  }

  const statusOptions: Types.OptionProps[] = [
    { value: 'notStarted', title: '未着手' },
    { value: 'inProgress', title: '作業中' },
    { value: 'done', title: '完了' },
  ]

  return (
    <Li todo={todo}>
      <Span title={todo.title}></Span>
      <Span title={todo.content}></Span>
      <Select
        name='ステータス'
        value={todo.status}
        onChange={(e) => handleStatusChange(e, todo)}
        >
        {statusOptions}
      </Select>
      <Span title={todo.created}></Span>
      <Span title={todo.updated}></Span>
      <Span title={todo.deadline}></Span>
      <TodoButton todo={todo} onClick={handleOpenEditForm} title='編集'></TodoButton>
      <TodoButton todo={todo} onClick={handleDeleteTodo} title='削除'></TodoButton>
    </Li>
  )
}

export default Todo