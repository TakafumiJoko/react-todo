import TodosButton from '../../../base/button/TodosButton'
import { useState, ChangeEvent } from 'react'
import type { NewFormProps } from '../../../../types'
import { backgroundColor } from '../../../../functions/todo'
import { today } from '../../../../functions/date'
import { TextField, Button } from '@mui/material'
import { TextFieldsContext } from '../../../../Context'
import TextFields from '../../../common/form/TextFields'

const NewForm = ({todos, setTodos}: NewFormProps) => {

  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoId, setTodoId] = useState<number>(todos.length + 1)
  const [todoContent, setTodoContent] = useState<string>('')
  const [todoDeadline, setTodoDeadline] = useState<string>('')

  const handleAddTitleFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoTitle(e.target.value)
  }

  const handleAddTodo = (): void => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted', content: todoContent, created: today(), updated: today(), deadline: todoDeadline, backgroundColor: backgroundColor('notStarted') }])
    setTodoId(todoId + 1)
    resetFormInput()
  }

  const resetFormInput = (): void => {
    setTodoTitle('')
    setTodoContent('')
  }

  const handleAddDeadlineFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoDeadline(e.target.value)
  }

  const handleAddContentFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTodoContent(e.target.value)
  }

  return (
    <>
      <TextFields

      />
      <Input
        style={{ 'padding': '0 8px' }} 
        type='text'
        value={todoTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddTitleFormChange(e)}
      />
      <Input
        style={{ 'padding': '0 8px' }}  
        multiline={true}
        type='text' 
        value={todoContent} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddContentFormChange(e)}
      />
      <Input 
        type="date" 
        value={todoDeadline} 
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddDeadlineFormChange(e)}
      />
      <Button onClick={() => handleAddTodo()}>作成</Button>
    </>    
  )
}

export default NewForm