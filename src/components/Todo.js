import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'; 

const Todo = () => {

  const [todos, setTodos] = useState([])
  const [todoTitle, setTodoTitle] = useState('')
  const [todoId, setTodoId] = useState(todos.length + 1)
  const [isEditable, setIsEditable] = useState(false)
  const [editId, setEditId] = useState()
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

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

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value)
  }

  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }])
    setTodoId(todoId + 1)
    resetFormInput()
  }

  const resetFormInput = () => {
    setTodoTitle('')
  }
  
  const handleDeleteTodo = (targetTodo) => {
    setTodos(todos.filter((todo) => todo.id !== targetTodo.id))
  }

  const handleOpenEditForm= ({ id, title }) => {
    setIsEditable(true)
    setEditId(id)
    setNewTitle(title)
  }

  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleEditTodo = () => {
    const newArray = todos.map((todo) => todo.id === editId ? {...todo, title: newTitle} : todo)
    setTodos(newArray)
    setNewTitle('')
    handleCloseEditForm()
  }

  const handleCloseEditForm = () => {
    setEditId()
    setIsEditable(false)
  }

  const handleStatusChange = (targetTodo, e) => {
    const newArray = todos.map((todo) => {
      return todo.id === targetTodo.id ? {...todo, status: e.target.value} : todo
    })
    setTodos(newArray)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    const newArray = todos.filter((todo) => todo.status === e.target.value)
    setFilteredTodos(newArray)
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
                onChange={handleEditFormChange}
              />
              <button onClick={handleEditTodo}>編集を保存</button>
            </>
          ) : (
            <>
              <input 
                type='text'
                label='タイトル'
                value={todoTitle}
                onChange={handleAddFormChanges}
              />
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
            <li key={todo.id}>
              <span>{todo.title}</span>
              <select
                name='ステータス'
                value={todo.status}
                onChange={(e) => handleStatusChange(todo, e)}
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
              <button onClick={() => handleOpenEditForm(todo)}>編集</button>
              <button onClick={() => handleDeleteTodo(todo)}>削除</button>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default Todo