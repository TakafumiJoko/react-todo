import { useState, useEffect, ChangeEvent, createContext, useContext } from 'react'
import Todo from './todo/Todo'
import * as Types from '../../../types'
import EditForm from './edit-form/EditForm'
import NewForm from './new-form/NewForm'
import Filter from '../../pages/todos/filter/Filter'
import Sort from './sort/Sort'
import TextFields from '../../common/form/TextFields'
import { TextFieldsContext } from '../../../Context'

const Todos = () => {
  
  const [newTitle, setNewTitle] = useState<string>('')
  const [newContent, setNewContent] = useState<string>('')
  const [newDeadline, setNewDeadline] = useState<string>('')
  const [todos, setTodos]  = useState<Types.Todo[]>([])
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editId, setEditId] = useState<number|null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [filteredTodos, setFilteredTodos] = useState<Types.Todo[]>([])

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
            <TextFieldsContext.Provider value={{ newTitle: newTitle, newContent: newContent, newDeadline: newDeadline }}>
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
            </TextFieldsContext.Provider>
          ) : (
            <>
              <TextFieldsContext.Provider value={{ newTitle: newTitle, newContent: newContent, newDeadline: newDeadline }}>
                <NewForm
                  todos={todos} 
                  setTodos={setTodos}
                ></NewForm>
              </TextFieldsContext.Provider>
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
      <table className='table-auto mt-8'>
        <thead className="text-lg bg-gray-200">
          <th className='px-8'>タイトル</th>
          <th className='px-8'>内容</th>
          <th className='px-8'>ステータス</th>
          <th className='px-8'>作成日</th>
          <th className='px-8'>更新日</th>
          <th className='px-8'>期限</th>
          <th className='px-8'></th>
          <th className='px-8'></th>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  )
}

export default Todos