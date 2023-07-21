import React, { useState, useEffect } from 'react'
import TodoItem from './TodoItem'

const Todo = () => {

  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState()
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])
  const [todoContent, setTodoContent] = useState('')
  const [newContent, setNewContent] = useState('')

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

  const handleAddTitleFormChange = (e) => {
    setTodoTitle(e.target.value)
  }

  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted', content: todoContent, created: new Date().toLocaleDateString(), updated: new Date().toLocaleDateString() }])
    setTodoId(todoId + 1)
    resetFormInput()
  }

  const resetFormInput = () => {
    setTodoTitle('')
    setTodoContent('')
  }

  const handleEditTitleFormChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleEditTodo = () => {
    const newArray = todos.map((todo) => todo.id === editId ? {...todo, title: newTitle, content: newContent, updated: new Date().toLocaleDateString()} : todo)
    setTodos(newArray)
    setNewTitle('')
    setNewContent('')
    handleCloseEditForm()
  }

  const handleCloseEditForm = () => {
    setEditId()
    setIsEditable(false)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    const newArray = todos.filter((todo) => todo.status === e.target.value)
    setFilteredTodos(newArray)
  } 

  const handleAddContentFormChange = (e) => {
    setTodoContent(e.target.value)
  }

  const handleEditContentFormChange = (e) => {
    setNewContent(e.target.value)
  }

  return (
    <>
      <div>
        {
          isEditable ? (
            <>
              <input
                type='text'
                label='タイトル'
                value={newTitle}
                onChange={handleEditTitleFormChange}
              />
              <textarea name="内容" value={newContent} onChange={handleEditContentFormChange} cols="30" rows="10"></textarea>
              <button onClick={handleEditTodo}>編集を保存</button>
              <button onClick={handleCloseEditForm}>キャンセル</button>
            </>
          ) : (
            <>
              <input 
                type='text'
                label='タイトル'
                value={todoTitle}
                onChange={handleAddTitleFormChange}
              />
              <textarea name="内容" value={todoContent} onChange={handleAddContentFormChange} cols="30" rows="10"></textarea>
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
              setTodos={setTodos} 
              setIsEditable={setIsEditable} 
              setEditId={setEditId} 
              setNewTitle={setNewTitle} 
              setNewContent={setNewContent} 
            />
          ))
        }
      </ul>
    </>
  )
}

export default Todo

