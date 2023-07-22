import React, { ChangeEvent } from 'react'
import * as Types from '../types';

const TodoItem = (props: Types.TodoItemProps) => {

  const handleDeleteTodo = (targetTodo: Types.Todo): void => {
    props.setTodos(props.todos.filter((todo:  Types.Todo) => todo.id !== targetTodo.id))
  }

  const handleOpenEditForm = ({ id, title, content, deadline }: { id: number, title: string, content: string, deadline: string }): void => {
    props.setIsEditable(true)
    props.setEditId(id)
    props.setNewTitle(title)
    props.setNewContent(content)
    props.setNewDeadline(deadline)
  }

  const handleStatusChange = (targetTodo: Types.Todo, e: ChangeEvent<HTMLSelectElement>): void => {
    const newArray = props.todos.map((todo: Types.Todo) => {
      return todo.id === targetTodo.id ? {...todo, status: e.target.value} : todo
    })
    props.setTodos((newArray))
  }

  const todoBackgroundColor = (todo: Types.Todo): string => {
    switch (todo.status) {
      case 'notStarted': 
        return 'red'
      case 'inProgress':
        return 'yellow'
      case 'done':
        return 'blue'
      default:
        return 'red'
    } 
  }

  return (
    <li key={props.todo.id} style={{backgroundColor: todoBackgroundColor(props.todo)}}>
      <span>{props.todo.title}</span>
      <span>{props.todo.content}</span>
      <select
        name='ステータス'
        value={props.todo.status}
        onChange={(e) => handleStatusChange(props.todo, e)}
        >
        <option value='notStarted'>
            未着手
        </option>
        <option value='inProgress'>
          作業中
        </option>
        <option value='done'>
          完了
        </option>
      </select>
      <span>{props.todo.created}</span>
      <span>{props.todo.updated}</span>
      <span>{props.todo.deadline}</span>
      <button onClick={() => handleOpenEditForm(props.todo)}>編集</button>
      <button onClick={() => handleDeleteTodo(props.todo)}>削除</button>
    </li>
  )
}

export default TodoItem