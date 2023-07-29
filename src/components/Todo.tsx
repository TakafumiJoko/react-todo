import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import ReactDOM, { flushSync } from 'react-dom'
import TodoItem from './TodoItem'
import * as Types from '../types'
import { render } from '@testing-library/react'

const Todo = () => {

  const [todos, setTodos]  = useState<Types.Todo[]>([])
  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoId, setTodoId] = useState<number>(todos.length + 1)
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editId, setEditId] = useState<number|null>()
  const [newTitle, setNewTitle] = useState<string>('')
  const [filter, setFilter] = useState<string>('all')
  const [filteredTodos, setFilteredTodos] = useState<Types.Todo[]>([])
  const [todoContent, setTodoContent] = useState<string>('')
  const [newContent, setNewContent] = useState<string>('')
  const [todoDeadline, setTodoDeadline] = useState<string>('')
  const [newDeadline, setNewDeadline] = useState<string>('')

  useEffect(() => {
    setFilter(filter)
    switch (filter) {
      case 'all': 
        setFilteredTodos(todos)
        break
      case 'notStarted': 
        setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
        break
      case 'inProgress': 
        setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
        break
      case 'done': 
        setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
        break
      default:
        setFilteredTodos(todos)
    }
  }, [filter, todos])

  const handleAddTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value)
  }

  const handleAddTodo = (): void => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted', content: todoContent, created: today(), updated: today(), deadline: todoDeadline }])
    setTodoId(todoId + 1)
    resetFormInput()
  }

  const resetFormInput = (): void => {
    setTodoTitle('')
    setTodoContent('')
  }

  const handleEditTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value)
  }

  const handleEditTodo = (): void => {
    const newArray = todos.map((todo) => todo.id === editId ? {...todo, title: newTitle, content: newContent, updated: today(), deadline: newDeadline} : todo)
    setTodos(newArray)
    setNewTitle('')
    setNewContent('')
    setNewDeadline('')
    handleCloseEditForm()
  }

  const handleCloseEditForm = (): void => {
    setEditId(null)
    setIsEditable(false)
  }

  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilter(e.target.value)
    const newArray = todos.filter((todo) => todo.status === e.target.value)
    setFilteredTodos(newArray)
  } 

  const handleAddContentFormChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setTodoContent(e.target.value)
  }

  const handleEditContentFormChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewContent(e.target.value)
  }

  const handleAddDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoDeadline(e.target.value)
  }

  const handleEditDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewDeadline(e.target.value)
  }

  const today = (): string => {
    const date = new Date()
    const today = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    return today
  }

  const handleSortByAscend = (e: MouseEvent<HTMLButtonElement>): void => {
    const { target } = e
    if(target instanceof HTMLButtonElement) {
      if(target.value === 'id' || target.value === 'deadline') {
        const key = target.value
        const newArray = filteredTodos.slice().sort((a, b) => {
          if(a[key] > b[key]) return 1
          if(a[key] < b[key]) return -1
          return 0
        })
        setFilteredTodos(newArray)
      } 
    }
  }  

  const handleSortByDescend = (e: MouseEvent<HTMLButtonElement>): void => {
    const { target } = e
    if(target instanceof HTMLButtonElement) {
      if(target.value === 'id' || target.value === 'deadline') {
        const key = target.value
        const newArray = filteredTodos.slice().sort((a, b) => {
          if(a[key] > b[key]) return -1
          if(a[key] < b[key]) return 1
          return 0
        })
        setFilteredTodos(newArray)
      } 
    }
  }

  return (
    <>
      <div>
        {
          isEditable ? (
            <>
              <input
                type='text'
                value={newTitle}
                onChange={handleEditTitleFormChange}
              />
              <textarea name="内容" value={newContent} onChange={handleEditContentFormChange} cols={30} rows={10}></textarea>
              <input type="date" value={newDeadline} onChange={handleEditDeadlineFormChange}/>
              <button onClick={handleEditTodo}>編集を保存</button>
              <button onClick={handleCloseEditForm}>キャンセル</button>
            </>
          ) : (
            <>
              <input 
                type='text'
                value={todoTitle}
                onChange={handleAddTitleFormChange}
              />
              <textarea name="内容" value={todoContent} onChange={handleAddContentFormChange} cols={30} rows={10}></textarea>
              <input type="date" value={todoDeadline} onChange={handleAddDeadlineFormChange}/>
              <button onClick={handleAddTodo}>作成</button>
              <select
               name='ステータス'
               onChange={handleFilterChange}
              >
                <option value='all'>すべて</option>
                <option value='notStarted'>未着手</option>
                <option value='inProgress'>作業中</option>
                <option value='done'>完了</option>
              </select>
              <span>ID:</span>
              <button value='id' onClick={handleSortByAscend}>昇順</button>
              <button value='id' onClick={handleSortByDescend}>降順</button>
              <span>期限:</span>
              <button value='deadline' onClick={handleSortByAscend}>昇順</button>
              <button value='deadline' onClick={handleSortByDescend}>降順</button>
            </>
          )
        }
      </div>
      <ul>
        { 
          filteredTodos.map((todo) => (
            <TodoItem
              todos={todos} 
              todo={todo}
              key={todo.id} 
              setTodos={setTodos} 
              setIsEditable={setIsEditable} 
              setEditId={setEditId} 
              setNewTitle={setNewTitle} 
              setNewContent={setNewContent}
              setNewDeadline={setNewDeadline}
            />
          ))
        }
      </ul>
    </>
  )
}

export default Todo