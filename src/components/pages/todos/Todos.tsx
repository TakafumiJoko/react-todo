import { useState, useEffect } from 'react'
import Todo from './todo/Todo'
import * as Types from '../../../types'
import EditForm from './edit-form/EditForm'
import NewForm from './new-form/NewForm'
import Filter from '../../pages/todos/filter/Filter'
import Sort from './sort/Sort'

const Todos = () => {

  const [todos, setTodos]  = useState<Types.Todo[]>([])
  const [newTitle, setNewTitle] = useState<string>('')
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editId, setEditId] = useState<number|null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [filteredTodos, setFilteredTodos] = useState<Types.Todo[]>([])
  const [newContent, setNewContent] = useState<string>('')
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

  return (
    <>
      <div>
        {
          isEditable ? (
            <EditForm
              editId={editId}
              newTitle={newTitle}
              newContent={newContent}
              newDeadline={newDeadline}
              todos={todos} 
              setTodos={setTodos}
              setIsEditable={setIsEditable}
              setEditId={setEditId}
              setNewTitle={setNewTitle}
              setNewContent={setNewContent}
              setNewDeadline={setNewDeadline}
            ></EditForm>
          ) : (
            <>
              <NewForm
                todos={todos} 
                setTodos={setTodos}
              ></NewForm>
              <Filter
                filter={filter}
                setFilter={setFilter}
                todos={todos}
                setFilteredTodos={setFilteredTodos}             
              ></Filter>
              <Sort value='id' filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos}></Sort>
              <Sort value='deadline' filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos}></Sort>
            </>
          )
        }
      </div>
      <ul>
        { 
          filteredTodos.map((todo) => (
            <Todo
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

export default Todos